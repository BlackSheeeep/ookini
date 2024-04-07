import { Flex, Image, ImageProps } from "antd";
import * as React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import ModuleScss from "./Image.module.scss";

interface ICommonImageProps extends ImageProps {}
const reg = /^http:\/\/8\.209\.245\.194/gi;
const CommonImage: React.FunctionComponent<ICommonImageProps> = (props) => {
  const { src, ...restProps } = props;
  if (!src) return null;
  let realSrc: string = src;

  if (reg.test(realSrc)) {
    realSrc = _.replace(realSrc, reg, "https://address-ookini.com");
  }
  return (
    <Image
      loading="lazy"
      placeholder={
        <Flex
          style={{
            height: "100%",
            width: "100%",
          }}
          className={ModuleScss.image}
          justify="center"
          align="center"
        >
          <LoadingOutlined />
        </Flex>
      }
      src={realSrc}
      {...restProps}
    />
  );
};

export default CommonImage;
