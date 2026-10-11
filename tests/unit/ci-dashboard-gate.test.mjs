import assert from "node:assert/strict";
import test from "node:test";

import { evaluateDashboardGate } from "../../scripts/quality/check-ci-dashboard.mjs";

const requiredCodeJobs = [
  "changes",
  "pr-test-policy",
  "docs-sync-strict",
  "i18n-ui-coverage",
  "i18n-glossary-zhcn",
  "lint",
  "quality-gate",
  "quality-extended",
  "build",
  "package-artifact",
  "electron-package-smoke",
  "test-unit",
  "test-bun-sqlite",
  "test-vitest",
  "test-coverage",
  "test-e2e",
  "test-integration",
  "test-security",
  "test-ecosystem",
];

function readyCodeNeeds() {
  return Object.fromEntries(
    requiredCodeJobs.map((job) => [
      job,
      job === "changes"
        ? { result: "success", outputs: { code: "true", docs: "false", i18n: "false", testsOnly: "false" } }
        : { result: "success", outputs: {} },
    ]),
  );
}

for (const result of ["failure", "cancelled", "skipped"]) {
  test(`fails closed when a required job is ${result}`, () => {
    const needs = readyCodeNeeds();
    needs["test-security"].result = result;

    const verdict = evaluateDashboardGate({ needs, eventName: "pull_request" });

    assert.equal(verdict.ok, false);
    assert.ok(verdict.failures.includes(`test-security: ${result}`));
  });
}

test("passes only when every required job succeeds", () => {
  const verdict = evaluateDashboardGate({ needs: readyCodeNeeds(), eventName: "pull_request" });

  assert.equal(verdict.ok, true);
  assert.deepEqual(verdict.failures, []);
});

test("keeps explicitly optional jobs non-blocking", () => {
  const needs = readyCodeNeeds();
  needs["coverage-pr-comment"] = { result: "failure", outputs: {} };
  needs["test-protocols-e2e"] = { result: "failure", outputs: {} };

  const verdict = evaluateDashboardGate({ needs, eventName: "pull_request" });

  assert.equal(verdict.ok, true);
  assert.ok(verdict.optional.includes("coverage-pr-comment"));
  assert.ok(verdict.optional.includes("test-protocols-e2e"));
});

test("allows disabled SonarQube to skip but fails when an enabled scan does not succeed", () => {
  const disabledNeeds = readyCodeNeeds();
  disabledNeeds.sonarqube = { result: "skipped", outputs: {} };
  assert.equal(
    evaluateDashboardGate({ needs: disabledNeeds, eventName: "pull_request" }).ok,
    true,
  );

  for (const result of ["failure", "cancelled"]) {
    const enabledNeeds = readyCodeNeeds();
    enabledNeeds.sonarqube = { result, outputs: {} };
    const verdict = evaluateDashboardGate({ needs: enabledNeeds, eventName: "pull_request" });
    assert.equal(verdict.ok, false);
    assert.ok(verdict.failures.includes(`sonarqube: unexpected ${result} in a conditionally inactive lane`));
  }
});

test("draft pull-request dashboards are incomplete even when classification succeeds", () => {
  const verdict = evaluateDashboardGate({
    needs: { changes: readyCodeNeeds().changes },
    eventName: "pull_request",
    draft: "true",
  });

  assert.equal(verdict.ok, false);
  assert.match(verdict.failures[0], /draft pull-request runs are incomplete/);
});

test("allows intentionally skipped hotfix lanes", () => {
  const needs = readyCodeNeeds();
  for (const job of ["quality-gate", "quality-extended", "test-coverage", "test-e2e"]) {
    needs[job].result = "skipped";
  }

  const verdict = evaluateDashboardGate({
    needs,
    eventName: "pull_request",
    hotfix: "true",
  });

  assert.equal(verdict.ok, true);
});

test("allows the intentionally skipped E2E lane for tests-only changes", () => {
  const needs = readyCodeNeeds();
  needs.changes.outputs.testsOnly = "true";
  needs["test-e2e"].result = "skipped";

  const verdict = evaluateDashboardGate({ needs, eventName: "pull_request" });

  assert.equal(verdict.ok, true);
});

test("allows code jobs to skip on a ready docs-only pull request", () => {
  const needs = {
    changes: {
      result: "success",
      outputs: { code: "false", docs: "true", i18n: "false", testsOnly: "false" },
    },
    "pr-test-policy": { result: "success", outputs: {} },
    "docs-sync-strict": { result: "success", outputs: {} },
    build: { result: "skipped", outputs: {} },
    "test-security": { result: "skipped", outputs: {} },
  };

  const verdict = evaluateDashboardGate({ needs, eventName: "pull_request" });

  assert.equal(verdict.ok, true);
});

test("fails closed when a new dashboard dependency has no gate classification", () => {
  const needs = readyCodeNeeds();
  needs["new-unclassified-job"] = { result: "skipped", outputs: {} };

  const verdict = evaluateDashboardGate({ needs, eventName: "pull_request" });

  assert.equal(verdict.ok, false);
  assert.ok(verdict.failures.includes("new-unclassified-job: unclassified dashboard dependency"));
});
