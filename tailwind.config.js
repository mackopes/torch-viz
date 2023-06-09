/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
      theme: {
      extend: {
        colors: {
          primary: "#14213D",
          secondary: "#E5E5E5",
          highlight: "#FCA311",
          torchBlue: "#4974D1",
        },
        fontFamily: {
          merriweather: ['Merriweather Sans'],
          roboto: ['Roboto'],
        },
      },
    },
    plugins: [],
  }
