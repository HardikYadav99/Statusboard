import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["hardikstatusboard.duckdns.org"],
    proxy: {
      "/api": {
        target: "http://server:5001",
        changeOrigin: true,
      },
    },
  },
});
