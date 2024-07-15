module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "Sans-serif"],
      },
      backgroundImage: {
        'gradient-hero': "linear-gradient(90deg, #000026 0%, #0d1645 40%, #320a5b 80%)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2888AA",
          secondary: "#CCDEF1",
          accent: "#1E657E",
          neutral: "#2F2F2F",
          "base-100": "#520d5a", // Background color
          info: "#D6D5D5",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#E99A8B",
        },
      },
      "light",
      "dark",
      "cupcake",
      "coffee",
    ],
  },
  plugins: [require("daisyui")],
};
