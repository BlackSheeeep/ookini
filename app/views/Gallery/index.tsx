import * as React from "react";
import galleryStore from "./store";
import Gallery from "./modules/Gallery";
import _ from "lodash";

interface IGalleryProps {}

const GalleryRoot: React.FunctionComponent<IGalleryProps> = (props) => {
  galleryStore.useInit();
  return <Gallery />;
};

export default GalleryRoot;
