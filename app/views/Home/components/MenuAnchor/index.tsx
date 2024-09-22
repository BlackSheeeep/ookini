import { MENU_ANCHOR_ITEMS } from "~/common/constants/config";
import MenuAnchorScss from "./MenuAnchor.module.scss";
import { Anchor } from "antd";
import * as React from "react";
import { Typography } from "antd";
const { Title } = Typography;

interface IMenuAnchorProps {}

const MenuAnchor: React.FunctionComponent<IMenuAnchorProps> = (props) => {
  const [headerHeight, setHeaderHeight] = React.useState(64);

  React.useEffect(() => {
    const headerEle = document.querySelector("header.ant-layout-header");

    if (headerEle) {
      setHeaderHeight(headerEle.getBoundingClientRect().height);
    }
  }, []);

  return (
    <Anchor
      direction="horizontal"
      className={MenuAnchorScss.container}
      bounds={0}
      offsetTop={headerHeight}
      items={MENU_ANCHOR_ITEMS.map((item) => ({
        ...item,
        title: (
          <Title className="item" level={5}>
            {item.title}
          </Title>
        ),
      }))}
    />
  );
};

export default MenuAnchor;
