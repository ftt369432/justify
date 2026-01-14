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
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
                body: ['Plus Jakarta Sans', 'sans-serif'],
            },
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: '#3b5998',
                    50: '#f0f6ff',
                    100: '#e0eafc',
                    200: '#c2d5f9',
                    300: '#9ab7f4',
                    400: '#7494eb',
                    500: '#5476dc',
                    600: '#3b5998',
                    700: '#344b7c',
                    800: '#2b3c64',
                    900: '#1e2a45',
                    950: '#111827',
                },
                secondary: {
                    DEFAULT: '#6b7280',
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                    950: '#030712',
                },
                metallic: {
                    blue: '#475569',
                    steel: '#64748b',
                    dark: '#0f172a',
                    bright: '#94a3b8',
                },
            },
            animation: {
                'shimmer': 'shimmer 2s infinite linear',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
            backgroundImage: {
                'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                'metallic-gradient': 'linear-gradient(135deg, #475569 0%, #334155 100%)',
                'steel-gradient': 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
                'premium-mesh': 'radial-gradient(at 0% 0%, hsla(222,47%,11%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(217,91%,60%,0.15) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(222,47%,11%,1) 0, transparent 50%), radial-gradient(at 0% 100%, hsla(217,91%,60%,0.15) 0, transparent 50%)',
            },
            boxShadow: {
                'elite': '0 20px 50px -12px rgba(0, 0, 0, 0.5)',
                'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
            },
        },
    },
    plugins: [],
}
