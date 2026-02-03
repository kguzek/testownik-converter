import type { KnipConfig } from "knip";

const config: KnipConfig = {
  project: ["src/**"],
  ignoreDependencies: ["@commitlint/*"],
};

export default config;
