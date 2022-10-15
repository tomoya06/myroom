import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const base = "/myroom/";

  return defineConfig({
    plugins: [react()],
    base,
    server: {
      host: true,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "@pages": resolve(__dirname, "./pages"),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          win9: resolve(__dirname, "pages/win9/index.html"),
        },
        plugins: [visualizer()],
      },
    },
  });
};
