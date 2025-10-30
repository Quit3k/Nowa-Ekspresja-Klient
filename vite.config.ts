import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- IMPORT

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- DODAJ
  ],
  base: "/Nowa-Ekspresja-Klient/",
})
