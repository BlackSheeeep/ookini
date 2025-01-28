import {
  Flex,
  Popover,
  Card,
  Typography,
  Button,
  Divider,
  Collapse,
} from "antd";
import React from "react";
import utils from "../../utils";
import StoresScss from "./StoreCard.module.scss";
import CommonImage from "../Image";
const { Text, Title } = Typography;
const StoreCard = (props: any) => {
  const { storeInfo } = props;
  const id = storeInfo.id;
  const gotoDetail = (id: number) => {
    utils.goto(`/storeDetail?id=${id}`);
  };
  const items = [
    {
      key: "1",
      label: storeInfo?.store_intro_title,
      children: (
        <Popover>
          <Text>{storeInfo?.store_intro_content}</Text>
        </Popover>
      ),
    },
    {
      key: "2",
      label: storeInfo?.details_title,
      children: <Text>{storeInfo?.details_content}</Text>,
    },
  ];
  return (
    <Card key={"store_" + id} hoverable className={StoresScss.storeCard}>
      <Flex justify="space-between">
        <CommonImage
          className={StoresScss.image}
          src={storeInfo.store_image?.guid}
        />
        <Flex
          flex={1}
          justify="space-between"
          vertical
          className={StoresScss.titleContent}
        >
          <Title
            className={StoresScss.title}
            ellipsis={{
              rows: 1,
              expandable: false,
              tooltip: storeInfo.store_name,
            }}
            level={5}
            content={storeInfo.store_name}
          >
            {storeInfo.store_name}
          </Title>
          <Text type="secondary" className={StoresScss.storePath}>
            {storeInfo.store_address}
          </Text>
          <Button
            size="middle"
            type="primary"
            onClick={() => gotoDetail(storeInfo.id)}
          >
            詳しく
          </Button>
        </Flex>
      </Flex>
      <Divider></Divider>
      <Collapse size="small" className={StoresScss.collapse} items={items} />
    </Card>
  );
};
export default StoreCard;
