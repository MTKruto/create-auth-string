import { build, emptyDir } from "@deno/dnt";
import denoJson from "./deno.json" with { type: "json" };

const { imports, version } = denoJson;
const mtkrutoSpecifier = imports["@mtkruto/mtkruto"];
const mtkrutoVersion = mtkrutoSpecifier.split("^")[1];

await emptyDir("./dist");

await build({
  entryPoints: [
    {
      kind: "bin",
      name: "create-auth-string",
      path: "./main.ts",
    },
  ],
  outDir: "./dist",
  typeCheck: false,
  test: false,
  scriptModule: false,
  compilerOptions: {
    target: "ES2023",
    lib: ["ESNext", "DOM", "ESNext.AsyncIterable"],
  },
  shims: {
    prompts: true,
    deno: true,
  },
  mappings: {
    "./client.ts": "./client.node.ts",
  },
  packageManager: "pnpm",
  package: {
    name: "@mtkruto/create-auth-string",
    version,
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/MTKruto/create-auth-string.git",
    },
    dependencies: {
      "@mtkruto/node": mtkrutoVersion,
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "dist/LICENSE");
    Deno.copyFileSync("README.md", "dist/README.md");
  },
});
