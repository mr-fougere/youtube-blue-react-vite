/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          blue: "var(--color-main-blue)",
        },
        second: {
          blue: "var(--color-second-blue)",
        },
        header: "var(--color-header)",
        disabled: "var(--color-disabled)",
      },
    },
  },
  plugins: [],
};
