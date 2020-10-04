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
      minHeight: { "1/4": "25%", "1/2": "50%" },
      borderRadius: { xl: "1rem" },
      inset: {
        "2": "2em",
      },
      screens: {
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
