import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const testDirectory = resolve(process.cwd(), "tests/unit");
const testFiles = readdirSync(testDirectory)
  .filter((file) => file.endsWith(".test.ts") && file !== "rate-limit-manager.test.ts")
  .sort()
  .map((file) => resolve(testDirectory, file));

if (testFiles.length === 0) {
  throw new Error("No unit test files were discovered for coverage");
}

const result = spawnSync(
  process.execPath,
  ["--import", "tsx/esm", "--test", "--test-concurrency=10", ...testFiles],
  {
    env: process.env,
    stdio: "inherit",
  }
);

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
