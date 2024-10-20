import { Flex, Spin, Typography } from "antd";
import utils from "~/common/utils";
import * as React from "react";

interface ILoadingProps {
  tip?: string;
}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
  return (
    <Flex
      flex={1}
      justify="center"
      align="center"
      vertical
      style={{
        margin: "2rem 0",
        width: "100%",
        minHeight: utils.isMobileDevice ? "100rem" : 0,
        height: "100%",
      }}
    >
      <Spin />
      {props.tip && <Typography.Paragraph>{props.tip}</Typography.Paragraph>}
    </Flex>
  );
};

export default Loading;
