import React from "react";
import { Outlet, RemixBrowser, RemixServer } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import Home from "./views/Home";

const rootEl = document.getElementById("root");

startTransition(() => {
  document && hydrateRoot(document!, <RemixBrowser />);
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
