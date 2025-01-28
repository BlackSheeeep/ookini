import { BaseStore } from "~/common/baseStore";
import Loading from "~/common/components/Loading";
import utils from "~/common/utils";
import { createUseStoreData } from "~/common/utils/hooks";
import _ from "lodash";
import wordpressRequest from "~/Request/wordpressRequest";
import request from "~/Request/request";
class StoreDetail extends BaseStore {
  storeInfo = null;
  recommendSights = null;
  feeplannings = null;
  otherStores = null;
  async getFeeplannings(storeId: number) {
    const [err, res] = await request("get", [
      "feeplannings",
      "group_by_store",
      storeId.toString(),
    ]);
    if (err) return Promise.reject();
    this.feeplannings = res.data;
  }
  async getOtherStores(areaId: number) {
    const [err, res] = await request("get", [
      "stores",
      "group_by_area",
      `${areaId.toString()}`,
    ]);
    if (err) {
      console.log(err);
      return Promise.reject();
    }
    this.otherStores = res.data.filter((item) => item.id != this.storeInfo?.id);
  }
  async getRecommendSights(storeId: number) {
    const [err, res] = await request("get", [
      "recommend_sights",
      storeId.toString(),
    ]);
    if (err) return Promise.reject();
    this.recommendSights = res.data;
  }
  async getStoreInfo(id: number | string) {
    const [err, res] = await utils.resolvePromise(
      wordpressRequest("get", ["stores", "list", `${id.toString()}`])
    );
    if (err) return Promise.reject();
    this.storeInfo = res.data;
    await this.getOtherStores(this.storeInfo?.area?.[0]?.id);
  }
}

const storeDetail = new StoreDetail();

export const useFeePlanData = createUseStoreData(storeDetail);
export const awaitCompt = (
  Compt: React.FC<{ [key: string]: any; data: any }>,
  path: string[],
  ...apiParams: any
) => {
  return (props: any) => {
    const [data] = useFeePlanData(path, ...apiParams);
    // const data = useRecoilValue(_.get(homeStore, path));
    // useEffect(() => {
    //   initApi?.();
    // }, []);
    if (_.isEmpty(data)) return <Loading></Loading>;
    return <Compt data={data} {...props} />;
  };
};

export default storeDetail;
