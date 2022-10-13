module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily:{
      'SF-Pro':['SF-Pro-Display-Regular']
    },
    extend: {
      colors: {
        primary: { 
          light: "#2c2f44",
          darkest: "#2c2f44",
          dark: "#2c2f44",
          DEFAULT: "#2c2f44",
          NavyBlue:"#2C2F45"
        },
        green: {
          light: "#2c2f44",
        },
        mwhite: {
          DEFAULT: "#0000001A",
        },
        gray: {
          DEFAULT: "#ACACAC",
          70: "#707070",
          20: "#202020",
          1: "rgba(0, 0, 0, 0.08)",
          ef: "#EFEFEF",
          c7: "#C7C7C7",
        },
        black: {
          DEFAULT: "#000000",
          "4e": "#4E4E4E",
          "7e": "#7E7E7E",
          21: "#212121",
        },
        yellow: {
          fb: "#FBB215",
        },
        red: {
          DEFAULT : "#FF0000",
        },
      },
      boxShadow: {
        top: "0 -10px 20px rgba(0, 0, 0, 0.1)",
        brandCard: "0 0 5px rgba(0, 0, 0, 0.08)",
        "003": "0 0 3px #C7C7C7",
      },
      // fontFamily: {
      //   "open-sans": '"Open Sans", Helvetica, Arial, sans-serif',
      // },
      container: {
        center: true,
        padding: "1rem",
      },
      backgroundImage: {
        loginBg: "url('../assets/login_bg.png')",
        bottomNAVBG: "url('../assets/bottom-nav.png')",
        appStore: "url('../assets/app_store.svg')",
        playStore: "url('../assets/play_store.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
