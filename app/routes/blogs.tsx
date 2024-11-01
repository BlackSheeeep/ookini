import * as React from "react";

import CommonLayout from "~/common/components/CommonLayout";
import _ from "lodash";
import BlogDetail from "~/views/Blog/Page";
import homeStore from "~/views/Home/store";
import { loaderInit } from "~/common/utils/commonLoader";

export async function loader({ request }) {
  const { ret, promises } = loaderInit({ request });
  const [blogs] = await Promise.all([homeStore.getBlogs(), ...promises]);
  return { ...ret, blogs };
}
export type BlogsDetailData = typeof loader;

const BolgsEntry: React.FunctionComponent = (props) => {
  return (
    <CommonLayout>
      <BlogDetail />
    </CommonLayout>
  );
};

export default BolgsEntry;
