import * as React from "react";

import CommonLayout from "~/common/components/CommonLayout";
import _ from "lodash";
import NewsroomList from "~/views/Newsroom/List";
import { newsroomStore } from "~/views/Newsroom/store";
import { loaderInit } from "~/common/utils/commonLoader";

export async function loader({ request }) {
  const { ret, promises } = loaderInit({ request });

  await Promise.all([newsroomStore.getNews(), ...promises]);
  return { ...ret, newsroomStore };
}
export type NewsroomData = typeof loader;

const NewsroomEntry: React.FunctionComponent = (props) => {
  return (
    <CommonLayout>
      <NewsroomList />
    </CommonLayout>
  );
};

export default NewsroomEntry;
