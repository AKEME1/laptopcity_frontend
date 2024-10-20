/** @type {import('tailwindcss').Config} */
const path = require('path');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

    boxShadow: {
        'card': '0 0 0 1px rgba(0, 0, 0, 0.04), 0 4px 16px -4px rgba(0, 0, 0, 0.16)',
      },

      backgroundImage: {
        'hero-pattern': `url(${path.resolve(__dirname, './src/assets/background.webp')})`,
        'footer-texture': "url('/images/footer-texture.png')",
      },
    colors: {
  'custom-black':'#222222',
  'custom-gray': '#6a6a6a', // Define your custom color
  'custom-green': '#44AA99',
  'custom-blue': '#A3C1DA',
      },
      fontFamily:{
// Add Space Grotesk to the font family
  'space-grotesk': ["Space Grotesk", 'sans-serif'],
  'Roboto':['Roboto']
      },
      spacing: {
        '1': '8px',    // 8px
        '2': '16px',   // 16px
        '3': '24px',   // 24px
        '4': '32px',   // 32px
        '5': '40px',   // 40px
        '6': '48px',   // 48px
        '7': '56px',   // 56px
        '8': '64px',   // 64px
        '9': '72px',   // 72px
        '10': '80px',  // 80px
      },
      fontSize:{
        'xs': '12px',   // Smallest text
        'sm': '14px',   // Small text, labels, or captions
        'base':'16px', // Base body text
        'lg': '18px',   // Larger body text
        'xl': '20px',   // Small heading
        '2xl':'22px',  // Larger heading
        '3xl':'25px',  // H2 size
        '4xl':'28px',  // H1 size
        '5xl':'32px',  // Main heading
        '6xl':'36px',  // Very large heading
        '7xl':'40px',  // Extra large heading
      }
    },
  },
  plugins: [],
}
