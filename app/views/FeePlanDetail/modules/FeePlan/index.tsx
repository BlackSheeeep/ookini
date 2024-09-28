import { Card, Divider, Flex, Tag, Typography } from "antd";
import CommonTitle from "~/common/components/CommonTitle";
import Loading from "~/common/components/Loading";
import * as React from "react";
import { useRecoilValue } from "recoil";
import feePlanStore from "~/views/FeePlanDetail/store";
import ModuleScss from "./FeePlan.module.scss";
import utils from "~/common/utils";
import { IssuesCloseOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import CommonImage from "~/common/components/Image";
import _ from "lodash";

interface IFeeplanDetailProps {}

const FeeplanDetail: React.FunctionComponent<IFeeplanDetailProps> = (props) => {
  const { currFeePlan } = feePlanStore;
  const data: any = useRecoilValue(currFeePlan);

  if (!data) return <Loading />;
  const rentTags = _.get(data, "rent.rentTags");
  const tags = rentTags.content.replace(/(\[|\]|\')/gi, "").split(",") || [];
  const images = _.get(data, "images")?.map(
    (item: Record<string, any>) => item.guid
  );
  const faqs = _.get(data, "faq.faqContent");
  const renderRentContent = ({ title, content }: Record<string, string>) => {
    return (
      <Flex
        justify="flex-start"
        vertical
        wrap="wrap"
        flex={1}
        className={ModuleScss.rentContent}
      >
        <Typography.Text type="secondary">{title}</Typography.Text>
        <Typography.Paragraph>{content}</Typography.Paragraph>
      </Flex>
    );
  };
  return (
    <Flex align="center" className={ModuleScss.container}>
      <Flex align="center" vertical>
        {/* <List renderItem={} /> */}
        <CommonTitle title={data.pagetitle}></CommonTitle>
        <Card>
          <Flex justify="space-between">
            {(images as string[])
              .filter((a: any, index: number) => index < 3)
              .map((imgUrl: string) => (
                <div className={ModuleScss.imgWrapper}>
                  <CommonImage src={imgUrl} className={ModuleScss.image} />
                </div>
              ))}
          </Flex>
          <Flex vertical>
            <Typography.Title level={5}>{data.fee.title}</Typography.Title>
            <Divider />
            <Typography.Title level={5}>{data.fee.content}</Typography.Title>
            <Typography.Text type="success">{data.fee.desc}</Typography.Text>
          </Flex>
          <Flex vertical className={ModuleScss.rent}>
            <Typography.Title level={5}>{data.rent.rentTitle}</Typography.Title>
            <Divider />
            <Flex>
              <Flex vertical flex={1} className={ModuleScss.rentContent}>
                <Typography.Text type="secondary">
                  {rentTags?.title}
                </Typography.Text>
                <Flex justify="flex-start" wrap="wrap">
                  {tags?.map((item: string) => (
                    <Tag
                      bordered={false}
                      color="warning"
                      className={ModuleScss.tag}
                    >
                      {item}
                    </Tag>
                  ))}
                </Flex>
              </Flex>
              {renderRentContent(_.get(data, "rent.rentTime"))}
            </Flex>
            <Flex>
              {renderRentContent(_.get(data, "rent.rentReturn"))}
              {renderRentContent(_.get(data, "rent.rentTips"))}
            </Flex>
          </Flex>
          <Flex vertical>
            <Typography.Title level={5}>
              {_.get(data, "faq.faqTitle")}
            </Typography.Title>
            <Divider></Divider>
            <Flex>
              {faqs?.map((item: { question: string; answer: string }) => (
                <Flex vertical flex={1} className={ModuleScss.faq}>
                  <Flex align="flex-start">
                    <QuestionCircleOutlined className={ModuleScss.icon} />
                    <Typography.Text type="danger">
                      {item.question}
                    </Typography.Text>
                  </Flex>
                  <Flex align="flex-start">
                    <IssuesCloseOutlined className={ModuleScss.icon} />
                    <Typography.Text type="success">
                      {item.answer}
                    </Typography.Text>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Card>
        <Card title={"ギャラリー"} className={ModuleScss.gallery}>
          <Flex wrap="wrap" justify="space-between">
            {images?.map?.((imgUrl: string) => (
              <div className={ModuleScss.imgWrapper}>
                <CommonImage src={imgUrl} className={ModuleScss.galleryImage} />
              </div>
            ))}
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
};

export default FeeplanDetail;
