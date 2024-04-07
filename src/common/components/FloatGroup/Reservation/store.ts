import { wordpressApi } from "Request";
import { BaseStore } from "common/baseStore";
import utils from "common/utils";
import { atom } from "recoil";
import type { FeePlan } from "views/types/FeePlan";
import { NewsData } from "views/types/News";
import type { Store } from "views/types/Store";

class Reservation extends BaseStore {
  stores = atom({
    default: [] as Store[],
    key: "reservationStores",
  });
  feeplans = atom({
    default: [] as FeePlan[],
    key: "reservationFeeplans",
  });
  visible = atom({
    default: false,
    key: "reservationVisible",
  });
  news = atom({
    default: [],
    key: "menuNews",
  });
  lan = atom({
    default: "ja",
    key: "lanasdasdasdasd",
  });
  init() {
    return Promise.race([this.getStores(), this.getFeeplans(), this.getNews()]);
  }
  // async getAdvantage() {
  //   const [err, res] = await utils.resolvePromise(wordpressApi.getAdvantage());
  //   console.log("res", res);
  // }
  async getStores() {
    const [err, res] = await utils.resolvePromise(wordpressApi.getStores());
    if (err) return Promise.reject(err);
    const stores = (_.get(res, "data") || []).map((item: any) => ({
      ...item,
      storeImage: item?.storeImage?.guid,
    }));
    this.updateState?.({
      stores,
    });
  }
  async getFeeplans() {
    const [err, res] = await utils.resolvePromise(wordpressApi.getFeePlans());
    if (err) return Promise.reject(err);
    const feePlans = (res?.data || []).map((plan: any, index: number) => ({
      ...plan,
      images: plan?.images?.map?.((item: any) => item.guid),
    }));
    this.updateState?.({ feeplans: feePlans });
  }
  async getNews() {
    const [err, res] = await utils.resolvePromise(wordpressApi.getNews());
    this.updateState?.({
      news: _.get(res, "data") || [],
    });
  }
  isCreating = false;
  async createReservation(data: Record<string, any>) {
    if (this.isCreating) return Promise.reject();
    this.isCreating = true;
    const [err, res] = await utils.resolvePromise(
      wordpressApi.createReservation(data)
    );
    this.isCreating = false;
    if (err) return Promise.reject(err);
    return res;
  }
}
export const reservationStore = new Reservation();
