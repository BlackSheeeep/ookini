import * as React from "react";

import CommonLayout from "~/common/components/CommonLayout";
import StoreDetail from "~/views/StoreDetail";
import storeDetail from "~/views/StoreDetail/store";
import { loaderInit } from "~/common/utils/commonLoader";

export async function loader({ request }) {
  const url = new URL(request.url);
  const storeId = Number(url.searchParams.get("id"));
  const { ret, promises } = loaderInit({ request });
  await Promise.all([storeDetail.getStoreInfo(storeId), ...promises]);
  return { storeDetail, ...ret };
}
export type IStoreDetailData = typeof loader;

const StoreDetailEntry: React.FunctionComponent = () => {
  return (
    <CommonLayout>
      <StoreDetail />
    </CommonLayout>
  );
};

export default StoreDetailEntry;
