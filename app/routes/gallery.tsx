import * as React from "react";

import { reservationStore } from "~/common/components/FloatGroup/Reservation/store";
import { advantageDialogStore } from "~/common/components/CommonAdvantageDialog/store";
import utils from "~/common/utils";
import CommonLayout from "~/common/components/CommonLayout";
import _ from "lodash";
import Gallery from "~/views/Gallery";
import galleryStore from "~/views/Gallery/store";
import { GALLERY_TYPE } from "~/common/constants";
import { loaderInit } from "~/common/utils/commonLoader";

export async function loader({ request }) {
  const url = new URL(request.url);
  const type = Number(url.searchParams.get("type"));
  const galleryType = _.get(GALLERY_TYPE, type) || "";
  const { ret, promises } = loaderInit({ request });

  await Promise.all([
    galleryStore.init(
      (Object.values(GALLERY_TYPE).includes(galleryType as string)
        ? galleryType
        : GALLERY_TYPE.hair) as string
    ),
    ...promises,
  ]);
  return { ...ret, galleryStore };
}
export type GalleryData = typeof loader;

const GalleryEntry: React.FunctionComponent = (props) => {
  return (
    <CommonLayout>
      <Gallery></Gallery>
    </CommonLayout>
  );
};

export default GalleryEntry;
