/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prolab: {
          primary: '#00594C',
          light: '#007A68',
          dark: '#003D34',
          teal: '#00B4A0',
          gold: '#C49A2B',
          navy: '#0F1B2D',
          navyDark: '#0A1628',
          offwhite: '#F8FAF9',
          grayBg: '#F0F4F3',
          border: '#C8D4D0',
          borderLight: '#E4EAE8',
          textMuted: '#7A918B',
          textDark: '#1A2E29',
          danger: '#C0392B',
          success: '#27AE60',
          orange: '#B85C38',
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
