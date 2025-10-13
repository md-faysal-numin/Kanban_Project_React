import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // base: "/Kanban_Project_React/", // repo name with trailing slash
  plugins: [tailwindcss(), react()],
});
