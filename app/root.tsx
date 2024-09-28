import _ from "lodash";
import React from "react";
import { Outlet } from "react-router-dom";
import { Links, Meta, Scripts } from "@remix-run/react";
import { RecoilRoot } from "recoil";
import CommonLayout from "./common/components/CommonLayout";
function App() {
  // SSR Render
  return (
    <html id="root">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="stylesheet" href="./antd.min.css" /> */}
        <Meta />
        {/* <meta charset="utf-8" /> */}
        {/* <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta lang="ja" content="translate" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
       */}
        <Links />
        <Scripts />
        <title>ookini</title>
      </head>
      <body>
        <CommonLayout></CommonLayout>
        {/* <Outlet></Outlet> */}
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
