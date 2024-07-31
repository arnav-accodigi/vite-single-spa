import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: `./import-maps/local.import-map.json`,
            dest: "",
            rename: "import-map.json",
            transform: (content) => {
              const importMapJson = JSON.stringify(
                JSON.parse(content.toString()),
                null,
                2
              );
              return importMapJson;
            },
          },
        ],
      }),
      viteStaticCopy({
        targets: [
          {
            src: `./index.html`,
            dest: "",
          },
        ],
      }),
    ],
    server: {
      port: 9000,
      watch: {
        usePolling: true,
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
    },
    build: {
      target: "es2022",
      rollupOptions: {
        input: ["./src/nutrien-root-config.ts"],
        preserveEntrySignatures: "strict",
        // external: externalDependencies,
        output: {
          format: "esm",
          exports: "auto",
          entryFileNames: "[name].js",
        },
      },
    },
  };
});
