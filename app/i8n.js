import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend"; // 如果需要异步加载语言文件

i18n
  .use(Backend) // 使用异步加载
  .use(initReactI18next) // 初始化 react-i18next
  .init({
    ns: ["reservation", "common"],
    defaultNS: "common",
    fallbackLng: "ja", // 默认语言
    debug: true, // 开发模式下开启调试
    interpolation: {
      escapeValue: false, // React 已经默认转义，不需要额外处理
    },
    backend: {
      loadPath:
        (process.env.NODE_ENV === "production" ? "" : "/public") +
        "/locales/{{lng}}/{{ns}}.json", // 语言文件路径
    },
  });

export default i18n;
