import fs from "fs";
import { extractStyle } from "@ant-design/static-style-extract";
import path from "path";
import { ConfigProvider } from "antd";
import React from "react";
const outputPath = "../public/antd.min.css";
// import utils from "../app/common/utils";

const theme = {
  token: {
    colorPrimary: "#ffcd8f",
    borderRadius: 8,
    fontSize: 16,
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

const css = extractStyle((node) => (
  <ConfigProvider theme={theme}>{node}</ConfigProvider>
));
console.log(path.resolve(__dirname, outputPath));
fs.writeFileSync(path.resolve(__dirname, outputPath), css);
