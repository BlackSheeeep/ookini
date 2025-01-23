import * as React from "react";
import { useRecoilValue } from "recoil";
import { Card, Divider, Flex, Typography } from "antd";
import utils from "~/common/utils";
import CommonLayout from "~/common/components/CommonLayout";
import CommonTitle from "~/common/components/CommonTitle";
import Loading from "~/common/components/Loading";
import storeDetail from "~/views/StoreDetail/store";
import StorePictures from "../../components/StorePictures";
import DetailDescriptions from "../../components/DetailDescriptions";
import StoreNavigation from "../../components/StoreNavigation";
import ProductCarousel from "../../components/ProductCarousel";
import AllStores from "../../components/AllStores";
import StoreFooter from "../../components/StoreFooter";
import ModuleScss from "./StoreInfo.module.scss";
import { useLoaderData } from "@remix-run/react";
import { IStoreDetailData } from "~/routes/storeDetail";

interface IStoreInfoProps {}

const StoreInfo: React.FunctionComponent<IStoreInfoProps> = (props) => {
  const { storeDetail } = useLoaderData<IStoreDetailData>();
  const { storeInfo: data } = storeDetail;
  if (!data) return <Loading></Loading>;

  return (
    <Flex
      className={`${ModuleScss.container} ${
        utils.isMobileDevice ? ModuleScss.mobileContainer : ""
      }`}
    >
      <CommonTitle subTitle="Store Info" title={data.store_name}></CommonTitle>
      <StorePictures storeDetail={data} />
      <DetailDescriptions storeDetail={data} />
      <StoreNavigation storeDetail={data} />
      <Divider></Divider>
      <CommonTitle subTitle="Details" title={data.details_title}></CommonTitle>
      <Card>{data.details_content}</Card>
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
