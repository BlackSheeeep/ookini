import * as React from "react";

import CommonLayout from "~/common/components/CommonLayout";
import StoreDetail from "~/views/StoreDetail";
import storeDetail from "~/views/StoreDetail/store";
import { loaderInit } from "~/common/utils/commonLoader";
import { useLoaderData } from "@remix-run/react";
import homeStore from "~/views/Home/store";

export async function loader({ request }) {
  const { ret, promises } = loaderInit({ request });
  await homeStore.getAreas();
  await Promise.all([...promises, homeStore.getFeeplans()]);
  return { storeDetail, ...ret };
}
export type IStoreDetailData = typeof loader;

const FeeplanningsEntry: React.FunctionComponent = () => {
  const { globalStore } = useLoaderData();
  return <CommonLayout></CommonLayout>;
};

export default FeeplanningsEntry;
