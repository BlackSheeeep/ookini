import "./App.css";
import { ConfigProvider } from "antd";
import React from "react";
import themeConfig from "~/common/styles/theme.js";
import { RecoilRoot } from "recoil";
import Router from "./Router";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

function App() {
  // SSR Render
  return (
    <ConfigProvider theme={themeConfig}>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </ConfigProvider>
  );
}

const rootEl = document.getElementById("root");

startTransition(() => {
  hydrateRoot(
    rootEl,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
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
