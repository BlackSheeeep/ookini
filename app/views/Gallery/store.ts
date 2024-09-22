import { BaseStore } from "~/common/baseStore";
import { GALLERY_TYPE } from "~/common/constants";
import utils from "~/common/utils";
import { createUseStoreData } from "~/common/utils/hooks";
import { atom } from "recoil";
import { wordpressApi } from "~/Request";
class GalleryStore extends BaseStore {
  gallery = atom({
    key: "galleries",
    default: [],
  });
  isErrorType = atom({
    key: "isErrorType",
    default: false,
  });
  async init(type: string) {
    switch (type) {
      case GALLERY_TYPE.customer:
        this.getCustomers();
        break;
      case GALLERY_TYPE.hair:
        this.getHairs();
        break;
      default:
        utils.goto("/404");
    }
  }
  getHairs = async () => {
    const [err, res] = await utils.resolvePromise(
      wordpressApi.getHairGallery()
    );
    if (err) return Promise.reject(err);
    console.log("data", res);
    const datas = res?.data?.map((item: any) => {
      const data = {
        ...item,
        showName: item?.imageTitle,
        showImages: item?.images?.map((item: any) => item.guid),
      };
      return data;
    });

    this.updateState?.({ gallery: datas });
  };
  async getCustomers() {
    const [err, res] = await utils.resolvePromise(
      wordpressApi.getCustomerImages()
    );
    if (err) return Promise.reject(err);
    const datas = res?.data?.map((item: any) => {
      const data = {
        ...item,
        showImages: item?.showImages?.map((item: any) => item.guid),
      };
      return data;
    });

    this.updateState?.({ gallery: datas });
  }
}

const galleryStore = new GalleryStore();

export const useFeePlanData = createUseStoreData(galleryStore);

export default galleryStore;
