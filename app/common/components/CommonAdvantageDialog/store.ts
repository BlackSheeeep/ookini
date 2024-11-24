import { wordpressApi } from "~/Request";
import { BaseStore } from "~/common/baseStore";
import utils from "~/common/utils";
import _ from "lodash";
import { atom } from "recoil";

class AdvantageDialog extends BaseStore {
  visible = atom({
    default: false,
    key: "advantageDialogVisible",
  });
  advantage = atom({
    default: {},
    key: "wjojfwoiejfowej",
  });
  init() {}

  async getAdvantage() {
    const [err, res] = await utils.resolvePromise(wordpressApi.getAdvantage());
    if (err) return;
    const ret = _.groupBy(res.data, "advantageType");
    return ret;
  }
}

export const advantageDialogStore = new AdvantageDialog();
