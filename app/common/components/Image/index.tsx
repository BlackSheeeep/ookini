import { Flex, Image, ImageProps } from "antd";
import * as React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import ModuleScss from "./Image.module.scss";
import Loading from "../Loading";
import _ from "lodash";

const MAX_LOAD_NUM = 5;
const queue: any[] = [];
const wait: { symbol: any; start: () => void }[] = [];
function useQueue(): [boolean, () => void] {
  const [isWaiting, setIsWaiting] = React.useState(true);
  const symbol = React.useRef({}).current;
  const onLoaded = React.useMemo(() => {
    return () => {
      _.remove(queue, (item) => item === symbol);
      const { symbol: newSymbol, start } = (wait.shift() || {}) as {
        symbol: any;
        start: () => void;
      };
      queue.push(newSymbol);
      start?.();
    };
  }, []);
  React.useMemo(() => {
    if (
      queue.find((item) => item === symbol) ||
      wait.find((item) => item.symbol === symbol)
    )
      return;
    if (queue.length < MAX_LOAD_NUM) {
      queue.push(symbol);
      setIsWaiting(false);
    } else {
      wait.push({
        symbol,
        start() {
          setIsWaiting(false);
        },
      });
    }
  }, []);
  return [isWaiting, onLoaded];
}
interface ICommonImageProps extends ImageProps {}
const reg = /^http:\/\/8\.209\.245\.194/gi;
const reg2 = /^https:\/\/address-ookini.com/gi;
const CommonImage: React.FunctionComponent<ICommonImageProps> = (props) => {
  const { src, ...restProps } = props;
  if (!src) return null;
  let realSrc: string = src;

  if (reg.test(realSrc)) {
    realSrc = _.replace(realSrc, reg, "http://cdn.address-ookini.com");
  }
  if (reg2.test(realSrc)) {
    realSrc = _.replace(realSrc, reg2, "https://cdn.address-ookini.com");
  }
  if (!src) {
    return (
      <div
        style={{
          height: props.height,
          width: props.width,
        }}
      >
        暂无图片
      </div>
    );
  }
  return (
    <Image
      loading="lazy"
      placeholder={
        <Flex
          style={{
            height: props.height || "100%",
            width: props.width || "100%",
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
