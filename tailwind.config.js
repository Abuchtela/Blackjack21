/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base theme colors
        'base-blue': '#0052FF',
        'base-light-blue': '#4285F4',
        'base-dark': '#1A1A1A',
        'base-gray': '#8A8A8A',
        'base-white': '#FFFFFF',
        'base-green': '#00D632',
        'base-red': '#FF4444',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};