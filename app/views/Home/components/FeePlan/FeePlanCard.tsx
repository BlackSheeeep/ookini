import { Card, Space, Typography, Button, Flex } from "antd";
import * as React from "react";
import FeePlansScss from "./FeePlans.module.scss";
import CommonImage from "~/common/components/Image";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";
import { useRecoilState } from "recoil";
import { recoilStates } from "~/common/components/FloatGroup";
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
  const navigate = useNavigate();
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
            onClick={() => navigate("/reservation")}
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
