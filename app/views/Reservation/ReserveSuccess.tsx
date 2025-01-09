import React from "react";
import { Button, Result } from "antd";

const Success: React.FC = () => (
  <Result
    status="success"
    title="预约成功!"
    subTitle="有事可联系：123123123213"
    extra={[
      <Button type="primary" key="console">
        回首页
      </Button>,
    ]}
  />
);

export default Success;
