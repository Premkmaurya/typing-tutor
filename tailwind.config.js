/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'Mangal', 'Nirmala UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace']
      },
      colors: {
        tutor: {
          bg: 'var(--color-bg)',
          card: 'var(--color-card)',
          border: 'var(--color-border)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          accent: 'var(--color-accent)',
          correct: 'var(--color-correct)',
          incorrect: 'var(--color-incorrect)',
        }
      }
    },
  },
  plugins: [],
}
