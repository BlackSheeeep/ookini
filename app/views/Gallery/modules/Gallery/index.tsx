import { Card, Divider, Flex, Image, Typography } from "antd";
import utils from "~/common/utils";
import CommonTitle from "~/common/components/CommonTitle";
import CommonImage from "~/common/components/Image";
import Loading from "~/common/components/Loading";
import * as React from "react";
import { useRecoilValue } from "recoil";
import galleryStore from "~/views/Gallery/store";
import _ from "lodash";
import ModuleScss from "./Gallery.module.scss";
interface IGalleryProps {}

const Gallery: React.FunctionComponent<IGalleryProps> = (props) => {
  const { gallery } = galleryStore;
  const galleries: any[] = useRecoilValue(gallery);
  React.useEffect(() => {}, []);
  if (_.isEmpty(galleries)) return <Loading></Loading>;
  return (
    <Flex
      vertical
      className={ModuleScss.container}
      justify="center"
      align="center"
    >
      {galleries?.map?.((item) => {
        return (
          <Card className={ModuleScss.card}>
            <CommonTitle level={4} title={item.showName} />
            <Divider style={{ margin: "3rem 0" }}></Divider>
            <Flex justify="space-between" wrap="wrap" style={{ width: "100%" }}>
              <Image.PreviewGroup>
                {item.showImages?.map((img: string) => (
                  <Flex
                    className={`${ModuleScss.imgWrapper} ${
                      utils.isMobileDevice ? ModuleScss.mobileImgWrapper : ""
                    }`}
                    style={{ width: "45%" }}
                  >
                    <CommonImage
                      src={img}
                      className={ModuleScss.img}
                      width="100%"
                    />
                  </Flex>
                ))}
              </Image.PreviewGroup>
            </Flex>
            {item.showInfo ? (
              <Typography.Paragraph
                type="secondary"
                className={ModuleScss.showInfo}
              >
                {item.showInfo}
              </Typography.Paragraph>
            ) : null}
          </Card>
        );
      })}
    </Flex>
  );
};

export default Gallery;
