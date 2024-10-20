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
import { useRecoilValue } from "recoil";
import { useMatch, Link } from "react-router-dom";
import { GALLERY_TYPE } from "~/common/constants";
// import translate from "translate";
// import translateV2 from "translate";
import utils from "~/common/utils";
import CommonNews from "~/common/components/CommonNews";
interface IMenuBarProps {}
//   const trans = document.getElementById(":0.container");
//   if (trans) trans.style.display = "none";
const MenuBar: React.FunctionComponent<IMenuBarProps> = (props) => {
  const feePlans = useRecoilValue(reservationStore.feeplans);
  const stores = useRecoilValue(reservationStore.stores);
  const news = useRecoilValue(reservationStore.news);
  const [google, setGoogle] = React.useState<Element>();
  const [isPopKeybord, setIsPopKeybord] = React.useState(false);
  React.useEffect(() => {
    function loop() {
      setTimeout(() => {
        const google =
          document.getElementById("google_translate_element") || null;
        const trans = document.getElementById("trans") || null;
        if (google && trans) {
          const skiptranslate = google.querySelector(".skiptranslate");
          // if (skiptranslate)
          //   for (const node of skiptranslate?.childNodes) {
          //     if (node.nodeType === Node.TEXT_NODE) {
          //       node.textContent = "";
          //     }
          //   }
          const span = google.querySelector("span");
          if (span) {
            // span.style.display = "none";
          }
          trans.appendChild(google);
          setGoogle(google as any);
        } else {
          loop();
        }
      }, 100);
    }
    loop();
  }, []);

  const isStoreDetail = useMatch("/storeDetail") !== null;
  const isPlanDetail = useMatch("/feePlanDetail") !== null;
  const items: MenuProps["items"] = [
    {
      label: "more",
      icon: (
        <Badge dot count={news.length} size="default">
          <MenuOutlined className={ModuleScss.more} />
        </Badge>
      ),
      key: "more",
      popupClassName: ModuleScss.subMenu,
      children: [
        {
          label: (
            <Flex align="center" justify="space-between">
              <Link to="/home">
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
        reservationStore.updateState?.({
          visible: true,
        });
      },
    },
    {
      label: "計画",
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
    {
      label: <div id="trans">翻訳</div>,
      onClick: () => {
        if (google) {
          const img = google.querySelector("img");
          img?.click();
          // _.set(
          //   google,
          //   ["style", "display"],
          //   _.get(google, "style.display") === "none" ? "unset" : "none"
          // );
        }
      },
      key: "translate",
      // children: languages.map((item: { label: string; value: string }) => ({
      //   ...item,
      //   onClick: () => {
      //     reservationStore.updateState?.({
      //       lan: item.value,
      //     });
      //   },
      // })) as any[],
      icon: <TranslationOutlined />,
    },
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
