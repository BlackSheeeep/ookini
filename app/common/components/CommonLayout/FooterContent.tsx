import * as React from "react";
import { Flex, Typography, Space } from "antd";
import LayoutScss from "./Layout.module.scss";
import CommonImage from "../Image";
import { Link } from "react-router-dom";
import utils from "~/common/utils";
interface IFooterContentProps {}

const FooterContent: React.FunctionComponent<IFooterContentProps> = (props) => {
  return (
    <Flex
      dir={utils.isMobileDevice ? "column" : "horizontal"}
      align="center"
      justify="center"
    >
      <Flex>
        <CommonImage />
      </Flex>
      <Typography.Text className={LayoutScss.footerContent}>
        Copyright (c)OOKINI KimonoRental All Rights Reserved.
      </Typography.Text>
      <Space split={<div style={{ color: "white" }}>|</div>}>
        <Link
          to="https://wp.address-ookini.com/index.php/%e3%82%b5%e3%83%bc%e3%83%93%e3%82%b9%e5%88%a9%e7%94%a8%e8%a6%8f%e7%b4%84/"
          type="text"
          style={{ color: "white", padding: "0", fontSize: "14px" }}
        >
          利用規則
        </Link>
        <Link
          to="https://wp.address-ookini.com/index.php/privacy-policy/"
          type="text"
          style={{ color: "white", padding: "0", fontSize: "14px" }}
        >
          プライバシーポリシー
        </Link>
      </Space>
    </Flex>
  );
};

export default FooterContent;
