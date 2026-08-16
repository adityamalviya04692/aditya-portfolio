import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub Pages project path: /aditya-portfolio/
export default defineConfig({
    plugins: [react()],
    base: '/aditya-portfolio/',
})
