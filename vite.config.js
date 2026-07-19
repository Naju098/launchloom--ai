import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Vite handles the React development/build pipeline.
// Tailwind v4 is connected through its official Vite plugin.
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
