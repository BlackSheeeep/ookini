import * as React from "react";
import { message } from "antd";
import StoreInfo from "./modules/StoreInfo";
import storeDetail from "./store";
import { useSearchParams } from "react-router-dom";

interface IStoreDetailProps {}

const StoreDetail: React.FunctionComponent<IStoreDetailProps> = (props) => {
  storeDetail.useInit();
  const [searchParams] = useSearchParams();
  const storeId = searchParams.get("id");

  React.useEffect(() => {
    storeId &&
      storeDetail
        .getStoreInfo(storeId)
        .catch((err) => message.error(err?.message || "出错了"));
  }, [storeId]);

  return <StoreInfo />;
};

export default StoreDetail;
