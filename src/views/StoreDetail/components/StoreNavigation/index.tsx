import * as React from "react";
import { Card, Steps, Flex, Typography } from "antd";
import CommonImage from "common/components/Image";
interface IStoreNavigationProps {
  storeDetail: any;
}

const StoreNavigation: React.FunctionComponent<IStoreNavigationProps> = (
  props
) => {
  const { storeDetail } = props;
  if (!storeDetail?.directions?.content?.length) {
    return null;
  }

  const storeNavigations = storeDetail?.directions?.content?.map(
    (direction: any, index: any) => {
      return {
        index,
        title: direction.route,
        imageUrl: direction.image,
        description: direction.description,
      };
    }
  );

  const getStepDetail = (navDetail: any) => (
    <Flex>
      <CommonImage
        src={navDetail.imageUrl}
        style={{ width: '25rem', borderRadius: "5px", overflow: "hidden" }}
      />
      <div style={{ marginLeft: "2rem" }}>
        <Typography.Title level={5}>{navDetail.title}</Typography.Title>
        <Typography.Text>{navDetail.description}</Typography.Text>
      </div>
    </Flex>
  );

  const stepsItems = storeNavigations.map((nav: any) => ({
    status: "process",
    // title: nav.title,
    description: getStepDetail(nav),
  }));

  return (
    <Card title="店の行き方です" className="storeNavigation">
      <Steps direction="vertical" items={stepsItems} />
    </Card>
  );
};

export default React.memo(StoreNavigation);
