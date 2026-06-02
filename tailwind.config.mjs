/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
        bg: {
          DEFAULT: '#ffffff',
          secondary: '#f8fafc',
        },
        text: {
          DEFAULT: '#1e293b',
          muted: '#64748b',
        },
        border: '#e2e8f0',
        code: {
          bg: '#1e293b',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Monaco', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
