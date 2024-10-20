import { Flex, List } from "antd";
import { HOME_KEYS } from "~/common/constants/config";
import * as React from "react";
import AdvantageScss from "./Advantage.module.scss";
import CommonTitle from "~/common/components/CommonTitle";
import utils from "~/common/utils";
import CommonImage from "~/common/components/Image";
import { advantageDialogStore } from "~/common/components/CommonAdvantageDialog/store";
import type { Advantage as AdvantageType } from "~/views/types/Advantage";
import { useLoaderData } from "react-router-dom";

interface IAdvantageProps {}
const resonId = HOME_KEYS.reasonsForChoosing;

const MiniAdvantage: React.FunctionComponent<IAdvantageProps> = (props) => {
  const {
    advantageDialogStore: { advantage: advantageData },
  }: any = useLoaderData();

  const isLoading = Object.keys(advantageData).length === 0;

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

      <List
        className={AdvantageScss.miniList}
        dataSource={[
          ...(advantageData.serviceDetails ?? []),
          ...(advantageData.feature ?? []),
          ...(advantageData.benifit ?? []),
        ]}
        itemLayout="horizontal"
        loading={isLoading}
        renderItem={(item: AdvantageType, key) => {
          return (
            <List.Item className={AdvantageScss.listItem} key={key}>
              <List.Item.Meta
                style={{ alignItems: "center" }}
                avatar={
                  <CommonImage
                    preview={false}
                    style={{
                      width: utils.isMobileDevice ? "12rem" : "5rem",
                      marginRight: utils.isMobileDevice ? "2rem" : "0.5rem",
                    }}
                    src={item.image.guid}
                  />
                }
                title={item.title.rendered}
                description={item.contentText}
              />
            </List.Item>
          );
        }}
      />
    </Flex>
  );
};

export default MiniAdvantage;
