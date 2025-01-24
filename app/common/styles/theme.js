import utils from "~/common/utils";

export default {
  token: {
    // colorPrimary: "#ab493d",
    // colorPrimary: "#B0E0E6",
    colorPrimary: "#ffbbc0",
    // colorBgBase: "#fff8c2",
    // colorBgBase: "#f9f2e7",
    borderRadius: 8,
    fontSize: utils.isMobileDevice ? 14 : 16,
    fontFamily: "sans-serif",

    Components: {
      Carousel: {
        dotActiveWidth: 30,
        dotHeight: 20,
        dotWidth: 30,
      },
    },
  },
};
