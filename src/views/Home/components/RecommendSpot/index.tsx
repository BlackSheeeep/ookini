import * as React from "react";
import ModuleScss from "./RecommendSpot.module.scss";
import homeStore from "~/views/Home/store";
import { Card, Flex } from "antd";
import { useRecoilValue } from "recoil";
import Loading from "~/common/components/Loading";
import CommonTitle from "~/common/components/CommonTitle";
import utils from "~/common/utils";
import CommonImage from "~/common/components/Image";

interface IRecommendSpotProps {}

const RecommendSpot: React.FunctionComponent<IRecommendSpotProps> = (props) => {
  const { spot } = homeStore;
  const sightView: any[] = useRecoilValue(spot);
  React.useEffect(() => {
    homeStore.getRecommendSpot();
  }, []);
  return (
    <Flex align="center" vertical className={ModuleScss.container}>
      <CommonTitle
        level={4}
        title={"周辺のおすすめスポット"}
        subTitle="Recommend Spot"
      />
      {_.isEmpty(sightView) ? (
        <Loading></Loading>
      ) : (
        <Flex
          vertical={utils.isMobileDevice ? true : false}
          align="center"
          justify="space-between"
          style={{ width: "100%" }}
        >
          {sightView?.map?.((item: any, index) => (
            <Card
              key={"sightView_" + index}
              className={ModuleScss.card}
              cover={
                <CommonImage
                  src={item.sightImage}
                  className={ModuleScss.image}
                />
              }
            >
              {item.sightContent}
            </Card>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default RecommendSpot;
