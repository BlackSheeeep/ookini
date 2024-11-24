import utils from "~/common/utils";

export default {
  token: {
    // colorPrimary: "#ab493d",
    // colorPrimary: "#B0E0E6",
    colorPrimary: "#ffcd8f",
    // colorBgBase: "#fff8c2",
    // colorBgBase: "#f9f2e7",
    borderRadius: 8,
    fontSize: utils.isMobileDevice ? 12 : 14,
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
