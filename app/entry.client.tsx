import React from "react";
import { RemixBrowser } from "@remix-run/react";
import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  document && hydrateRoot(document!, <RemixBrowser />);
  const script = document.createElement("script");
  script.innerHTML = `  (() => {
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
          })();
             function googleTranslateElementInit() {
        new google.translate.TranslateElement({ pageLanguage: 'ja', layout: google.translate.TranslateElement.InlineLayout.SIMPLE, includedLanguages: 'zh-CN,zh-TW,ja,ko,ru' }, 'google_translate_element');
    }`;
  const element = document.createElement("div");
  const gs = document.createElement("script");
  gs.defer = true;
  gs.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  element.id = "google_translate_element";
  document.body.append(element);

  document.body.append(gs);
  document.body.append(script);
});

// rootEl.style.overflowX = "hidden";
// rootEl.style.width = "100rem";
// const root = ReactDOM.createRoot(rootEl);
// // 设置初始的rem
// // root下有东西说明不是预渲染
// // window.isProduction = rootEl.hasChildNodes();
// console.log("wiwiwiwi");
// root.render(<App />);

// export default App;
