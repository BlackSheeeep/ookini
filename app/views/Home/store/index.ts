import { BaseStore } from "~/common/baseStore";
import utils from "~/common/utils";
import { atom } from "recoil";
import { wordpressApi } from "~/Request";
import type { FeePlan } from "~/views/types/FeePlan";
import _ from "lodash";
import request from "~/Request/request";
import wordpressRequest from "~/Request/wordpressRequest";

class HomeStore extends BaseStore {
  assets = {
    logo: "",
    pages: [],
    carouselImgs: [],
  };
  feeplannings = [];
  stores = [];
  hairGallery = {};
  areas = [];
  selectedArea = null;
  hotFeeplannings = null;
  async getAreas() {
    if (this.areas.length > 0) return;
    const [err, res] = await utils.resolvePromise(
      wordpressRequest("get", ["area", "list"])
    );
    if (err) return Promise.reject("地区数据加载失败");
    this.areas = res?.data;
  }
  async init() {
    await Promise.all([
      this.getAreas(),
      this.getCarouselImgs(),
      this.getStores(),
      this.getHotFeeplannings(),
      this.getHairGallery(),
    ]);
  }
  public getHotFeeplannings = async () => {
    const [err, res] = await utils.resolvePromise(
      wordpressRequest("get", ["feeplannings", "hot"])
    );
    if (err) return Promise.reject("热门方案数据加载失败");
    this.hotFeeplannings = res.data;
  };
  public getStores = async (area_id?: number) => {
    if (area_id) {
      const [err, res] = await request("get", [
        "feeplannings",
        "group_by_area",
        area_id.toString(),
      ]);
      if (err) return Promise.reject("店铺信息数据加载失败");

      this.stores = res.data;
    } else {
      const [err, res] = await utils.resolvePromise(
        wordpressRequest("get", ["stores", "list"])
      );
      if (err) return Promise.reject("店铺信息数据加载失败");
      this.stores = res.data;
    }
  };
  public getCarouselImgs = async () => {
    const func = utils.isMobileDevice
      ? wordpressApi.getMobileHomeImg
      : wordpressApi.getCarouselImgs;
    const [err, res] = await utils.resolvePromise(func());
    if (err) {
      return Promise.reject("滚动图片加载失败");
    }
    const carouselImgs = (
      _.get(res, utils.isMobileDevice ? "data.[0].images" : "data.images") || []
    ).map((item: any) => item.guid);
    this.assets.carouselImgs = carouselImgs;
  };
  public getFeeplans = async (area_id?: number) => {
    if (area_id) {
      const [err, res] = await request("get", [
        "feeplannings",
        "group_by_area",
        area_id.toString(),
      ]);
      if (err) return Promise.reject(err);
      this.feeplannings = res.data;
    } else {
      const [err, res] = await utils.resolvePromise(
        wordpressRequest("get", ["feeplannings", "list"])
      );
      if (err) return Promise.reject(err);
      this.feeplannings = res.data;
    }
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
