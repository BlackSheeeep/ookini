import * as React from "react";
import { Card, Divider, Flex, Typography } from "antd";
import utils from "~/common/utils";
import CommonTitle from "~/common/components/CommonTitle";
import Loading from "~/common/components/Loading";
import StorePictures from "./components/StorePictures";
import DetailDescriptions from "./components/DetailDescriptions";
import StoreNavigation from "./components/StoreNavigation";
import ModuleScss from "./styles/StoreInfo.module.scss";
import "./styles/StoreInfo.scss";
import { cn } from "@bem-react/classname";
import { useLoaderData } from "@remix-run/react";
import { IStoreDetailData } from "~/routes/storeDetail";
import AddressSteps from "./components/AddressSteps";
import CommonCarousel from "~/common/components/CommonCarousel";
import CommonImage from "~/common/components/Image";
import Stores from "../Home/components/Stores";
import StoreCard from "~/common/components/StoreCard";

const { Title, Paragraph } = Typography;
interface IStoreInfoProps {}
const block = cn("store-info");
const StoreInfo: React.FunctionComponent<IStoreInfoProps> = (props) => {
  const { storeDetail } = useLoaderData<IStoreDetailData>();
  const {
    storeInfo,
    recommendSights,
    feeplannings,
    otherStores = [],
  } = storeDetail;
  if (!storeInfo) return <Loading></Loading>;
  return (
    <Flex
      className={`${ModuleScss.container} ${
        utils.isMobileDevice ? ModuleScss.mobileContainer : ""
      }`}
    >
      <CommonTitle
        subTitle="Store Info"
        title={storeInfo.store_name}
      ></CommonTitle>
      <DetailDescriptions storeDetail={storeInfo} />
      <StoreNavigation storeDetail={storeInfo} />
      <Divider></Divider>
      <CommonTitle
        subTitle="Details"
        title={storeInfo.details_title}
      ></CommonTitle>
      <Card>
        <StorePictures storeDetail={storeInfo} />
        <Divider></Divider>
        <div>{storeInfo.details_content}</div>
      </Card>
      <Divider> </Divider>
      <AddressSteps />
      <Divider></Divider>
      <CommonTitle subTitle="Recommend Sights" title="推荐景点"></CommonTitle>
      <CommonCarousel
        slidesPerView={1}
        showNext
        showPrev
        loop={false}
        showPagination
        direction="horizontal"
      >
        {recommendSights?.map((item) => {
          return (
            <div style={{ width: "100%", padding: "0 20px" }}>
              <Card
                hoverable
                cover={
                  <CommonImage
                    src={item.sight_img}
                    alt={item.sight_name}
                    className={block("recommend", "img")}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                }
                className={ModuleScss.card}
                style={{
                  backgroundColor: "transparent",
                  width: "100%",
                  padding: "0",
                  maxWidth: "600px",
                  // padding: "0 20px",
                  border: "none",
                }}
              >
                <Title level={4}>{item.sight_name}</Title>
                <Paragraph
                  style={{
                    marginBottom: "24px",
                    textAlign: "start",
                    color: "gray",
                  }}
                >
                  {item.sight_desc}
                </Paragraph>
              </Card>
            </div>
          );
        })}
      </CommonCarousel>
      <br></br>
      <Divider></Divider>
      <CommonTitle
        subTitle="本店の人気商品のおすすめ"
        title="本店のセット"
      ></CommonTitle>
      <CommonCarousel
        slidesPerView={1}
        showNext
        showPrev
        loop={false}
        showPagination
        direction="horizontal"
      >
        {feeplannings?.map((item) => {
          return (
            <div style={{ width: "100%", padding: "0 10px" }}>
              <Card
                hoverable
                cover={
                  <CommonImage
                    src={item.images[0]}
                    alt={item.fee_planning_name}
                    className={block("recommend", "img")}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                }
                className={ModuleScss.card}
                style={{
                  backgroundColor: "transparent",
                  width: "100%",
                  padding: "0",
                  maxWidth: "600px",
                  border: "none",
                }}
              >
                <Title level={4}>¥{item.after_tax_coast}（税込）</Title>
                <Paragraph
                  style={{
                    marginBottom: "24px",
                    textAlign: "start",
                    color: "gray",
                  }}
                >
                  {item.feeplanning_desc}
                </Paragraph>
              </Card>
            </div>
          );
        })}
      </CommonCarousel>
      <br></br>
      <CommonTitle
        title={storeInfo.area[0]?.area_name}
        の他の店舗
        subTitle="Other Store"
      />
      <CommonCarousel
        slidesPerView={1}
        showNext
        showPrev
        loop={false}
        showPagination
        direction="horizontal"
      >
        {otherStores
          ?.filter((item) => {
            return item.id != storeInfo.id;
          })
          .map((item) => {
            return (
              <div style={{ width: "100%", padding: "0 10px" }}>
                <StoreCard storeInfo={item} />
              </div>
            );
          })}
      </CommonCarousel>
    </Flex>
  );
};

export default StoreInfo;
