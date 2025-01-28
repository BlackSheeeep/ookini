import {
  CalendarOutlined,
  HomeFilled,
  MenuOutlined,
  ScheduleOutlined,
  ShopOutlined,
  SwapRightOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { Badge, Flex, Menu, MenuProps, message } from "antd";
import * as React from "react";
import ModuleScss from "./Menu.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { GALLERY_TYPE } from "~/common/constants";
// import translate from "translate";
// import translateV2 from "translate";
import utils from "~/common/utils";
import CommonNews from "~/common/components/CommonNews";
import { useLoaderData, useMatches } from "@remix-run/react";
interface IMenuBarProps {}
//   const trans = document.getElementById(":0.container");
//   if (trans) trans.style.display = "none";
const MenuBar: React.FunctionComponent<IMenuBarProps> = (props) => {
  const { globalStore } = useLoaderData();
  const { news } = globalStore;
  const [gtc, setgtc] = React.useState<HTMLElement>();
  const navigate = useNavigate();

  const [isPopKeybord, setIsPopKeybord] = React.useState(false);
  React.useLayoutEffect(() => {
    const timer = setInterval(() => {
      const gtg = document.querySelector("#google_translate_element");
      //   const gtg = document.querySelector(".goog-te-gadget");
      if (!gtg) return;
      setgtc(gtg);

      clearInterval(timer);
    }, 500);
  }, []);
  React.useEffect(() => {
    if (!gtc) return;
    const trans = document.querySelector("#trans");
    trans?.append(gtc);
  }, [gtc]);

  const isStoreDetail = useMatches().find(
    (item) => item.pathname === "/storeDetail"
  );
  const isPlanDetail = useMatches().find(
    (item) => item.pathname === "/feePlanDetail"
  );
  const items: MenuProps["items"] = [
    {
      label: "MENU",
      icon: (
        <Badge dot count={news.length} size="default">
          <MenuOutlined className={ModuleScss.more} />
        </Badge>
      ),
      key: "MENU",
      popupClassName: ModuleScss.subMenu,
      children: [
        {
          label: (
            <Flex align="center" justify="space-between">
              <Link to="/">
                <HomeFilled />
                ホームページ
              </Link>
              <SwapRightOutlined />
            </Flex>
          ),
          key: "home",
        },
        {
          label: (
            <Link to={`/gallery?type=${GALLERY_TYPE.hair}`}>
              <Flex justify="space-between">
                発套のギャラリー <SwapRightOutlined />
              </Flex>
            </Link>
          ),
          key: "hair",
        },
        {
          label: (
            <Link to={`/gallery?type=${GALLERY_TYPE.customer}`}>
              <Flex justify="space-between">
                お客様のギャラリー <SwapRightOutlined />
              </Flex>
            </Link>
          ),
          key: "customer",
        },
        {
          label: <Link to="/blogs">blogs</Link>,
          key: "blog",
        },
        {
          label: (
            <Link to="/newsroom">
              <Badge className={ModuleScss.badge} count={news?.length}>
                メッセージ
              </Badge>
            </Link>
          ),
          key: "news",
        },
      ],
    },

    {
      label: "予約",
      icon: <CalendarOutlined />,
      key: "reservation",
      onClick: () => {
        navigate("/reservation");
      },
    },
    {
      key: "feePlanDetail",
      icon: <ScheduleOutlined />,
      popupClassName: ModuleScss.subMenu,
      label: <Link to={"/feeplannings"}>プラン</Link>,
    },

    {
      key: "storeDetail",
      icon: <ShopOutlined />,
      popupClassName: ModuleScss.subMenu,
      label: <Link to={`/stores`}>店舗</Link>,
    },

    gtc
      ? {
          label: <div id="trans">翻訳</div>,
          onClick: (val) => {
            gtc?.querySelector(".goog-te-gadget-simple")?.click();
          },
          key: "translate",
          icon: <TranslationOutlined />,
        }
      : null,
  ];
  React.useEffect(() => {}, []);
  return (
    <>
      <Menu
        className={utils.uniteClass(
          ModuleScss.menu,
          isPopKeybord ? ModuleScss.invisible : ""
        )}
        items={items}
        mode="horizontal"
        theme="dark"
        // very naive way to get selectedKeys, antd is so stupid
        selectedKeys={[
          isStoreDetail ? "storeDetail" : "",
          isPlanDetail ? "feePlanDetail" : "",
        ].filter(Boolean)}
      ></Menu>
      <CommonNews></CommonNews>
    </>
  );
};

export default MenuBar;
