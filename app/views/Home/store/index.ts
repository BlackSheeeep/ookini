import type { Store } from "antd/lib/form/interface";
import { BaseStore } from "~/common/baseStore";
import utils from "~/common/utils";
import { atom } from "recoil";
import { wordpressApi } from "~/Request";
import type { FeePlan } from "~/views/types/FeePlan";
import _ from "lodash";

class HomeStore extends BaseStore {
  assets = {
    logo: atom({
      key: "logo",
      default: "",
    }),
    pages: atom({
      key: "pages",
      default: [],
    }),
    carouselImgs: atom({
      key: "carouselImgs",
      default: [],
    }),
  };
  feePlans = atom({
    key: "feePlans",
    default: [] as FeePlan[],
  });
  stores = atom({
    key: "stores",
    default: [] as Store[],
  });
  hairGallery = atom({
    key: "homeHairGallery",
    default: {},
  });
  rentSteps = atom({
    key: "rentSteps",
    default: {},
  });
  customers = atom({
    key: "customers",
    default: [],
  });
  faq = atom({
    key: "faq",
    default: [],
  });
  spot = atom({
    key: "spot",
    default: [],
  });
  blogs = atom({
    key: "blogs",
    default: [],
  });

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
    // this.updateState?.({ ["assets.carouselImgs"]: carouselImgs });
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

    this.updateState?.({ hairGallery: mergedData });
    return this.hairGallery;
  };

  public async getCustomerImages() {
    const [, customerImages] = await utils.resolvePromise(
      wordpressApi.getCustomerImages()
    );
    this.updateState?.({ customers: _.get(customerImages, "data") });
  }
  public getBlogs = async () => {
    const [err, res] = await utils.resolvePromise(
      wordpressApi.getBlogs(["title", "date", "link"])
    );
    const blogs = res?.data?.map?.((blog: any) => ({
      title: _.get(blog, "title.rendered"),
      date: _.get(blog, "date"),
      link: _.get(blog, "link"),
    }));
    this.updateState?.({ blogs: blogs });
  };
  public async getFAQ() {
    const faq = await wordpressApi.getFQA();
    this.updateState?.({ faq: _.get(faq, "data") });
  }
  public async getRecommendSpot() {
    const [err, res] = await utils.resolvePromise(
      wordpressApi.getRecommendSpot()
    );
    if (err) return Promise.reject(err);
    const data = _.get(res, "data")?.map((item: any) => ({
      ...item,
      sightImage: _.get(item, "sightImage.guid"),
    }));
    this.updateState?.({ spot: data });
  }
}

const homeStore = new HomeStore();

export default homeStore;
