/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#FFFFFF",
                "primary-dark": "#e2e8f0",
                "background-light": "#F8FAFC",
                "background-dark": "#050505",
                "surface-dark": "#0a0a0a",
            },
            fontFamily: {
                display: ["Space Grotesk", "sans-serif"],
                manrope: ["Manrope", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.618rem",
                lg: "1rem",
                xl: "1.618rem",
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
            },
            transitionTimingFunction: {
                'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
                'ease-out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                'ease-in-out-smooth': 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
                'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
            animation: {
                "spin-slow": "spin 12s linear infinite",
                "float": "float 6s ease-in-out infinite",
                "float-slow": "float-slow 8s ease-in-out infinite",
                "shimmer": "shimmer 2.5s ease-in-out infinite",
                "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "slide-down": "slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "slide-left": "slide-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "slide-right": "slide-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "fade-in": "fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "fade-out": "fade-out 0.5s ease-in-out forwards",
                "scale-up": "scale-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                "bounce-soft": "bounce-soft 1s ease-in-out infinite",
                "wiggle": "wiggle 1s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite alternate",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "smooth-reveal": "smooth-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'float-slow': {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                    '25%': { transform: 'translateY(-6px) rotate(0.5deg)' },
                    '50%': { transform: 'translateY(-12px) rotate(0deg)' },
                    '75%': { transform: 'translateY(-4px) rotate(-0.5deg)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-down': {
                    '0%': { opacity: '0', transform: 'translateY(-30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-left': {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'slide-right': {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-out': {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                'scale-up': {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                'bounce-soft': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                'wiggle': {
                    '0%, 100%': { transform: 'rotate(-1deg)' },
                    '50%': { transform: 'rotate(1deg)' },
                },
                'glow': {
                    '0%': { boxShadow: '0 0 5px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 255, 255, 0.05)' },
                    '100%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.2), 0 0 40px rgba(255, 255, 255, 0.1)' },
                },
                'smooth-reveal': {
                    '0%': { opacity: '0', transform: 'translateY(40px) scale(0.98)', filter: 'blur(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
                },
            }
        },
    },
    plugins: [],
}