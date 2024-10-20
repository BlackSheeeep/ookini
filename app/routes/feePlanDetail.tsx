import * as React from "react";

import { reservationStore } from "~/common/components/FloatGroup/Reservation/store";
import { advantageDialogStore } from "~/common/components/CommonAdvantageDialog/store";
import utils from "~/common/utils";
import CommonLayout from "~/common/components/CommonLayout";
import FeePlanDetail from "~/views/FeePlanDetail";
import feePlanStore from "~/views/FeePlanDetail/store";
import { loaderInit } from "~/common/utils/commonLoader";

export async function loader({ request }) {
  const url = new URL(request.url);
  const planId = Number(url.searchParams.get("id"));
  const { ret, promises } = loaderInit({ request });

  await Promise.all([...promises, feePlanStore.getCurrFeePlan(planId)]);
  return { ...ret, feePlanStore };
}
export type IFeePlanDetailData = typeof loader;

const FeePlanDetailEntry: React.FunctionComponent = () => {
  return (
    <CommonLayout>
      <FeePlanDetail></FeePlanDetail>
    </CommonLayout>
  );
};

export default FeePlanDetailEntry;
