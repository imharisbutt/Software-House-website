import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  // GitHub Pages serves this project from /Software-House-website/, not the
  // domain root, so every built asset URL needs that prefix. Keep local
  // `dev` at "/" (unaffected) — only `build` and `preview` (which serves
  // the already-built dist) need the repo subpath.
  base: command === 'build' || isPreview ? '/Software-House-website/' : '/',
}))
