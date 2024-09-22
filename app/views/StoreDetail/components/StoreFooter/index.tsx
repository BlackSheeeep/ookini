import * as React from "react";
import { Flex, Space, Button } from "antd";
import storeDetail from "../../store";
import CommonImage from "~/common/components/Image";
interface IStoreFooterProps {}

const StoreFooter: React.FunctionComponent<IStoreFooterProps> = (props) => {
  const {} = props;
  const { storeInfo } = storeDetail;
  if (!storeInfo) {
    return null;
  }

  return (
    <Flex>
      <CommonImage src="" />
      <Space>
        <Button type="text">店铺一</Button>
        <Button type="text">店铺二</Button>
        <Button type="text">店铺三</Button>
        <Button type="text">规则</Button>
        <Button type="text">预定流程</Button>
      </Space>
    </Flex>
  );
};

export default React.memo(StoreFooter);
