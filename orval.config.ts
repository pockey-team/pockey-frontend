import { defineConfig, InputOptions } from "orval";

const input: InputOptions = {
  filters: { mode: "exclude", tags: ["Health"] },
  override: { transformer: "./src/api/transformer.js" },
  target: "./src/api/openapi.json",
};

export default defineConfig({
  api: {
    input,
    output: {
      baseUrl: "https://api-dev.pockey.pics",
      client: "react-query",
      httpClient: "fetch",
      mode: "split",
      mock: { type: "msw", delay: 500 },
      override: {
        mutator: { path: "./src/api/http.ts", name: "http" },
        query: { usePrefetch: true },
        useDates: true,
      },
      target: "./src/api/__generated__/index.ts",
      urlEncodeParameters: true,
    },
    hooks: { afterAllFilesWrite: "biome check --write --unsafe" },
  },
});
