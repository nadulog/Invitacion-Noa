import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const output = resolve(root, "netlify-dist");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of ["index.html", "styles.css", "script.js"]) {
  await cp(resolve(root, file), resolve(output, file));
}

await cp(
  resolve(root, "public", "invitation-personalization.js"),
  resolve(output, "invitation-personalization.js"),
);

await cp(resolve(root, "public"), resolve(output, "public"), {
  recursive: true,
});

console.log("Netlify bundle ready in netlify-dist");
