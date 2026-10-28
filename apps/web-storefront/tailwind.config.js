/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui-kit/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        forest: {
          50: '#f2f6f3',
          100: '#e0eae3',
          200: '#c2d5c8',
          600: '#2f5b42',
          700: '#244a35',
          800: '#1c3a2a',
          900: '#142a1f',
          950: '#0c1a13',
        },
        mango: {
          50: '#fff8eb',
          100: '#ffedc7',
          300: '#fbcf6b',
          400: '#f5b83d',
          500: '#e89c1c',
          600: '#c97c10',
        },
        cream: {
          50: '#fdfcf9',
          100: '#faf7f0',
          200: '#f3ede0',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(20,42,31,0.04), 0 4px 16px rgba(20,42,31,0.06)',
        lift: '0 2px 4px rgba(20,42,31,0.05), 0 12px 32px rgba(20,42,31,0.10)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
