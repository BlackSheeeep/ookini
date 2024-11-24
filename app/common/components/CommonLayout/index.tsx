import React, { Suspense, useLayoutEffect, useState } from "react";
import { Layout, theme, Affix, ConfigProvider } from "antd";
import LayoutScss from "./Layout.module.scss";
import utils from "~/common/utils";
import HeaderContent from "./HeaderContent";
import FooterContent from "./FooterContent";
import FloatGroup from "../FloatGroup";
import Loading from "../Loading";
import CommonAdvantageDialog from "../CommonAdvantageDialog";
import { RecoilRoot } from "recoil";
import customTheme from "~/common/styles/theme";

const { useToken } = theme;
interface IProps {
  children?: React.ReactNode;
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>{"( ´•̥̥̥ω•̥̥̥` )"}</h1>
          <h2>
            いくつかのエラーが発生しました。ページを更新して、もう一度お試しください。
          </h2>
          <h2>出现了一些错误，请刷新网页重试</h2>
          <h2>Some errors occurred, please refresh the page and try again</h2>
        </>
      );
    }

    return this.props.children;
  }
}
const { Header, Footer, Content } = Layout;

const CommonLayout: React.FC<IProps> = (props: IProps) => {
  const { children } = props;
  const [key, update] = useState(Date.now());
  const [googleTrans, setHasGoogleTrans] = useState<HTMLElement | null>();

  const { token } = useToken();
  useLayoutEffect(() => {
    const root = document.getElementById("root");
    root.style.display = "unset";
    utils.isMobileDevice && update(Date.now());
    let timer = setInterval(() => {
      const gs = document.querySelector(".skiptranslate iframe") || null;
      if (gs && !googleTrans) {
        setHasGoogleTrans(gs);
        clearInterval(timer);
        tiemr = null;
      }
    }, 300);
  }, []);
  React.useLayoutEffect(() => {
    function loop() {
      setTimeout(() => {
        const google =
          document.getElementById("google_translate_element") || null;
        //   const trans = document.getElementById("trans") || null;

        if (google) {
          // trans.appendChild(google);
          const timer = setInterval(() => {
            // const skips = document.querySelectorAll("iframe.skiptranslate");
            // skips.forEach((item: HTMLElement) => {
            //   item.style.display = "none";
            // });
          }, []);
        } else {
          loop();
        }
      }, 100);
    }
    try {
      const script = document.createElement("script");
      script.innerHTML = `  (() => {
            try {
              window.runTime = {};
              window.runTime.setRem = function setRem() {
                var screenWidth =
                  document.documentElement?.clientWidth ||
                  document.body?.clientWidth;
                screenWidth =
                  screenWidth < 1200 && screenWidth > 600 ? 1200 : screenWidth;
                var baseFontSize = 8; // 设置基准字体大小（单位是px）
                var dpr = window.devicePixelRatio || 1; // 获取设备像素比
                var rem = (screenWidth /(375 * 2) ) * baseFontSize; 
                document?.body?.style.overflowX = "none";
                document?.documentElement?.style.fontSize = rem + "px";
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
            
              return "";
            } catch (error) {}
          })();
           `;
      setTimeout(() => {
        const gs = document.createElement("script");
        gs.defer = true;
        gs.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.append(script);
        document.body.append(gs);
        loop();
      }, 500);
    } catch (e) {
      console.warn(e);
    }
  }, []);
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgLayout,
    display: "flex",
    flexDirection: "column",
  };

  return (
    <ErrorBoundary>
      <RecoilRoot>
        <Layout>
          <ConfigProvider theme={customTheme} key={key}>
            <Affix offsetTop={0}>
              <Header className={utils.uniteClass(LayoutScss.header, "hf-bg")}>
                <HeaderContent />
              </Header>
            </Affix>
            <Content className={LayoutScss.content} style={contentStyle}>
              <Suspense fallback={<Loading></Loading>}>{children}</Suspense>
            </Content>
            <Footer className={utils.uniteClass(LayoutScss.footer, "hf-bg")}>
              <FooterContent />
            </Footer>
            <FloatGroup />
            <CommonAdvantageDialog />
          </ConfigProvider>
        </Layout>
      </RecoilRoot>
    </ErrorBoundary>
  );
};

export default React.memo(CommonLayout);
