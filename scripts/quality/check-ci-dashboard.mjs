#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";

const OPTIONAL_JOBS = new Set([
  // Reporting-only; validation is enforced by test-coverage and pr-test-policy.
  "coverage-pr-comment",
  // Workflow declares these advisory with continue-on-error.
  "docs-lint",
  "i18n",
  // Workflow declares this advisory until #10049 is resolved.
  "test-protocols-e2e",
]);

const GATE_JOBS = new Set([
  "build",
  "changes",
  "docs-sync-strict",
  "electron-package-smoke",
  "i18n-glossary-zhcn",
  "i18n-ui-coverage",
  "lint",
  "package-artifact",
  "pr-test-policy",
  "quality-extended",
  "quality-gate",
  // Conditionally inactive when SONARQUBE_ENABLED is not true; blocking when it runs.
  "sonarqube",
  "test-bun-sqlite",
  "test-coverage",
  "test-e2e",
  "test-ecosystem",
  "test-integration",
  "test-security",
  "test-unit",
  "test-vitest",
]);

function isTrue(value) {
  return value === true || value === "true";
}

export function evaluateDashboardGate({ needs, eventName, draft = false, hotfix = false }) {
  const required = new Set(["changes"]);
  const failures = [];
  const changes = needs.changes?.outputs ?? {};
  const isPullRequest = eventName === "pull_request";

  if (isPullRequest && isTrue(draft)) {
    failures.push("draft pull-request runs are incomplete; promote the PR to run required checks");
  } else {
    const code = !isPullRequest || isTrue(changes.code);
    const docs = !isPullRequest || isTrue(changes.docs);
    const i18n = !isPullRequest || isTrue(changes.i18n);
    const isHotfix = isTrue(hotfix);

    if (isPullRequest) required.add("pr-test-policy");
    if (docs || code) required.add("docs-sync-strict");
    if (i18n || code) {
      required.add("i18n-ui-coverage");
      required.add("i18n-glossary-zhcn");
    }

    if (code) {
      for (const job of [
        "lint",
        "build",
        "package-artifact",
        "electron-package-smoke",
        "test-unit",
        "test-bun-sqlite",
        "test-vitest",
        "test-integration",
        "test-security",
        "test-ecosystem",
      ]) {
        required.add(job);
      }

      if (!isHotfix) {
        required.add("quality-gate");
        required.add("quality-extended");
        required.add("test-coverage");
        if (!isTrue(changes.testsOnly)) required.add("test-e2e");
      }
    }
  }

  for (const job of [...required].sort()) {
    const result = needs[job]?.result ?? "missing";
    if (result !== "success") failures.push(`${job}: ${result}`);
  }

  for (const [job, data] of Object.entries(needs)) {
    if (required.has(job) || OPTIONAL_JOBS.has(job)) continue;
    if (!GATE_JOBS.has(job)) {
      failures.push(`${job}: unclassified dashboard dependency`);
    } else if (data.result === "failure" || data.result === "cancelled") {
      failures.push(`${job}: unexpected ${data.result} in a conditionally inactive lane`);
    }
  }

  return {
    ok: failures.length === 0,
    failures,
    required: [...required].sort(),
    optional: [...OPTIONAL_JOBS].sort(),
  };
}

function run() {
  let needs;
  try {
    needs = JSON.parse(process.env.NEEDS_JSON ?? "");
  } catch {
    console.error("::error::CI Dashboard could not parse NEEDS_JSON");
    process.exitCode = 1;
    return;
  }

  const verdict = evaluateDashboardGate({
    needs,
    eventName: process.env.EVENT_NAME ?? "",
    draft: process.env.PR_DRAFT,
    hotfix: process.env.IS_HOTFIX,
  });

  if (verdict.ok) {
    console.log(`CI Dashboard gate passed (${verdict.required.length} required jobs).`);
    return;
  }

  for (const failure of verdict.failures) {
    console.error(`::error::CI Dashboard required check incomplete: ${failure}`);
  }
  process.exitCode = 1;
}

const isMain =
  process.argv[1] && path.resolve(fileURLToPath(import.meta.url)) === path.resolve(process.argv[1]);

if (isMain) run();
