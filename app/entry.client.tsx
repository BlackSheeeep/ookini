import React from "react";
import { RemixBrowser } from "@remix-run/react";
import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
globalThis.baseURL = "https://cdn.address-ookini.com/wp-json";
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
