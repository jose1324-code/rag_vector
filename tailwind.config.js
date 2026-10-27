/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        underworld: {
          black: "#080808",
          charcoal: "#171717",
          blood: "#a50018",
          crimson: "#ef4444",
          gold: "#f59e0b",
          amber: "#fbbf24"
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        mono: ['Share Tech Mono', 'monospace'],
        cyber: ['Orbitron', 'sans-serif'],
        sans: ['Rajdhani', 'sans-serif']
      }
    },
  },
  plugins: [],
}
