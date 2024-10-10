import _ from "lodash";
import React from "react";
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import CommonLayout from "./common/components/CommonLayout";
import { RecoilRoot } from "recoil";
import utils from "./common/utils";

function App() {
  // SSR Render
  return (
    <html
      style={{
        fontSize: utils.isMobileDevice ? (390 / 800) * 8 + "px" : "unset",
      }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <meta name="theme-color" content="#000000" />
        <title>ookini</title>
        <Links></Links>
        <Scripts></Scripts>
        <script
          dangerouslySetInnerHTML={{
            __html: `  (() => {
            try {
              window.runTime = {};
              window.runTime.setRem = function setRem() {
                var screenWidth =
                  document.documentElement.clientWidth ||
                  document.body.clientWidth;
                screenWidth =
                  screenWidth < 1200 && screenWidth > 600 ? 1200 : screenWidth;
                var baseFontSize = 8; // 设置基准字体大小（单位是px）
                var dpr = window.devicePixelRatio || 1; // 获取设备像素比
                var rem = (screenWidth / 800) * baseFontSize; // 假设设计稿宽度为375 * 3px (3倍图)
                document.body.style.overflowX = "none";
                document.documentElement.style.fontSize = rem + "px";
              };
              window.runTime.setRem();

              document.addEventListener("DOMContentLoaded", function () {
                // 设置初始的rem
                window.runTime.setRem();

                // 在窗口大小发生变化时重新设置rem
                window.addEventListener(
                  "resize",
                  window.runTime.setRem
                );
              });
              window.googleTranslateElementInit = function () {
                var google = window.google;
                if (!google) return "";
                new google.translate.TranslateElement(
                  {
                    pageLanguage: "ja",
                    layout:
                      google.translate.TranslateElement.InlineLayout.SIMPLE,
                    includedLanguages: "zh-CN,zh-TW,ja,ko,ru",
                  },
                  "google_translate_element"
                );
              };
              return "";
            } catch (error) {}
          })()`,
          }}
        ></script>
        {/* <link rel="stylesheet" href="/antd.min.css"></link> */}
      </head>
      <body>
        <div id="root">
          <Outlet></Outlet>
        </div>

        <div id="google_translate_element"></div>
      </body>
    </html>
  );
}

export default App;
