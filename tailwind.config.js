/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      colors: {
        "macos-gray": "#f5f5f7",
        "macos-dark": "#1d1d1f",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
