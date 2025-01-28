import { wordpressApi } from "~/Request";
import { BaseStore } from "~/common/baseStore";
import utils from "~/common/utils";
import { atom } from "recoil";
import type { FeePlan } from "~/views/types/FeePlan";
import _ from "lodash";
import type { Store } from "~/views/types/Store";
import request from "~/Request/request";
import wordpressRequest from "~/Request/wordpressRequest";

class GlobalStore {
  news = [];
  init() {
    return Promise.all([this.getNews()]);
  }

  async getNews() {
    const [err, res] = await utils.resolvePromise(wordpressApi.getNews());
    this.news = _.get(res, "data") || [];
  }
}
export const IGlobalStore = GlobalStore;
export const globalStore = new GlobalStore();
