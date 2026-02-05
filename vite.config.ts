import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Prerender from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    mode === "production" && Prerender({
      staticDir: path.join(__dirname, "dist"),
      routes: [
        "/",
        "/templates",
        "/contact",
        "/ai-training",
        "/cases",
        "/blog",
        "/consulting",
        "/reviews",
        "/faq",
        "/privacy",
        "/terms",
        "/cookies",
      ],
      renderer: "puppeteer",
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
