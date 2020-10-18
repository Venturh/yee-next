module.exports = {
  purge: [],
  theme: {
    extend: {
      backgroundColor: {
        body: "#151519",
        toolbar: "#1A1A1E",
        accent: "#18181D",
        primary: "#4299E1",
      },
      textColor: {
        primary: "#4299E1",
      },
      borderColor: {
        primary: "#4299E1",
      },
      height: {
        "1/3": "33%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "4/4": "100%",
        "10/12": "90%",
        "11/12": "92%",
      },
      minHeight: { "1/4": "25%", "1/2": "50%" },
      borderRadius: { xl: "1rem" },
      inset: {
        "2": "2em",
        "20%": "22.5%",
        "50%": "50.0%",
      },
      screens: {
        lxl: "1440px",
        xxl: "1920px",
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  variants: {
    position: [
      "responsive",
      "group-hover",
      "first",
      "last",
      "odd",
      "even",
      "hover",
      "focus",
      "active",
      "visited",
      "disabled",
    ],
  },
  plugins: [],
};
