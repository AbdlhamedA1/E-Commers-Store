/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899', // Primary Pink
          600: '#DB2777',
          700: '#BE185D', // Dark Magenta
          800: '#9D174D',
          900: '#831843',
        },
        rosegold: {
          light: '#F5D5D8',
          DEFAULT: '#E8B4B8',
          dark: '#D4959A',
        },
        darktext: '#3F3F46',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(236, 72, 153, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 10px 25px -3px rgba(236, 72, 153, 0.18), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
