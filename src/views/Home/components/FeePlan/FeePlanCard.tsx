import { Card, Space, Typography, Button, Flex } from "antd";
import * as React from "react";
import FeePlansScss from "./FeePlans.module.scss";
import utils from "~/common/utils";
import CommonImage from "~/common/components/Image";
import FormDialog from "~/common/components/FloatGroup/Reservation/FormDialog";
import { reservationStore } from "~/common/components/FloatGroup/Reservation/store";
import { Link } from "react-router-dom";
const { Title, Paragraph } = Typography;
interface IFeePlanCardProps {
  data: {
    imageUrl: string;
    title: string;
    subTitle: any;
    comment?: string;
    id: number | string;
  };
}

const FeePlanCard: React.FunctionComponent<IFeePlanCardProps> = (props) => {
  const { data } = props;
  const [isLoading, setIsLoading] = React.useState(true);
  const [showFormDialog, setShowFormDialog] = React.useState(false);

  React.useEffect(() => {
    if (!_.isEmpty(data) && isLoading) setIsLoading(false);
  }, [data]);

  return (
    <Space direction="vertical">
      <Card
        className={FeePlansScss.cardContainer}
        title={data.title}
        loading={isLoading}
      >
        <Flex className="common-img">
          <CommonImage
            width="100%"
            className={FeePlansScss.image}
            src={data.imageUrl}
          />
        </Flex>

        <Title ellipsis className={FeePlansScss.subTitle} level={5}>
          {data.subTitle}
        </Title>
        <Paragraph
          type="secondary"
          ellipsis={{
            tooltip: true,
            rows: 4,
          }}
        >
          {data.comment}
        </Paragraph>
        <Space
          style={{
            justifyContent: "flex-start",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Button
            type="primary"
            size="large"
            onClick={() => reservationStore.updateState?.({ visible: true })}
          >
            予約する
          </Button>
          <Button type="dashed" size="large">
            <Link to={`/feePlanDetail?id=${data.id}`}>プランを見る</Link>
          </Button>
        </Space>
      </Card>
    </Space>
  );
};

export default React.memo(FeePlanCard);
