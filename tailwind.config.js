module.exports = {
  content: ["./index.html", "./src/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"]
      },
      colors: {
        brand: {
          DEFAULT: "#2563eb",
          dark: "#1e40af"
        }
      }
    }
  },
  darkMode: "class",
  plugins: []
}
