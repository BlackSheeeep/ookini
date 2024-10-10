import React, { Suspense, useLayoutEffect, useState } from "react";
import { Layout, Flex, theme, Affix, ConfigProvider } from "antd";
import LayoutScss from "./Layout.module.scss";
import utils from "~/common/utils";
import HeaderContent from "./HeaderContent";
import FooterContent from "./FooterContent";
import FloatGroup from "../FloatGroup";
import { Outlet } from "@remix-run/react";
import Loading from "../Loading";
import CommonAdvantageDialog from "../CommonAdvantageDialog";
import { RecoilRoot } from "recoil";
import customTheme from "~/common/styles/theme";

const { useToken } = theme;
interface IProps {
  children?: React.ReactNode;
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
  );
};

export default React.memo(CommonLayout);
