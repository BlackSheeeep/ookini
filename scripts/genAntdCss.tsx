import fs from "fs";
import React from "react";
import { extractStyle } from "@ant-design/static-style-extract";
import { ConfigProvider } from "antd";
const outputPath = "./public/antd.min.css";

const css = extractStyle((node) => (
  <ConfigProvider
    theme={{
      token: {
        // colorPrimary: "#ab493d",
        // colorPrimary: "#B0E0E6",
        colorPrimary: "#ffcd8f",
        // colorBgBase: "#fff8c2",
        // colorBgBase: "#f9f2e7",
        borderRadius: 8,
        fontSize: 14,
        fontFamily: "sans-serif",
        // Components: {
        //   Carousel: {
        //     dotActiveWidth: 30,
        //     dotHeight: 20,
        //     dotWidth: 30,
        //   },
        // },
      },
    }}
  >
    {node}
  </ConfigProvider>
));

fs.writeFileSync(outputPath, css);
