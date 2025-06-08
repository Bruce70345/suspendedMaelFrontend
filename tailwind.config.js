/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // New Color Palette
        'old_rose': {
          DEFAULT: '#CA848A',
          100: '#2e1416',
          200: '#5d282c',
          300: '#8b3c42',
          400: '#b6545c',
          500: '#ca848a',
          600: '#d49ba0',
          700: '#dfb4b8',
          800: '#eacdcf',
          900: '#f4e6e7'
        },
        'desert_sand': {
          DEFAULT: '#DCBC9E',
          100: '#372514',
          200: '#6f4a28',
          300: '#a66f3c',
          400: '#c89566',
          500: '#dcbc9e',
          600: '#e3c9b1',
          700: '#ead7c5',
          800: '#f1e4d8',
          900: '#f8f2ec'
        },
        'mountbatten_pink': {
          DEFAULT: '#856879',
          100: '#1a1518',
          200: '#352930',
          300: '#4f3e48',
          400: '#695360',
          500: '#856879',
          600: '#9e8493',
          700: '#b6a2ae',
          800: '#cfc1c9',
          900: '#e7e0e4'
        },
        'light_coral': {
          DEFAULT: '#DE8486',
          100: '#380f0f',
          200: '#6f1e1f',
          300: '#a72c2e',
          400: '#cf4b4d',
          500: '#de8486',
          600: '#e49b9c',
          700: '#ebb4b5',
          800: '#f2cdce',
          900: '#f8e6e6'
        },
        'melon': {
          DEFAULT: '#FFB1A5',
          100: '#540b00',
          200: '#a71600',
          300: '#fb2100',
          400: '#ff6750',
          500: '#ffb1a5',
          600: '#ffbfb6',
          700: '#ffcfc8',
          800: '#ffdfda',
          900: '#ffefed'
        },
        'light_red': {
          DEFAULT: '#F97373',
          100: '#460303',
          200: '#8b0606',
          300: '#d10909',
          400: '#f62b2b',
          500: '#f97373',
          600: '#fa8d8d',
          700: '#fbaaaa',
          800: '#fdc6c6',
          900: '#fee3e3'
        },
        'coral_pink': {
          DEFAULT: '#FB9A84',
          100: '#4a0f02',
          200: '#941f05',
          300: '#df2e07',
          400: '#f95c39',
          500: '#fb9a84',
          600: '#fcae9c',
          700: '#fdc2b5',
          800: '#fdd6ce',
          900: '#feebe6'
        },
        'redwood': {
          DEFAULT: '#96514D',
          100: '#1e1010',
          200: '#3d211f',
          300: '#5b312f',
          400: '#79413e',
          500: '#96514d',
          600: '#b36e6b',
          700: '#c69390',
          800: '#d9b7b5',
          900: '#ecdbda'
        },
        'peach': {
          DEFAULT: '#FEBE98',
          100: '#511e01',
          200: '#a23c02',
          300: '#f25a02',
          400: '#fd8b49',
          500: '#febe98',
          600: '#feccae',
          700: '#fed8c2',
          800: '#ffe5d7',
          900: '#fff2eb'
        },
        // Alias for primary colors
        primary: {
          50: '#fff2eb',
          100: '#ffe5d7',
          200: '#fed8c2',
          300: '#feccae',
          400: '#fd8b49',
          500: '#FEBE98', // Peach main
          600: '#f25a02',
          700: '#a23c02',
          800: '#511e01',
          900: '#2a0f00',
        },
        secondary: {
          50: '#f8f2ec',
          100: '#f1e4d8',
          200: '#ead7c5',
          300: '#e3c9b1',
          400: '#c89566',
          500: '#DCBC9E', // Desert sand main
          600: '#a66f3c',
          700: '#6f4a28',
          800: '#372514',
          900: '#1c120a',
        },
        tertiary: {
          50: '#e7e0e4',
          100: '#cfc1c9',
          200: '#b6a2ae',
          300: '#9e8493',
          400: '#695360',
          500: '#856879', // Mountbatten pink main
          600: '#4f3e48',
          700: '#352930',
          800: '#1a1518',
          900: '#0d0a0c',
        },
        // Surface colors
        surface: {
          50: '#fefcfb',
          100: '#fdf9f7',
          200: '#fcf6f3',
          300: '#fbf3ef',
          400: '#faf0eb',
          500: '#f9ede7',
        },
        // Accent colors
        accent: {
          coral: '#DE8486',
          melon: '#FFB1A5',
          rose: '#CA848A',
          warm: '#FB9A84',
        },
      },
      boxShadow: {
        'soft': '0 2px 12px rgba(254, 190, 152, 0.08)',
        'medium': '0 4px 20px rgba(254, 190, 152, 0.12)',
        'bento': '0 8px 32px rgba(254, 190, 152, 0.15)',
        'bento-hover': '0 12px 40px rgba(254, 190, 152, 0.25)',
        'glass': '0 8px 32px rgba(255, 255, 255, 0.37)',
        'peach-glow': '0 0 30px rgba(254, 190, 152, 0.3)',
        'capsule': '0 4px 24px rgba(220, 188, 158, 0.15)',
        'capsule-hover': '0 8px 32px rgba(220, 188, 158, 0.25)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        'capsule': '9999px',
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '16px',
        xl: '24px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(254, 190, 152, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(254, 190, 152, 0.8)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

