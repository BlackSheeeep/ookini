import * as React from "react";
import { Flex } from "antd";
import utils from "~/common/utils";
import CommonImage from "~/common/components/Image";
interface IStorePicturesProps {
  storeDetail: any;
}

const StorePictures: React.FunctionComponent<IStorePicturesProps> = (props) => {
  const { storeDetail } = props;
  if (!storeDetail?.store?.images?.length) {
    return null;
  }

  return (
    <Flex vertical={utils.isMobileDevice}>
      {storeDetail?.store?.images?.map((image: any, index: any) => (
        <Flex key={index}>
          <CommonImage src={image?.guid} width="100%" />
        </Flex>
      ))}
    </Flex>
  );
};

export default React.memo(StorePictures);
