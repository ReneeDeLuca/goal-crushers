import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "build-html",
      apply: "build",
      transformIndexHtml: (html) => {
        return {
          html,
          tags: [
            {
              tag: "script",
              attrs: {
                type: "module",
                src: "/src/main.jsx",
              },
              injectTo: "body",
            },
          ],
        };
      },
    },
  ],
  base: "/frontend/dist/",
  server: {
    host: "0.0.0.0",
  },
});
