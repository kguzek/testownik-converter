import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/cli/index.ts"],
    clean: true,
    shims: true,
    format: "esm",
    splitting: false,
    sourcemap: true,
    outDir: "dist",
  },
]);
