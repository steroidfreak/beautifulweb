/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        midnight: '#0f172a',
        accent: '#6366f1'
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at top, rgba(99, 102, 241, 0.35), rgba(15, 23, 42, 0.7))'
      }
    }
  },
  plugins: []
};
