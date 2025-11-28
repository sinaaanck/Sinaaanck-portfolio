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
            animation: {
                "spin-slow": "spin 12s linear infinite",
                "float": "float 6s ease-in-out infinite",
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}