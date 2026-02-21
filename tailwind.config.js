/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'pinvocab-bg': '#DED9D1',
        'pinvocab-text': '#222220',
      },
      fontFamily: {
        'pinvocab': ['GFSDidot-Regular'],
        'roboto': ['Roboto-Regular'],
        'roboto-medium': ['Roboto-Medium'],
        'roboto-bold': ['Roboto-Bold'],
      },
    },
  },
  plugins: [],
};
