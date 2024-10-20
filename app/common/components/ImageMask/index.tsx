import ModuleScss from "./Mask.module.scss";

import * as React from "react";

interface IImageMaskProps {
  children: React.ReactNode;
  maskContent?: React.ReactNode;
}

const ImageMask: React.FunctionComponent<IImageMaskProps> = (props) => {
  return (
    <div className={ModuleScss.container}>
      <div className={ModuleScss.mask}>{props.maskContent}</div>
      {props.children}
    </div>
  );
};

export default ImageMask;
