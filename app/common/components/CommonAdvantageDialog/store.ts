import { wordpressApi } from "~/Request";
import { BaseStore } from "~/common/baseStore";
import utils from "~/common/utils";
import _ from "lodash";
import { atom } from "recoil";
import type { Advantage } from "~/views/types/Advantage";

class AdvantageDialog extends BaseStore {
  visible = atom({
    default: false,
    key: "advantageDialogVisible",
  });
  advantage: Record<string, Advantage[]> = {};
  init() {}

  async getAdvantage() {
    const [err, res] = await utils.resolvePromise(wordpressApi.getAdvantage());
    if (err) return;
    return _.groupBy(res.data, "advantageType");
  }
}

export const advantageDialogStore = new AdvantageDialog();
