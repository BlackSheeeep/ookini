import { Card, Divider, Space } from "antd";
import FormItem from "~/common/components/FormItem";
import * as React from "react";
import { Typography } from "antd";
const { Title } = Typography;
interface IEnsureProps {
  reservation_date: string;
  customer_name: string;
  customer_email: string;
  customer_tel: string;
  fee_planning_name: string;
  store_name: string;
}

const Ensure: React.FunctionComponent<IEnsureProps> = (props) => {
  const {
    reservation_date,
    customer_name,
    customer_email,
    customer_tel,
    fee_planning_name,
    store_name,
  } = props;
  return (
    <>
      <Title
        style={{
          fontSize: 20,
        }}
      >
        确认信息
      </Title>
      <Card title={<h2>预约信息</h2>}>
        <FormItem label="预约时间">{reservation_date}</FormItem>
      </Card>
      <Divider></Divider>
      <Card title={<h2>用户信息</h2>}>
        <FormItem label="用户姓名">{customer_name}</FormItem>
        <FormItem label="手机号">{customer_tel}</FormItem>
        <FormItem label="email">{customer_email}</FormItem>
      </Card>
      <Divider></Divider>
      <Card title={<h2>方案详情</h2>}>
        <FormItem label="方案名称">{fee_planning_name}</FormItem>
        <FormItem label="店铺名称">{store_name}</FormItem>
      </Card>
      <Divider></Divider>
    </>
  );
};

export default Ensure;
