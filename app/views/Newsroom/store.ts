import { wordpressApi } from "~/Request";
import { BaseStore } from "~/common/baseStore";
import utils from "~/common/utils";
import type { NewsData, NewsItem } from "~/views/types/News";
import _ from "lodash";

class NewsRoom extends BaseStore {
  news: NewsItem[] = [];
  init() {
    return Promise.all([this.getNews()]);
  }
  async getNews() {
    const [err, res] = await utils.resolvePromise(wordpressApi.getNews());
    this.news =
      (_.get(res, "originData") as unknown as NewsData).filter(
        (news) => news.status === "publish"
      ) || [];
  }
}

export const newsroomStore = new NewsRoom();
