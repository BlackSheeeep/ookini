import { wordpressApi } from "~/Request";
import { BaseStore } from "~/common/baseStore";
import utils from "~/common/utils";
import { atom } from "recoil";
import type { NewsData } from "~/views/types/News";

class NewsRoom extends BaseStore {
  news = atom({
    default: [] as NewsData,
    key: "news",
  });
  init() {
    return Promise.all([this.getNews()]);
  }
  async getNews() {
    const [err, res] = await utils.resolvePromise(wordpressApi.getNews());
    this.updateState?.({
      news: (_.get(res, "originData") as unknown as NewsData).filter(
        (news) => news.status === "publish"
      ),
    });
  }
}

export const newsroomStore = new NewsRoom();
