import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workflowUrl = new URL("../../.github/workflows/fork-sync.yml", import.meta.url);

test("fork sync uses a workflow-capable secret only for the push boundary", async () => {
  const workflow = await readFile(workflowUrl, "utf8");

  assert.match(workflow, /permissions:\n  contents: read\n/);
  assert.match(workflow, /secrets\.OMNIROUTE_FORK_SYNC_TOKEN/);
  assert.match(workflow, /Contents and Workflows read\/write permissions/);
  assert.match(workflow, /persist-credentials: false/);
  assert.match(workflow, /extraheader=AUTHORIZATION: basic/);
  assert.doesNotMatch(workflow, /remote set-url origin .*TOKEN/);
  assert.doesNotMatch(workflow, /GH_TOKEN: \$\{\{ github\.token \}\}/);
});
