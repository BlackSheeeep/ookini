import utils from ".";
import { advantageDialogStore } from "../components/CommonAdvantageDialog/store";
import { reservationStore } from "../components/FloatGroup/Reservation/store";
import { globalStore } from "../globalStore";

export function loaderInit({ request }) {
  const userAgent = request.headers.get("User-Agent");
  utils.setUserAgent(userAgent);
  return {
    ret: { reservationStore, advantageDialogStore, globalStore },
    promises: [globalStore.init()],
  };
}
