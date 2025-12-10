/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-base': '#0f0f0f',
        'bg-elevated': '#1a1a1a',
        'bg-card': '#1f1f1f',
        'bg-input': '#161616',
        'bg-hover': '#242424',
        'bg-code': '#161616',

        // Text
        'text-primary': '#fafafa',
        'text-secondary': '#a1a1a1',
        'text-tertiary': '#6f6f6f',
        'text-code': '#d4d4d4',

        // Brand & Status
        'brand-primary': '#3b82f6',
        'brand-secondary': '#8b5cf6',
        'success': '#10b981',
        'success-dark': '#059669',

        // Borders
        'border-base': '#2a2a2a',
        'border-hover': '#404040',
        'border-focus': '#3b82f6',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', 'Monaco', '"Cascadia Code"', '"Roboto Mono"', 'Menlo', '"Courier New"', 'monospace'],
      },
      fontSize: {
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      borderRadius: {
        md: '0.5rem',
        lg: '0.75rem',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px rgba(0, 0, 0, 0.3)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.4)',
        focus: '0 0 0 3px rgba(59, 130, 246, 0.15)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        'ease-out-custom': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 300ms cubic-bezier(0, 0, 0.2, 1)',
        'fade-in': 'fadeIn 300ms cubic-bezier(0, 0, 0.2, 1)',
        'spin-custom': 'spin 0.8s linear infinite',
        'pulse-custom': 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
