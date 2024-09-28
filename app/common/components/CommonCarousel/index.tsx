// @ts-nocheck
import * as React from "react";
import { Swiper, SwiperClass, SwiperProps, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import CarouselScss from "./CarouselScss.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/a11y";
import utils from "~/common/utils";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";

interface ICommonCarouselProps extends SwiperProps {
  children?: React.ReactChild[];
  showNext?: boolean;
  showPrev?: boolean;
  showPagination?: boolean;
}

const CommonCarousel: React.FunctionComponent<ICommonCarouselProps> = (
  props
) => {
  const {
    children,
    showNext,
    showPrev,
    showPagination,
    className,
    ...restProps
  } = props;
  const [swiper, setSwiper] = React.useState<SwiperClass | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const prevElRef = React.useRef();
  const nextElRef = React.useRef();
  const observer = React.useRef();

  React.useLayoutEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 元素进入可视区域
          setIsVisible(true);
          console.log("元素进入可视区域");
        } else {
          // 元素离开可视区域
          console.log("元素离开可视区域");
        }
      });
    });
  }, []);
  React.useLayoutEffect(() => {
    if (prevElRef.current) {
      observer.current.observe(prevElRef.current);
    } else if (nextElRef.current) {
      observer.current.observe(nextElRef.current);
    }
  }, [prevElRef.current, nextElRef.current]);

  return (
    <Swiper
      onSwiper={setSwiper}
      modules={[Navigation, Pagination]}
      className={utils.uniteClass(
        CarouselScss.container,
        showNext ? "" : CarouselScss.invisibleNext,
        showPrev ? "" : CarouselScss.invisiblePrev,
        showPagination ? "" : CarouselScss.invisiblePagination,
        className
      )}
      centeredSlides
      loop
      pagination={
        !showPagination
          ? false
          : {
              clickable: true,
            }
      }
      direction="horizontal"
      slidesPerView={utils.isMobileDevice ? 1 : 3.8}
      {...restProps}
    >
      {children?.map((child, index) => (
        <SwiperSlide className={CarouselScss.slide} key={"slider_" + index}>
          {child}
        </SwiperSlide>
      ))}
      {showPrev ? (
        <LeftCircleFilled
          ref={prevElRef}
          size="large"
          className={utils.uniteClass(
            isVisible ? "bounce" : "",
            CarouselScss.btn
          )}
          onClick={() => swiper?.slidePrev()}
          style={{
            color: "var(--primary-color)",
            position: "absolute",
            left: "12px",
            fontSize: utils.isMobileDevice ? "10rem" : "4rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        />
      ) : null}
      {showNext ? (
        <RightCircleFilled
          ref={nextElRef}
          shape="circle"
          className={utils.uniteClass(
            isVisible ? "bounce" : "",
            CarouselScss.btn
          )}
          size="large"
          onClick={() => swiper?.slideNext()}
          style={{
            color: "var(--primary-color)",
            position: "absolute",
            right: "12px",
            fontSize: utils.isMobileDevice ? "10rem" : "4rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        />
      ) : null}
    </Swiper>
  );
};

export default CommonCarousel;
