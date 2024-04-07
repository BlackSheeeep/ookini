import "./global.d.ts";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "common/styles/global-variables.scss";
import "common/styles/global-class.scss";

const rootEl = document.getElementById("root");
rootEl.style.overflowX = "hidden";
rootEl.style.width = "100rem";
const root = ReactDOM.createRoot(document.getElementById("root"));
// 设置初始的rem
// root下有东西说明不是预渲染
window.isProduction = rootEl.hasChildNodes();
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
