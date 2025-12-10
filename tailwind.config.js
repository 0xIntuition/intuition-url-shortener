/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Backgrounds - refined for better depth
        'bg-base': '#0a0a0a',
        'bg-elevated': '#141414',
        'bg-card': '#1a1a1a',
        'bg-input': '#161616',
        'bg-hover': '#242424',
        'bg-code': '#1a1a1a',

        // Text - refined hierarchy
        'text-primary': '#f5f5f5',
        'text-secondary': '#a1a1a1',
        'text-tertiary': '#737373',
        'text-code': '#d4d4d4',

        // Brand - refined blue/purple palette with shades
        'brand-blue-light': '#60a5fa',
        'brand-blue': '#3b82f6',
        'brand-blue-deep': '#2563eb',
        'brand-purple-light': '#a78bfa',
        'brand-purple': '#8b5cf6',
        'brand-purple-deep': '#7c3aed',

        // Legacy aliases for compatibility
        'brand-primary': '#3b82f6',
        'brand-secondary': '#8b5cf6',

        // Status colors
        'success': '#10b981',
        'success-dark': '#059669',
        'warning': '#f59e0b',

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
        '4xl': '4rem',
        '5xl': '4.5rem',
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
        'card': '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.1)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.1)',
        'focus-refined': '0 0 0 3px rgba(59, 130, 246, 0.2), 0 0 0 1px rgba(59, 130, 246, 0.4)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      letterSpacing: {
        'tighter': '-0.02em',
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
