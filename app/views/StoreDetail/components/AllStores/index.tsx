import * as React from "react";
import { Flex } from "antd";
import storeDetail from "../../store";
interface IAllStoresProps {}

const AllStores: React.FunctionComponent<IAllStoresProps> = (props) => {
  const {} = props;
  const {
    storeInfo,
  } = storeDetail;
  if (!storeInfo) {
    return null;
  }

  const testStores = [
    {
      storeId: 5,
      imageUrl: '',
      storeName: '34',
    },
    {
      storeId: 5,
      imageUrl: '',
      storeName: '34',
    },
    {
      storeId: 5,
      imageUrl: '',
      storeName: '34',
    },
  ];

  return (
    <Flex justify="space-between">
      {testStores.map(({ storeId, imageUrl, storeName }) => (
        <div key={storeId}>
        {storeName}
        </div>
      ))}
    </Flex>
  );
};

export default React.memo(AllStores);
