import * as React from "react";
import galleryStore from "./store";
import Gallery from "./modules/Gallery";
import { useSearch } from "common/utils/hooks";
import { GALLERY_TYPE } from "common/constants";

interface IGalleryProps {}

const GalleryRoot: React.FunctionComponent<IGalleryProps> = (props) => {
  galleryStore.useInit();
  const type = useSearch().type as string;

  const galleryType = _.get(GALLERY_TYPE, type);

  React.useEffect(() => {
    galleryStore.init(
      Object.values(GALLERY_TYPE).includes(galleryType)
        ? galleryType
        : GALLERY_TYPE.hair
    );
  }, [galleryType]);

  return <Gallery />;
};

export default GalleryRoot;
