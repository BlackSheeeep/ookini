import * as React from "react";
import Home from "../views/Home";
import homeStore from "~/views/Home/store";

import CommonLayout from "~/common/components/CommonLayout";
import { loaderInit } from "~/common/utils/commonLoader";

export async function loader({ request }: any) {
  const { ret, promises } = loaderInit({ request });
  await Promise.all([
    homeStore.init(),
    homeStore.getHairGallery(),
    ...promises,
  ]);
  return { homeStore, ...ret };
}
export type HomeLoader = typeof loader;

interface IHomeEntryProps {}

const HomeEntry: React.FunctionComponent<IHomeEntryProps> = (props) => {
  return (
    <CommonLayout>
      <Home></Home>
    </CommonLayout>
  );
};

export default HomeEntry;
