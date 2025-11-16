/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary-green': '#10B981',
                'primary-blue': '#3B82F6',
                'primary-teal': '#14B8A6',
                'risk-low': '#10B981',
                'risk-medium': '#F59E0B',
                'risk-high': '#EF4444',
            },
        },
    },
    plugins: [],
}
