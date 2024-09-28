import * as React from "react";
import FeePlanCard from "./FeePlanCard";
import _ from "lodash";
import { HOME_KEYS } from "~/common/constants/config";
import { useRecoilValue } from "recoil";
import FeePlansScss from "./FeePlans.module.scss";
import CommonCarousel from "~/common/components/CommonCarousel";
import { Flex, Typography } from "antd";
import utils from "~/common/utils";
import Loading from "~/common/components/Loading";
import { reservationStore } from "~/common/components/FloatGroup/Reservation/store";
import { useLoaderData } from "@remix-run/react";
const { Title } = Typography;
interface IFeePlanProps {}

const FeePlan: React.FunctionComponent<IFeePlanProps> = (props) => {
  const feePlan = HOME_KEYS.feePlans;
  const { feePlans }: any[] = useLoaderData();
  return (
    <div id={feePlan} className={FeePlansScss.carousel}>
      <Flex>
        <Title className={FeePlansScss.title} level={4}>
          京都で人気のおすすめ着物レンタルプラン
        </Title>
      </Flex>
      {/**@ts-ignore */}
      {_.isEmpty(feePlans) ? (
        <Loading></Loading>
      ) : (
        <CommonCarousel
          showNext={utils.isMobileDevice ? true : true}
          showPrev={utils.isMobileDevice ? true : true}
          showPagination
        >
          {feePlans.map((feePlan, index) => (
            <FeePlanCard
              data={{
                imageUrl: _.get(feePlan, "images.0"),
                title: _.get(feePlan, "pagetitle"),
                subTitle: _.get(feePlan, "fee.content"),
                comment: _.get(feePlan, "planContent"),
                id: _.get(feePlan, "id"),
              }}
              key={index}
            />
          ))}
        </CommonCarousel>
      )}
    </div>
  );
};

export default React.memo(FeePlan);
