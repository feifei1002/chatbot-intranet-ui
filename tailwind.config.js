module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'chatbot-blue': '#03012C',
        'chatbot-pink': '#EA638C',
        'navbar-blue': '#242C3F',
      },
    },
  },
  plugins: [],
}