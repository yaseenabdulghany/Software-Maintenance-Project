/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#FFFFFF',
          dark: '#0F172A',
        },
        surface: {
          DEFAULT: '#F1F5F9',
          dark: '#1E293B',
          hover: '#E2E8F0',
          'hover-dark': '#334155',
        },
        primary: {
          DEFAULT: '#4F46E5',
          dark: '#6366F1',
          hover: '#4338CA',
          'hover-dark': '#818CF8',
        },
        accent: {
          DEFAULT: '#818CF8',
          dark: '#A5B4FC',
        },
        content: {
          DEFAULT: '#0F172A',
          dark: '#F1F5F9',
          muted: '#64748B',
          'muted-dark': '#94A3B8',
        },
        edge: {
          DEFAULT: '#E2E8F0',
          dark: '#334155',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Cairo', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 23, 42, 0.06)',
        'card-dark': '0 1px 3px rgba(0, 0, 0, 0.3)',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-scale': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'fade-in-scale': 'fade-in-scale 200ms ease-out',
      },
    },
  },
  plugins: [],
}
