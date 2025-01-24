import * as React from "react";
import { Card, Divider, Flex, Typography } from "antd";
import utils from "~/common/utils";
import CommonTitle from "~/common/components/CommonTitle";
import Loading from "~/common/components/Loading";
import StorePictures from "../../components/StorePictures";
import DetailDescriptions from "../../components/DetailDescriptions";
import StoreNavigation from "../../components/StoreNavigation";
import ModuleScss from "./StoreInfo.module.scss";
import { useLoaderData } from "@remix-run/react";
import { IStoreDetailData } from "~/routes/storeDetail";
import AddressSteps from "../../components/AddressSteps";
import CommonCarousel from "~/common/components/CommonCarousel";
import CommonImage from "~/common/components/Image";

const { Title, Paragraph } = Typography;
interface IStoreInfoProps {}

const StoreInfo: React.FunctionComponent<IStoreInfoProps> = (props) => {
  const { storeDetail } = useLoaderData<IStoreDetailData>();
  const { storeInfo: data, recommendSights } = storeDetail;
  if (!data) return <Loading></Loading>;

  return (
    <Flex
      className={`${ModuleScss.container} ${
        utils.isMobileDevice ? ModuleScss.mobileContainer : ""
      }`}
    >
      <CommonTitle subTitle="Store Info" title={data.store_name}></CommonTitle>
      <DetailDescriptions storeDetail={data} />
      <StoreNavigation storeDetail={data} />
      <Divider></Divider>
      <CommonTitle subTitle="Details" title={data.details_title}></CommonTitle>
      <Card>
        <StorePictures storeDetail={data} />
        <div>{data.details_content}</div>
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
            <div style={{ width: "100%", padding: "0 10px" }}>
              <Card
                hoverable
                cover={
                  <CommonImage
                    src={item.sight_img}
                    alt={item.sight_name}
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
      {/* <Card title={"人气商品组件"} className={ModuleScss.gallery}> */}
      {/* <ProductCarousel /> */}
      {/* </Card> */}
      {/* <Card title={"所有店铺一览组件"} className={ModuleScss.gallery}>
          <AllStores />
        </Card> */}
      {/* <Card title={"footer 按钮"} className={ModuleScss.gallery}>
          <StoreFooter />
        </Card> */}
      {/* </Card> */}
    </Flex>
  );
};

export default StoreInfo;
