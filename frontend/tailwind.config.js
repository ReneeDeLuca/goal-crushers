/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
      screens: {
        sm: '450px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
    extend: {},
  },
  plugins: [
    
  ],
}

