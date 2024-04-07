import "./App.css";
import { ConfigProvider } from "antd";
import React from "react";
import themeConfig from "common/styles/theme.js";
import { RecoilRoot } from "recoil";
import Router from "./Router";

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

export default App;
