import utils from ".";
import { advantageDialogStore } from "../components/CommonAdvantageDialog/store";
import { reservationStore } from "../components/FloatGroup/Reservation/store";

export function loaderInit({ request }) {
  const userAgent = request.headers.get("User-Agent");
  utils.setUserAgent(userAgent);
  return {
    ret: { reservationStore, advantageDialogStore },
    promises: [reservationStore.getFeeplans(), reservationStore.getStores()],
  };
}
