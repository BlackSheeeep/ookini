import axios from "axios";
import * as React from "react";

import CommonLayout from "~/common/components/CommonLayout";
import { reservationStore } from "~/common/components/FloatGroup/Reservation/store";
import { loaderInit } from "~/common/utils/commonLoader";
import Reservation from "~/views/Reservation";

export async function loader({ request }: any) {
  const { ret, promises } = loaderInit({ request });
  // globalThis.baseURL = `http://8.209.245.194/wp-json`;

  await Promise.all([
    ...promises,
    reservationStore.getStores(),
    reservationStore.getFeeplans(),
  ]);
  return { ...ret, reservationStore };
}
export type HomeLoader = typeof loader;

interface IHomeEntryProps {}

const ReservationEntry: React.FunctionComponent<IHomeEntryProps> = (props) => {
  return (
    <CommonLayout>
      <Reservation />
    </CommonLayout>
  );
};

export default ReservationEntry;
