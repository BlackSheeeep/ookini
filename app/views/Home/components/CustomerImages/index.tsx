import * as React from "react";
import CustomerScss from "./CustomerImages.module.scss";
import CommonCarousel from "~/common/components/CommonCarousel";
import homeStore from "~/views/Home/store";
import Loading from "~/common/components/Loading";
import { useRecoilValue } from "recoil";
import { Button, Flex, Typography } from "antd";
import { HOME_KEYS } from "~/common/constants/config";
import CommonTitle from "~/common/components/CommonTitle";
import { SwapRightOutlined } from "@ant-design/icons";
import utils from "~/common/utils";
import { GALLERY_TYPE } from "~/common/constants";
import CommonImage from "~/common/components/Image";
import _ from "lodash";

interface ICustomerImagesProps {}
const galleryId = HOME_KEYS.gallery;
const CustomerImages: React.FunctionComponent<ICustomerImagesProps> = (
  props
) => {
  const { customers } = homeStore;
  const customerImages = useRecoilValue(customers);

  React.useLayoutEffect(() => {
    homeStore.getCustomerImages();
  }, []);
  const images: string[] = _.flatten(
    customerImages?.map?.((item: any) => item?.showImages) || []
  )
    ?.map?.((item) => item.guid)
    ?.filter((item) => item);
  return (
    <Flex
      id={galleryId}
      vertical
      align="center"
      className={CustomerScss.container}
    >
      <CommonTitle
        level={4}
        title="お客様ギャラリー"
        subTitle={
          <Typography.Text type="secondary">
            京都の着物レンタルにおすすめ！
            <br />
            ookiniで人気のレンタル着物コーデをご紹介！
          </Typography.Text>
        }
      />
      {_.isEmpty(customerImages) || !customerImages ? (
        <Loading></Loading>
      ) : (
        <CommonCarousel
          className={CustomerScss.gallery}
          showNext={false}
          slidesPerView={utils.isMobileDevice ? 2 : 4}
          autoplay
          showPrev={false}
        >
          {images
            ?.filter((item: string) => item)
            .map((imgUrl: string, index) => (
              <CommonImage
                key={index}
                preview={false}
                className={CustomerScss.image}
                src={imgUrl}
              />
            ))}
        </CommonCarousel>
      )}
      <Button
        onClick={() => utils.goto("/gallery?type=" + GALLERY_TYPE.customer)}
        type="dashed"
        className={CustomerScss.toDetail}
      >
        着物ギャラリーを見る
        <SwapRightOutlined color="primary" type="primary" />
      </Button>
    </Flex>
  );
};

export default CustomerImages;
