/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vangogh: {
          blue: '#13284c',
          navy: '#0b162c',
          gold: '#e6a117',
          sun: '#f4c430',
          ochre: '#c68326',
          canvas: '#fdfbf7',
          stone: '#f4efe6',
          charcoal: '#1c1f24',
        }
      },
      fontFamily: {
        serif: ['Presentation', 'sans-serif'],
        sans: ['Presentation', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
