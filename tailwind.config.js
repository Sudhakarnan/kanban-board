/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        todo: '#fbbf24',
        inprogress: '#60a5fa',
        done: '#34d399',
        primary: '#2563eb',
        accent: '#f472b6',
        background: '#f1f5f9'
      }
    },
  },
  plugins: [],
}
