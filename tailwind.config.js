/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        opacityKeyFrame: {
          0: {
            opacity: "100%",
          },
          50: {
            opacity: "50%",
          },
          100: {
            opacity: "0%",
          },
        },
      },
      animation: {
        "opacity-animate": "opacityKeyFrame 1 0.5 infinite alternate ",
      },
    },
  },
  plugins: [],
};
