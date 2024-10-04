import * as React from "react";
import Home from "../views/Home";
import homeStore from "~/views/Home/store";

import { reservationStore } from "~/common/components/FloatGroup/Reservation/store";
import FloatGroup from "~/common/components/FloatGroup";
import CommonAdvantageDialog from "~/common/components/CommonAdvantageDialog";
import { advantageDialogStore } from "~/common/components/CommonAdvantageDialog/store";
import utils from "~/common/utils";

export async function loader({ request }) {
  const userAgent = request.headers.get("User-Agent");
  utils.setUserAgent(userAgent);
  console.error("user-agent", userAgent);
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

// existing imports

interface IHomeEntryProps {}

const HomeEntry: React.FunctionComponent<IHomeEntryProps> = (props) => {
  return (
    <>
      <Home></Home>
      <FloatGroup />
      <CommonAdvantageDialog />
    </>
  );
};

export default HomeEntry;
