import _ from "lodash";
import React from "react";
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import utils from "./common/utils";

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
        <Links></Links>
        <Scripts></Scripts>
      </head>
      <body>
        <div id="root">
          <Outlet></Outlet>
        </div>
        <div id="google_translate_element"></div>
        <div id="trans"></div>
      </body>
    </html>
  );
}

export default App;
