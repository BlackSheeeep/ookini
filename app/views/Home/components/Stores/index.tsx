import {
  Card,
  Flex,
  Typography,
  Collapse,
  Divider,
  Button,
  Popover,
} from "antd";
import _ from "lodash";
import { HOME_KEYS } from "~/common/constants/config";
import * as React from "react";
import { useRecoilValue } from "recoil";
import StoresScss from "./Stores.module.scss";
import utils from "~/common/utils";
import CommonTitle from "~/common/components/CommonTitle";
import CommonImage from "~/common/components/Image";
import Loading from "~/common/components/Loading";
import { reservationStore } from "~/common/components/FloatGroup/Reservation/store";
const { Title, Text } = Typography;

interface IStoresProps {}

const Stores: React.FunctionComponent<IStoresProps> = (props) => {
  const storesId = HOME_KEYS.storeList;
  const internalStores: any[] = useRecoilValue(reservationStore.stores);
  const gotoDetail = (id: number) => {
    utils.goto(`/storeDetail?id=${id}`);
  };
  return (
    <Flex
      id={storesId}
      vertical
      align="center"
      className={StoresScss.container}
    >
      <CommonTitle
        level={4}
        title="ookini着物レンタルの店舗"
        subTitle="Store Information"
        style={{ marginBottom: "2rem" }}
      />
      {_.isEmpty(internalStores) ? (
        <Loading></Loading>
      ) : (
        <Flex
          justify="space-between"
          vertical={utils.isMobileDevice ? true : false}
          className={StoresScss.storeContainer}
        >
          {internalStores.map((storeInfo: Record<string, any>, id: number) => {
            if (!storeInfo) return null;

            const items = [
              {
                key: "1",
                label: storeInfo?.access?.title,
                children: (
                  <Popover>
                    <Text>{storeInfo?.access?.content}</Text>
                  </Popover>
                ),
              },
              {
                key: "2",
                label: storeInfo?.details?.title,
                children: <Text>{storeInfo?.details?.content}</Text>,
              },
            ];
            return (
              <Card
                key={"store_" + id}
                hoverable
                className={StoresScss.storeCard}
              >
                <Flex justify="space-between">
                  <CommonImage
                    className={StoresScss.image}
                    src={storeInfo.storeImage}
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
                        tooltip: storeInfo.storeName,
                      }}
                      level={5}
                      content={storeInfo.storeName}
                    >
                      {storeInfo.storeName}
                    </Title>
                    <Text type="secondary" className={StoresScss.storePath}>
                      {storeInfo.storePath}
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
                <Collapse
                  size="small"
                  className={StoresScss.collapse}
                  items={items}
                />
              </Card>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default Stores;
