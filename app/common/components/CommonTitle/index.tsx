import { Typography } from "antd";
import * as React from "react";
import _ from "lodash";
import ModuleScss from "./CommonTitle.module.scss";
import utils from "~/common/utils";

interface ICommonTitleProps {
  level?: number;
  title: string;
  subTitle?: React.ReactNode;
  className?: string;
  style?: any;
}

const CommonTitle: React.FunctionComponent<ICommonTitleProps> = (props) => {
  return (
    <Typography.Title
      // @ts-ignore
      level={props.level || 3}
      style={_.assign({ textAlign: "center" }, props.style)}
      className={utils.uniteClass(ModuleScss.container, props.className || "")}
    >
      {props.title}
      <Typography.Paragraph type="secondary">
        {props.subTitle}
      </Typography.Paragraph>
    </Typography.Title>
  );
};

export default CommonTitle;
