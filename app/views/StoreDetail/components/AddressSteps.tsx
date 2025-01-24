import React from "react";
import { Layout, Card, Tag, Alert, Steps } from "antd";
import { useLoaderData } from "@remix-run/react";
import { IStoreDetailData } from "~/routes/storeDetail";
import CommonTitle from "~/common/components/CommonTitle";
import utils from "~/common/utils";
import CommonImage from "~/common/components/Image";
const Step = Steps.Step;
const AddressSteps = () => {
  const { storeDetail } = useLoaderData<IStoreDetailData>();
  const { storeInfo = {} } = storeDetail;
  console.log("storeINfo", storeInfo);
  const isMobile = utils.isMobileDevice;
  // 图片 URL
  const imageUrl1 = "https://via.placeholder.com/150";
  const imageUrl2 = "https://via.placeholder.com/150";
  const imageUrl3 = "https://via.placeholder.com/150";
  return (
    <Layout>
      {/* 头部 */}
      <CommonTitle
        subTitle="Way To Store"
        title={`ookini ${storeInfo.store_name}の行き方`}
      ></CommonTitle>

      {/* 内容区域 */}
      <Steps direction="vertical" current={3}>
        {storeInfo.address_details.map((item) => {
          return (
            <Step
              key={item.id}
              status="process"
              title={item.address_detail_title}
              description={
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row", // 根据设备类型设置布局方向
                    alignItems: isMobile ? "center" : "flex-start", // 移动端居中对齐
                    marginBottom: "24px",
                  }}
                >
                  <CommonImage
                    src={item.address_detail_img}
                    style={{
                      minWidth: isMobile ? "100%" : 295,
                      minHeight: isMobile ? "auto" : 195,
                      borderRadius: 10,
                      marginRight: isMobile ? 0 : "16px", // 移动端去掉右边距
                      marginBottom: isMobile ? "16px" : 0, // 移动端增加下边距
                    }}
                  />
                  <div
                    style={{
                      margin: 0,
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    {item.address_detail_text}
                  </div>
                </div>
              }
            />
          );
        })}
      </Steps>
    </Layout>
  );
};

export default AddressSteps;
