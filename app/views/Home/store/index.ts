import { BaseStore } from "~/common/baseStore";
import utils from "~/common/utils";
import { atom } from "recoil";
import { wordpressApi } from "~/Request";
import type { FeePlan } from "~/views/types/FeePlan";
import _ from "lodash";

class HomeStore extends BaseStore {
  assets = {
    logo: "",
    pages: [],
    carouselImgs: [],
  };
  feePlans = atom({
    key: "feePlans",
    default: [] as FeePlan[],
  });
  stores = atom({
    key: "stores",
    default: [] as any[],
  });
  hairGallery = {};

  async init() {
    const [err, res] = await utils.resolvePromise(
      Promise.all([this.getCarouselImgs()])
    );
    if (err) return Promise.reject("初始化数据加载失败");
  }
  public getStores = async () => {
    const [err, res] = await utils.resolvePromise(wordpressApi.getStores());
    if (err) return Promise.reject("店铺信息数据加载失败");

    const stores = (_.get(res, "data") || []).map((item: any) => ({
      ...item,
      storeImage: item?.storeImage?.guid,
    }));

    this.updateState?.({ stores: stores });
  };
  public getCarouselImgs = async () => {
    const func = utils.isMobileDevice
      ? wordpressApi.getMobileHomeImg
      : wordpressApi.getCarouselImgs;
    const [err, res] = await utils.resolvePromise(func());
    if (err) return Promise.reject("滚动图片加载失败");
    const carouselImgs = (
      _.get(res, utils.isMobileDevice ? "data.[0].images" : "data.images") || []
    ).map((item: any) => item.guid);
    this.assets.carouselImgs = carouselImgs;
  };
  public getFeeplans = async () => {
    const [err, res] = await utils.resolvePromise(wordpressApi.getFeePlans());
    if (err) return Promise.reject(err);
    const feePlans = (res?.data || []).map((plan: any, index: number) => ({
      ...plan,
      images: plan?.images?.map?.((item: any) => item.guid),
    }));
    this.feePlans = feePlans;
    this.updateState?.({ feePlans: feePlans });
  };
  public getHairGallery = async () => {
    const [err, res] = await utils.resolvePromise(wordpressApi.getGallery());
    if (err) return Promise.reject(err);
    const gallery = res;

    const mergedData = {
      ...gallery.data,
      images: _.get(gallery, "data.images")?.map?.((item: any) => item.guid),
    };

    this.hairGallery = mergedData;
    return this.hairGallery;
  };

  public async getCustomerImages() {
    const [, customerImages] = await utils.resolvePromise(
      wordpressApi.getCustomerImages()
    );
    return _.get(customerImages, "data");
  }
  public getBlogs = async () => {
    const [err, res] = await utils.resolvePromise(
      wordpressApi.getBlogs(["title", "date", "link"])
    );
    return res?.data?.map?.((blog: any) => ({
      title: _.get(blog, "title.rendered"),
      date: _.get(blog, "date"),
      link: _.get(blog, "link"),
    }));
  };
  public async getFAQ() {
    const [, faq] = await utils.resolvePromise(wordpressApi.getFQA());
    return _.get(faq, "data");
  }
  public async getRecommendSpot() {
    const [err, res] = await utils.resolvePromise(
      wordpressApi.getRecommendSpot()
    );
    if (err) return [];
    return _.get(res, "data")?.map((item: any) => ({
      ...item,
      sightImage: _.get(item, "sightImage.guid"),
    }));
  }
}

const homeStore = new HomeStore();
export const THomeStore = HomeStore;
export default homeStore;
