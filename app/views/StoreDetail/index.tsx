import * as React from "react";
import { message } from "antd";
import StoreInfo from "./modules/StoreInfo";
import storeDetail from "./store";
import { useSearchParams } from "react-router-dom";

interface IStoreDetailProps {}

const StoreDetail: React.FunctionComponent<IStoreDetailProps> = (props) => {
  storeDetail.useInit();

  return <StoreInfo />;
};

export default StoreDetail;
