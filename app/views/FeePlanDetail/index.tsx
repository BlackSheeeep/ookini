import * as React from "react";
import FeePlan from "./modules/FeePlan";
import feePlanStore from "./store";

interface IFeePlanDetailProps {}

const FeePlanDetail: React.FunctionComponent<IFeePlanDetailProps> = (props) => {
  feePlanStore.useInit();

  return <FeePlan />;
};

export default FeePlanDetail;
