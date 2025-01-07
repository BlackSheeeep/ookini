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
import { reservationStore } from "../Reservation/store";
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
  const { reservationStore }: Record<string, any> = useLoaderData();
  const { news, stores, feeplans: feePlans } = reservationStore;
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
      label: "プラン",
      key: "feePlanDetail",
      icon: <ScheduleOutlined />,
      popupClassName: ModuleScss.subMenu,
      children: feePlans?.map?.((plan: { id: number; pagetitle: string }) => ({
        label: (
          <Link to={`/feePlanDetail?id=${plan.id}`}>{plan.pagetitle}</Link>
        ),
        key: plan.id,
      })),
    },

    {
      label: "店舗",
      key: "storeDetail",
      icon: <ShopOutlined />,
      popupClassName: ModuleScss.subMenu,
      children: stores?.map?.((store: { id: number; storeName: string }) => ({
        label: (
          <Link to={`/storeDetail?id=${store.id}`}>{store.storeName}</Link>
        ),
        key: store.id,
      })),
    },

    gtc
      ? {
          label: <div id="trans">翻訳</div>,
          onClick: (val) => {
            gtc?.querySelector(".goog-te-gadget-simple")?.click();
          },
          key: "translate",
          //   children: languages.map((item: { label: string; value: string }) => ({
          //     ...item,
          //     onClick: () => {
          //       if (gtc) {
          //         console.log(gtc);
          //         gtc.setAttribute("value", item.value);
          //         const triggerEvent = (element, eventName) => {
          //           const event = new Event(eventName);
          //           element.dispatchEvent(event);
          //         };
          //         triggerEvent(gtc, "change");
          //         // _.set(
          //         //   google,
          //         //   ["style", "display"],
          //         //   _.get(google, "style.display") === "none" ? "unset" : "none"
          //         // );
          //       }
          //     },
          //   })) as any[],
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
