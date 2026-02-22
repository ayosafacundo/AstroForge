import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { env } from "process";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: env.HOST,
    port: parseInt(env.PORT ? env.PORT : "5173"),
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
