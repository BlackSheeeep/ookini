import * as React from "react";
import FeePlanCard from "./FeePlanCard";
import _ from "lodash";
import { HOME_KEYS } from "~/common/constants/config";
import FeePlansScss from "./FeePlans.module.scss";
import CommonCarousel from "~/common/components/CommonCarousel";
import { Flex, Typography } from "antd";
import utils from "~/common/utils";
import Loading from "~/common/components/Loading";
import { useLoaderData } from "@remix-run/react";
import { HomeLoader } from "~/routes/_index";
import { selectedArea } from "../..";
import { useRecoilValue } from "recoil";
import request from "~/Request/request";
const { Title } = Typography;
interface IFeePlanProps {}

const FeePlan: React.FunctionComponent<IFeePlanProps> = (props) => {
  const feePlan = HOME_KEYS.feePlans;
  const {
    homeStore: { hotFeeplannings = [] },
  } = useLoaderData<HomeLoader>();
  const selected = useRecoilValue(selectedArea);
  const feePlans = React.useMemo(() => {
    if (!selected?.id) return [];
    const ret = hotFeeplannings
      .filter((item) => item.area[0]?.id == selected?.id)
      .map((item) => item.hot_feeplannings)?.[0];
    return ret.map((item) => {
      return {
        ...item,
      };
    });
  }, [selected?.id]);

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
          showNext={utils.isMobileDevice ? true : false}
          showPrev={utils.isMobileDevice ? true : false}
          showPagination
        >
          {feePlans.map((feePlan, index) => (
            <FeePlanCard
              data={{
                imageUrl:
                  _.get(feePlan, "images[0]") ||
                  _.get(feePlan, "images.0.guid"),
                title: _.get(feePlan, "page_title"),
                subTitle: (
                  <Title level={4}>¥{feePlan.after_tax_coast}（税込）</Title>
                ),
                comment: _.get(feePlan, "feeplanning_desc"),
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
