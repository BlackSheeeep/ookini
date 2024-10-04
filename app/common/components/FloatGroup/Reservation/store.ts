import { wordpressApi } from "~/Request";
import { BaseStore } from "~/common/baseStore";
import utils from "~/common/utils";
import { atom } from "recoil";
import type { FeePlan } from "~/views/types/FeePlan";
import _ from "lodash";
import type { Store } from "~/views/types/Store";

class Reservation extends BaseStore {
  stores: Store[] = [];
  feeplans: FeePlan[] = [];
  visible = atom({
    default: false,
    key: "reservationVisible",
  });
  news = [];
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
    this.stores = stores;
  }
  async getFeeplans() {
    const [err, res] = await utils.resolvePromise(wordpressApi.getFeePlans());
    if (err) return Promise.reject(err);
    const feePlans = (res?.data || []).map((plan: any, index: number) => ({
      ...plan,
      images: plan?.images?.map?.((item: any) => item.guid),
    }));
    this.feeplans = feePlans;
  }
  async getNews() {
    const [err, res] = await utils.resolvePromise(wordpressApi.getNews());
    this.news = _.get(res, "data") || [];
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
export const IReservationStore = Reservation;
export const reservationStore = new Reservation();
