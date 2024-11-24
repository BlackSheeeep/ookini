import _ from "lodash";
import React from "react";
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import utils from "./common/utils";
import { Script } from "vm";

function App() {
  // SSR Render
  return (
    <html
      style={
        utils.isMobileDevice
          ? {
              fontSize: (375 / 800) * 8 + "px",
            }
          : {}
      }
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <meta name="theme-color" content="#000000" />
        <title>ookini</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            #root {
              display: none;
            }
            body .skiptranslate:first-child {
  display: none;}
  #trans {
  position: relative;
  }
  .goog-te-gadget {
  position: absolute;
  display: flex !important;
  visibility: hidden;
  top: -20px;
  }
#:1.menuBody {
background:red}
            `,
          }}
        ></style>
        <Links></Links>
        <Scripts></Scripts>
      </head>
      <body>
        <div id="google_translate_element"></div>
        <div id="root">
          <Outlet></Outlet>
        </div>

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            window.googleTranslateElementInit = function () {
            var google = window.google;
            if (!google) return "";
            new google.translate.TranslateElement(
              {
                pageLanguage: "ja",
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                includedLanguages: "en,zh-CN,ja,ko,ru,zh-TW",
              },
              "google_translate_element"
            );
          }
            `,
          }}
        />
      </body>
    </html>
  );
}

export default App;
