import {
  postsReq,
  mediaReq,
  pagesReq,
  storeReq,
  feeplanReq,
  imagesReq,
  recommendReq,
  reservationReq,
  faqsReq,
  galleryReq,
  newsReq,
  advantageReq,
} from "./axiosApi";
import request from "./request";
import wordpressRequest from "./wordpressRequest";
export default {
  async getPosts() {
    return await postsReq("get");
  },
  async getMedia() {
    return await mediaReq("get", [], {
      params: {
        _embed: true,
      },
    });
  },
  async getPages() {
    return await pagesReq("get");
  },

  async getCarouselImgs() {
    return await imagesReq("get", ["769"]);
  },
  async getFeePlan(id: number | string) {
    return await feeplanReq("get", [id.toString()]);
  },
  async getFeePlans() {
    return await feeplanReq("get");
  },
  async getStores(id?: number | string) {
    return await storeReq("get", id ? [id.toString()] : []);
  },

  async getAdvantage() {
    return await advantageReq("get", undefined, {
      params: {
        per_page: 20,
      },
    });
  },

  async getCustomerImages() {
    return await galleryReq("get");
  },
  async getFQA() {
    return await faqsReq("get", undefined, {
      params: {
        categories: 29,
      },
    });
  },
  async getRecommendSpot() {
    return await recommendReq("get");
  },
  async getBlogs(whiteList: string[]) {
    return await pagesReq(
      "get",
      undefined,
      {
        params: {
          parent: "647",
        },
      },
      whiteList
    );
  },
  async getGallery() {
    return await imagesReq("get", ["807"]);
  },
  async getHairGallery() {
    return await imagesReq("get", undefined, {
      params: {
        categories: 28,
      },
    });
  },
  async createReservation(data: Record<string, any>) {
    return wordpressRequest("post", ["reservation/create"], { ...data });
  },
  async getMobileHomeImg() {
    return await imagesReq("get", undefined, {
      params: {
        categories: 32,
      },
    });
  },
  async getNews() {
    return await newsReq("get", undefined, {
      params: {
        categories: 30,
      },
    });
  },
};
