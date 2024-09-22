import { Button, Card, Flex, Image, List, Tabs, Typography } from "antd";
import { HOME_KEYS } from "~/common/constants/config";
import * as React from "react";
import AdvantageScss from "./Advantage.module.scss";
import homeStore from "~/views/Home/store";
import { useRecoilValue } from "recoil";
import CommonTitle from "~/common/components/CommonTitle";
import { SwapRightOutlined } from "@ant-design/icons";
import utils from "~/common/utils";
import { GALLERY_TYPE } from "~/common/constants";
import CommonImage from "~/common/components/Image";
import { advantageDialogStore } from "~/common/components/CommonAdvantageDialog/store";
import type {
  Advantage as AdvantageType,
  PureImage,
} from "~/views/types/Advantage";
import Loading from "~/common/components/Loading";

interface IAdvantageProps {}
const resonId = HOME_KEYS.reasonsForChoosing;
const maxShowImages = 10;

const Advantage: React.FunctionComponent<IAdvantageProps> = (props) => {
  const gallery = useRecoilValue(homeStore.hairGallery) as PureImage;

  React.useEffect(() => {
    homeStore.getHairGallery();
  }, []);

  const advantageData = useRecoilValue(advantageDialogStore.advantage);

  const renderItem = (data: AdvantageType[] = []) => {
    return (
      <div className={AdvantageScss.listContainer}>
        {_.isEmpty(data) ? (
          <Loading></Loading>
        ) : (
          data.map((item, key) => {
            if (!item) return null;
            return (
              <Card
                key={key}
                title={item.title.rendered}
                className={AdvantageScss.card}
              >
                <div className={AdvantageScss.cardContainer}>
                  <CommonImage
                    preview={false}
                    style={{
                      width: utils.isMobileDevice ? "14rem" : "5rem",
                      marginRight: utils.isMobileDevice ? "2rem" : "0.5rem",
                    }}
                    src={item.image.guid}
                  />
                  <div>{item.contentText || item.title.rendered}</div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    );
  };

  const tabs = [
    {
      key: "1",
      label: "ヘアセット",
      children: _.isEmpty(gallery) ? (
        <Loading></Loading>
      ) : (
        <Flex justify="space-between" align="center" vertical>
          <Card className={AdvantageScss.galleryCard}>
            <Typography.Title className={AdvantageScss.galleryTitle} level={5}>
              {gallery?.imageTitle}
            </Typography.Title>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "2rem",
              }}
            >
              <Image.PreviewGroup items={gallery?.images}>
                {gallery?.images
                  ?.filter((a: any, index: number) => index < maxShowImages)
                  .map?.((item: string) => (
                    <CommonImage key={item} src={item} />
                  ))}
              </Image.PreviewGroup>
            </div>
            <Flex flex={1} justify="center" className={AdvantageScss.toDetail}>
              <Button
                type="dashed"
                onClick={() => utils.goto("/gallery?type=" + GALLERY_TYPE.hair)}
              >
                ヘアセットを詳しくみる
                <SwapRightOutlined color="primary" type="primary" />
              </Button>
            </Flex>
          </Card>
        </Flex>
      ),
    },
    {
      key: "2",
      label: "サービス内容",
      children: renderItem(advantageData.serviceDetails),
    },
    {
      key: "3",
      label: "当店レンタルプランの3つの特徴",
      children: renderItem(advantageData.feature),
    },
    {
      key: "4",
      label: "さらにookini着物レンタルのメリットは",
      children: (
        <List
          className={AdvantageScss.list}
          dataSource={advantageData.benifit}
          renderItem={(item: AdvantageType, key) => {
            return (
              <List.Item className={AdvantageScss.listItem} key={key}>
                <CommonImage
                  preview={false}
                  style={{
                    width: utils.isMobileDevice ? "12rem" : "5rem",
                    marginRight: utils.isMobileDevice ? "2rem" : "0.5rem",
                  }}
                  src={item.image.guid}
                />
                <Typography.Text>{item.title.rendered}</Typography.Text>
              </List.Item>
            );
          }}
        ></List>
      ),
    },
  ];
  return (
    <Flex
      id={resonId}
      vertical
      align="center"
      className={AdvantageScss.container}
    >
      <CommonTitle
        level={4}
        className="title"
        title="ookiniが選ばれる理由"
        subTitle="豊富なレンタル着物・レンタル浴衣を取り揃え、
        最安水準の価格で着物、浴衣レンタルをご提供しております。"
      />
      {/* {_.isEmpty(internalAdvantage) ? (
        <Loading />
      ) : ( */}
      <Tabs
        tabPosition="top"
        centered={utils.isMobileDevice ? false : true}
        className={AdvantageScss.tabs}
        defaultActiveKey="1"
        items={tabs}
      />
      {/* )} */}
    </Flex>
  );
};

export default Advantage;
