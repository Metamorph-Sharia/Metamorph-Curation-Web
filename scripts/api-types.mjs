// The API types, generated from the curation API's contract (Metamorph-Knowledge-Platform/docs/api/openapi.json).
//   npm run api:types     write src/lib/api/schema.d.ts
//   npm run api:check     fail if the committed types no longer match the contract (CI)
// METAMORPH_OPENAPI points at another copy of the contract; by default the platform repository beside this one.
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import openapiTS, { astToString } from "openapi-typescript";

const contract = path.resolve(process.env.METAMORPH_OPENAPI ?? "../Metamorph-Knowledge-Platform/docs/api/openapi.json");
const target = path.resolve("src/lib/api/schema.d.ts");
const header = "// Generated from the curation API's OpenAPI contract by `npm run api:types`. Do not edit.\n";

const types = header + astToString(await openapiTS(JSON.parse(await readFile(contract, "utf8"))));

if (process.argv.includes("--check")) {
  const committed = await readFile(target, "utf8").catch(() => "");
  if (committed !== types) {
    console.error(`src/lib/api/schema.d.ts doesn't match ${contract}: run \`npm run api:types\` and review the change.`);
    process.exit(1);
  }
  console.log("API types match the contract.");
} else {
  await writeFile(target, types);
  console.log(`wrote ${path.relative(process.cwd(), target)} from ${contract}`);
}
