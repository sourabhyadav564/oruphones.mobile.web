module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'Roboto-Bold': ['Roboto-Bold'],
      'Roboto-Semibold': ['Roboto-Semibold'],
      'Roboto-Light': ['Roboto-Light'],
      'Roboto-Regular': ['Roboto-Regular'],
      'Roboto-Regularitalic': ['Roboto-Regularitalic'],
      'Roboto-Medium': ['Roboto-Medium']
    },
    extend: {
      fontSize: {
        'nx': '5px',
        'ax': '6px',
        'kx': '8px',
        'lx': '9px',
        'bx': '10px',
        'cx': '11px',
        'jx': '12px',
        'mx': '13px',
        'ex': '14px',
        'dx': '15px',
        'gx': '16px',
        'tx': '18px',
        'px': '20px',
        'qx': '22px',
        'rx': '25px',
        'ix': '27px',
        'ox': '29px',
        'fx': '30px',
        'sx': '40px',
        'hx': '100px',

        'ux': '0px',
        'vx': '0px',
        'wx': '0px',
        'xx': '0px',
        'yx': '0px',
        'zx': '0px',
      },
      colors: {
        primary: {
          light: "#2c2f44",
          darkest: "#2c2f44",
          dark: "#2c2f44",
          DEFAULT: "#2c2f44",
          NavyBlue: "#2C2F45"
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
          DEFAULT: "#FF0000",
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
        loginBg: "url('https://d1tl44nezj10jx.cloudfront.net/assets/login_bg.png')",
        bottomNAVBG: "url('https://d1tl44nezj10jx.cloudfront.net/assets/bottom-nav.png')",
        appStore: "url('https://d1tl44nezj10jx.cloudfront.net/assets/app_store.svg')",
        playStore: "url('https://d1tl44nezj10jx.cloudfront.net/assets/play_store.png')",
      },
    },
  },
  variants: {
    extend: {},
    accentColor: ['responsive', 'dark', 'group-hover', 'focus-within', 'hover', 'focus', '#E8E8E8']
  },
  plugins: [require("@tailwindcss/line-clamp"),
  require('tailwind-accent-color')(),
  ],
};
