import * as React from "react";
import FeePlan from "./modules/FeePlan";
import feePlanStore from "./store";
import { useSearchParams } from "react-router-dom";

interface IFeePlanDetailProps {}

const FeePlanDetail: React.FunctionComponent<IFeePlanDetailProps> = (props) => {
  feePlanStore.useInit();

  const [searchParams] = useSearchParams();
  const planId = searchParams.get("id");

  React.useEffect(() => {
    planId && feePlanStore.getCurrFeePlan(planId);
  }, [planId]);

  return <FeePlan />;
};

export default FeePlanDetail;
