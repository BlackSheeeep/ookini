import * as React from "react";
import { Flex, Typography, Space, Button } from "antd";
import CommonCarousel from "common/components/CommonCarousel";
import storeDetail from "../../store";
import CommonImage from "common/components/Image";
interface IProductCarouselProps {}

const ProductCarousel: React.FunctionComponent<IProductCarouselProps> = (
  props
) => {
  const {} = props;
  const { storeInfo } = storeDetail;
  if (!storeInfo) {
    return null;
  }

  const testProducts = [
    {
      proId: 1,
      imageUrl: "",
      proName: "34",
      proPrice: "23",
      proDetail: "dfsg",
    },
    {
      proId: 2,
      imageUrl: "",
      proName: "34",
      proPrice: "23",
      proDetail: "dfsg",
    },
    {
      proId: 3,
      imageUrl: "",
      proName: "34",
      proPrice: "23",
      proDetail: "dfsg",
    },
    {
      proId: 4,
      imageUrl: "",
      proName: "34",
      proPrice: "23",
      proDetail: "dfsg",
    },
    {
      proId: 5,
      imageUrl: "",
      proName: "34",
      proPrice: "23",
      proDetail: "dfsg",
    },
  ];

  return (
    <CommonCarousel
      slidesPerView={1}
      showNext={false}
      showPrev={false}
      loop={false}
      direction="horizontal"
      // className={ModuleScss.carouselContainer}
      // autoplay={true}
    >
      {testProducts.map(({ proId, imageUrl, proName, proPrice, proDetail }) => (
        <Flex key={proId} style={{ width: "200px" }}>
          <CommonImage src={imageUrl} />
          <Flex vertical>
            <Typography.Title level={5}>{proName}</Typography.Title>
            <Typography.Title level={5}>{proPrice}</Typography.Title>
            <Typography.Text>{proDetail}</Typography.Text>
            <Space>
              <Button>预约</Button>
              <Button>预约</Button>
            </Space>
          </Flex>
        </Flex>
      ))}
    </CommonCarousel>
  );
};

export default React.memo(ProductCarousel);
