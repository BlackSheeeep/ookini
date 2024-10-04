import React, { Suspense } from "react";
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
  const { token } = useToken();
  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgLayout,
    display: "flex",
    flexDirection: "column",
  };

  return (
    <RecoilRoot>
      <ConfigProvider theme={customTheme}>
        <Flex gap="middle" wrap="wrap" className={LayoutScss.container}>
          <Layout>
            <Affix offsetTop={0}>
              <Header className={utils.uniteClass(LayoutScss.header, "hf-bg")}>
                <HeaderContent />
              </Header>
            </Affix>
            <Content className={LayoutScss.content} style={contentStyle}>
              <Suspense fallback={<Loading></Loading>}>
                <Outlet></Outlet>
              </Suspense>
            </Content>
            <Footer className={utils.uniteClass(LayoutScss.footer, "hf-bg")}>
              <FooterContent />
            </Footer>
          </Layout>
        </Flex>
      </ConfigProvider>
    </RecoilRoot>
  );
};

export default React.memo(CommonLayout);
