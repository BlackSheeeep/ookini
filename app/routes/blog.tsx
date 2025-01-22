import * as React from "react";

import CommonLayout from "~/common/components/CommonLayout";
import _ from "lodash";
import BlogDetail from "~/views/Blog/Page";
import homeStore from "~/views/Home/store";
import { loaderInit } from "~/common/utils/commonLoader";
import { useSearchParams } from "react-router-dom";

export async function loader({ request }) {
  request.query;
  const { ret, promises } = loaderInit({ request });
  await promises;
  return { ...ret };
}
export type BlogsDetailData = typeof loader;

const BolgsEntry: React.FunctionComponent = (props) => {
  const [params] = useSearchParams();
  const link = decodeURIComponent(params.get("link") || "");
  return (
    <CommonLayout
      customContentStyle={{
        height: "100vh",
      }}
    >
      <iframe
        id="iframe"
        style={{
          width: "105%",
          height: "100vh",
          border: "none",
        }}
        src={`/wp-blog/${link}`}
      ></iframe>
    </CommonLayout>
  );
};

export default BolgsEntry;
