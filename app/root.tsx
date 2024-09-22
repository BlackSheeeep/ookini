import "./App.css";
import { ConfigProvider } from "antd";
import React from "react";
import themeConfig from "~/common/styles/theme.js";
import { RecoilRoot } from "recoil";
import Router from "./Router";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { Outlet } from "react-router-dom";
import { renderToString } from "react-dom/server";
import type Entity from "@ant-design/cssinjs/es/Cache";
import Home from "./views/Home";
import _ from "lodash";
import "./antd.min.css";

function App() {
  // SSR Render
  const cache = React.useMemo<Entity>(() => createCache(), []);

  return (
    <html>
      <head>
        {/* <meta charset="utf-8" /> */}
        <link
          rel="stylesheet"
          type="text/css"
          href="public/antd.min.css"
        ></link>
        <link rel="icon" href="public/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta lang="ja" content="translate" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="public/logo192.png" />
        <link rel="manifest" href="public/manifest.json" />

        <title>ookini</title>
      </head>
      <body>
        <div id="root"></div>
        <Outlet></Outlet>
        <div id="google_translate_element"></div>
        {/* 
        <script>
          {(() => {
            globalThis.runTime = {};
            globalThis.runTime.setRem = function setRem() {
              var screenWidth =
                document.documentElement.clientWidth ||
                document.body.clientWidth;
              screenWidth =
                screenWidth < 1200 && screenWidth > 600 ? 1200 : screenWidth;
              var baseFontSize = 8; // 设置基准字体大小（单位是px）
              var dpr = globalThis.devicePixelRatio || 1; // 获取设备像素比
              var rem = (screenWidth / 800) * baseFontSize; // 假设设计稿宽度为375 * 3px (3倍图)
              document.body.style.overflowX = "none";
              document.documentElement.style.fontSize = rem + "px";
            };
            globalThis.runTime.setRem();

            document.addEventListener("DOMContentLoaded", function () {
              // 设置初始的rem
              globalThis.runTime.setRem();

              // 在窗口大小发生变化时重新设置rem
              globalThis.addEventListener("resize", globalThis.runTime.setRem);
            });
            return "";
          })()}
        </script>
        <script type="text/javascript">
          {(() => {
            function googleTranslateElementInit() {
              var google = globalThis.google;
              if (!google) return "";
              new google.translate.TranslateElement(
                {
                  pageLanguage: "ja",
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  includedLanguages: "zh-CN,zh-TW,ja,ko,ru",
                },
                "google_translate_element"
              );
            }
            return "";
          })()}
        </script>
        <script
          type="text/javascript"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          defer
        ></script> */}
      </body>
    </html>
  );
}

export default App;
