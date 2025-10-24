import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5555,
    proxy: {
      "/api": {
        target: "http://77.110.104.72:8000/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
