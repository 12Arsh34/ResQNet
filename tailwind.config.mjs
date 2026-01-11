import { join } from 'path'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00cccc',
          50: '#e6fbfb',
          100: '#dff7f6',
          200: '#bff0ec',
        },
        accent: {
          DEFAULT: '#ff55b4',
        },
        danger: {
          DEFAULT: '#ef4444'
        },
        map: {
          muted: '#ebf6f6'
        }
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.75rem'
      },
      boxShadow: {
        soft: '0 8px 24px rgba(2, 31, 35, 0.06)',
        med: '0 12px 40px rgba(2, 31, 35, 0.08)',
        'glow-red': '0 0 16px rgba(239,68,68,0.25)',
      },
      keyframes: {
        floatY: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0)' }
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        markerPulse: {
          '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.9' },
          '70%': { transform: 'translate(-50%, -50%) scale(2.6)', opacity: '0' },
          '100%': { opacity: '0' }
        }
      },
      animation: {
        floatY: 'floatY 6s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 360ms cubic-bezier(.2,.9,.3,1) both',
        'marker-pulse': 'markerPulse 1.6s infinite ease-out'
      }
    }
  },
  plugins: [
    // Forms or typography could be added here if desired
  ]
}
