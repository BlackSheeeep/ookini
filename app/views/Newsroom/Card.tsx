import React from "react";
import { Badge, Card, Collapse, Typography } from "antd";
import CommonImage from "~/common/components/Image";
import { CaretRightOutlined } from "@ant-design/icons";

const NewsItem = ({
  date,
  title,
  imageUrl = "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  description,
}: {
  date: string;
  title: string;
  imageUrl?: string;
  description: string;
}) => {
  return (
    <Card
      style={{
        width: "100%",
      }}
      hoverable
      bordered={false}
      cover={<CommonImage alt="example" src={imageUrl} />}
    >
      <Badge>
        <Collapse
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          items={[
            {
              key: 1,
              label: <Typography.Title level={5}>{title}</Typography.Title>,
              children: (
                <Typography.Paragraph>{description}</Typography.Paragraph>
              ),
            },
          ]}
        />
      </Badge>
    </Card>
  );
};

export default NewsItem;
