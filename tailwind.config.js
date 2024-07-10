/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}" ,],
  theme: {
    screens : {
      "xl" : "891px",
      "md" : {"min" : '451px' , "max" : "890px"},
      "sm" : {"min" : '320px' , "max" : "450px"},
    },
    extend: {

    },
  },
  plugins: [],
}

