/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f5ff',
          100: '#b3e0ff',
          200: '#80cbff',
          300: '#4db6ff',
          400: '#1aa1ff',
          500: '#0094FF',
          600: '#0076cc',
          700: '#005899',
          800: '#003a66',
          900: '#001c33',
        },
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'rotate-3d': 'rotate3d 20s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 3px rgba(0, 148, 255, 0.3), 0 0 6px rgba(0, 148, 255, 0.2), 0 0 9px rgba(0, 148, 255, 0.15)' },
          '100%': { boxShadow: '0 0 5px rgba(0, 148, 255, 0.4), 0 0 10px rgba(0, 148, 255, 0.3), 0 0 15px rgba(0, 148, 255, 0.2)' },
        },
        rotate3d: {
          '0%': { transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(360deg) rotateY(360deg) rotateZ(0deg)' },
        },
        glowPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(0, 148, 255, 0.2), 0 0 10px rgba(0, 148, 255, 0.15), inset 0 0 10px rgba(0, 148, 255, 0.05)',
          },
          '50%': { 
            boxShadow: '0 0 8px rgba(0, 148, 255, 0.3), 0 0 16px rgba(0, 148, 255, 0.2), inset 0 0 15px rgba(0, 148, 255, 0.1)',
          },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 5px rgba(0, 148, 255, 0.2), 0 0 10px rgba(0, 148, 255, 0.15)',
        'cyan-glow-lg': '0 0 8px rgba(0, 148, 255, 0.25), 0 0 16px rgba(0, 148, 255, 0.2)',
      },
    },
  },
  plugins: [],
}

