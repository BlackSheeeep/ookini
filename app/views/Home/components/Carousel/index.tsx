import * as React from "react";
import CarouselScss from "./Carousel.module.scss";
import CommonCarousel from "~/common/components/CommonCarousel";
import CommonImage from "~/common/components/Image";
import Loading from "~/common/components/Loading";
import { Flex } from "antd";
import { useLoaderData } from "@remix-run/react";
import { HomeLoader } from "~/routes/_index";
interface ICarouselProps {}

const Carousel: React.FunctionComponent<ICarouselProps> = (props) => {
  const {} = props;
  const {
    homeStore: { assets },
  } = useLoaderData<HomeLoader>() || {};
  const imgs = assets?.carouselImgs || [];
  if (imgs.length <= 0) {
    return (
      <Flex
        style={{
          width: "100rem",
        }}
      >
        <Loading></Loading>
      </Flex>
    );
  }
  return (
    <CommonCarousel
      slidesPerView={1}
      showNext={false}
      showPrev={false}
      loop={false}
      direction="horizontal"
      className={CarouselScss.container}
      style={{ margin: 0 }}
      autoplay={true}
    >
      {imgs.map((url, index) => (
        <CommonImage
          preview={false}
          key={index}
          src={url}
          className={CarouselScss.imgWrapper}
        />
      ))}
    </CommonCarousel>
  );
};

export default React.memo(Carousel);
