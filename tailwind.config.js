/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',   
        'bounce-slow': 'bounce 2s infinite',    
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(7px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
    },
  },
    

  plugins: [],
}


