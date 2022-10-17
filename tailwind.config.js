/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  content: [],
  theme: {
    
    extend : {
      screens: {
        'sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
      },
      colors: {
        'orange' : 'hsl(26, 100%, 55%)',
        'pale-orange': 'hsl(25, 100%, 94%)',
        'very-dark-blue': 'hsl(220, 13%, 13%)',
        'dark-grayish-blue': 'hsl(219, 9%, 45%)',
        'grayish-blue': 'hsl(220, 14%, 75%)',
        'light-grayish-blue': 'hsl(223, 64%, 98%)'
      },

      animation:{
        slideIn : 'slideIn 200ms ease-in-out '
      },

      keyframes:{
        slideIn :{
          '0%': { transform: 'translateX(-100%)' },
          '50% , 100%': { transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}
