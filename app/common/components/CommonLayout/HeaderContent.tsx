import * as React from "react";
import LayoutScss from "./Layout.module.scss";
import { Button, Flex } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import utils from "~/common/utils";
import { useMatches } from "@remix-run/react";

interface HeaderContentProps {}

const HeaderContent: React.FC<HeaderContentProps> = () => {
  const isHome = useMatches().find((item) => item.pathname === "/home");
  const gotoHome = () => {
    !isHome && utils.goto("/home");
  };
  return (
    <Flex
      className={LayoutScss.headerContent}
      justify={utils.isMobileDevice ? "center" : "flex-start"}
    >
      {/* @ts-ignore */}
      <img
        src={
          "https://api.address-ookini.com/wp-content/uploads/2024/02/1692264294222029-3.png"
        }
        className={LayoutScss.logo}
      />
      {!isHome ? (
        <Button type="primary" onClick={gotoHome}>
          <HomeOutlined color="primary" />
          Home
        </Button>
      ) : null}
    </Flex>
  );
};

export default HeaderContent;
