import * as React from "react";
import Home from "../views/Home";
import homeStore from "~/views/Home/store";

import { reservationStore } from "~/common/components/FloatGroup/Reservation/store";
import { advantageDialogStore } from "~/common/components/CommonAdvantageDialog/store";
import utils from "~/common/utils";
import CommonLayout from "~/common/components/CommonLayout";

export async function loader({ request }) {
  const userAgent = request.headers.get("User-Agent");
  utils.setUserAgent(userAgent);
  console.log(utils.isMobileDevice);
  await Promise.all([
    homeStore.init(),
    advantageDialogStore.getAdvantage(),
    reservationStore.getFeeplans(),
    reservationStore.getStores(),
    homeStore.getHairGallery(),
  ]);
  return { homeStore, reservationStore, advantageDialogStore };
}
export type HomeLoader = typeof loader;

interface IHomeEntryProps {}

const HomeEntry: React.FunctionComponent<IHomeEntryProps> = (props) => {
  const [, update] = React.useState({});
  React.useLayoutEffect(() => {
    utils.isMobileDevice && update({});
  }, []);
  return (
    <CommonLayout>
      <Home></Home>
    </CommonLayout>
  );
};

export default HomeEntry;
