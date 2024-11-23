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

  const { token } = useToken();
  useLayoutEffect(() => {
    utils.isMobileDevice && update(Date.now());
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
