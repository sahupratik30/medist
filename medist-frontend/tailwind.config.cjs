module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#04c300",
        secondary: "#defedd",
        "light-red": "#ff6464",
        "light-grey": "#e6e6e6",
        "dark-grey": "#5b5b5b",
        "medium-grey": "#6F7285",
        "extra-light-grey": "#f6f6f7",
      },
      backgroundImage: {
        hero: "url('./src/assets/hero-bg.jpg')",
      },
    },
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
    },
    container: {
      padding: "1rem",
      center: true,
      screens: {
        lg: "1192px",
        xl: "1192px",
        "2xl": "1192px",
      },
    },
    screens: {
      xs: "300px",
      s: "530px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
