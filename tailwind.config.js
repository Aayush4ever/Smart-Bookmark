/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Syne"', 'sans-serif'],
        'body': ['"DM Sans"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d5fe',
          300: '#a5b8fc',
          400: '#8195f8',
          500: '#6474f1',
          600: '#4f55e5',
          700: '#4244ca',
          800: '#3638a3',
          900: '#303581',
          950: '#1e1f4c',
        },
        surface: {
          light: '#f8f7ff',
          dark: '#0f0f1a',
        }
      },
      animation: {
        'slide-in': 'slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in': 'fadeIn 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.10)',
        'modal': '0 24px 64px rgba(0,0,0,0.18)',
      }
    },
  },
  plugins: [],
}
