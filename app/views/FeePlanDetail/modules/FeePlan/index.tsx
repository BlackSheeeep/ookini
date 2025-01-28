import { Avatar, Card, Collapse, Divider, Flex, Tag, Typography } from "antd";
import CommonTitle from "~/common/components/CommonTitle";
import Loading from "~/common/components/Loading";
import * as React from "react";
import ModuleScss from "./FeePlan.module.scss";
import { IssuesCloseOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import CommonImage from "~/common/components/Image";
import _ from "lodash";
import { cn } from "@bem-react/classname";
import { useLoaderData } from "@remix-run/react";
import { IFeePlanDetailData } from "~/routes/feePlanDetail";
import "./Feeplanning.scss";
import CommonCarousel from "~/common/components/CommonCarousel";
import {
  FileSearchOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
interface IFeeplanDetailProps {}
const block = cn("fee-detail");
const FeeplanDetail: React.FunctionComponent<IFeeplanDetailProps> = (props) => {
  const { feePlanStore } = useLoaderData<IFeePlanDetailData>();
  const { currFeePlan: data } = feePlanStore;

  if (!data) return <Loading />;

  const images = _.get(data, "images")?.map(
    (item: Record<string, any>) => item.guid
  );
  console.log(data);
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
    <Flex align="center" vertical className={block()}>
      {/* <List renderItem={} /> */}
      <CommonTitle title={data.page_title}></CommonTitle>
      <Card className={block("detail-card")}>
        <Flex justify="space-between">
          <CommonCarousel showNext showPrev className={block("images")}>
            {(images as string[])
              .filter((a: any, index: number) => index < 3)
              .map((imgUrl: string) => (
                <div className={block("img-wrapper")}>
                  <CommonImage src={imgUrl} />
                </div>
              ))}
          </CommonCarousel>
        </Flex>
        <Flex vertical>
          <Typography.Title level={4}>¥{data.after_tax_coast}</Typography.Title>
          <Divider />
          <div
            dangerouslySetInnerHTML={{ __html: data.feeplanning_desc }}
          ></div>
        </Flex>
        <Flex vertical className={block("rent-detail")}>
          <Typography.Title level={4}>着物レンタルの内容</Typography.Title>
          <Divider></Divider>
          <Flex vertical>
            <Typography.Title level={5}>
              <FileSearchOutlined />
              セット内容
            </Typography.Title>
            <Flex>
              {data.contain_rental_items.map((item) => (
                <Tag color="blue">{item.item_name}</Tag>
              ))}
            </Flex>
            <div
              dangerouslySetInnerHTML={{ __html: data.rent_materials_desc }}
            ></div>
          </Flex>
          <Flex vertical>
            <Typography.Title level={5}>
              <ExclamationCircleOutlined /> 注意事項
            </Typography.Title>
            <div dangerouslySetInnerHTML={{ __html: data.notification }}></div>
          </Flex>
          <Flex vertical>
            <Typography.Title level={5}>
              <ClockCircleOutlined />
              所要時間
            </Typography.Title>
            <div dangerouslySetInnerHTML={{ __html: data.duration_desc }}></div>
          </Flex>
          <Flex vertical>
            <Typography.Title level={5}>
              <CalendarOutlined />
              予約受付期間
            </Typography.Title>
            <div
              dangerouslySetInnerHTML={{ __html: data.reservation_time_desc }}
            ></div>
          </Flex>
          <Flex vertical>
            <Typography.Title level={5}>
              <FieldTimeOutlined />
              返却時間
            </Typography.Title>
            <div
              dangerouslySetInnerHTML={{ __html: data.rent_return_desc }}
            ></div>
          </Flex>
        </Flex>
        <br></br>
        <Flex vertical>
          <Typography.Title level={5}>レンタル品一覧</Typography.Title>
          <Divider />
          <Flex gap={10}>
            {data.contain_rental_items.map((item) => (
              <Flex vertical gap={10} align="center" justify="center">
                <Avatar
                  size={60}
                  icon={
                    <CommonImage
                      className={block("rent-item-img")}
                      src={item.main_img}
                    />
                  }
                ></Avatar>
                <Typography.Text>{item.item_name}</Typography.Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Card>

      <Card title="常见问题" className={block("faq-card")}>
        <Collapse
          items={data.fqa?.map((item) => ({
            key: item.id,
            label: item.question,
            children: <div>{item.answer}</div>,
          }))}
          defaultActiveKey={["1"]}
        />
      </Card>
    </Flex>
  );
};

export default FeeplanDetail;
