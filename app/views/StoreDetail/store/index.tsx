import { BaseStore } from "~/common/baseStore";
import Loading from "~/common/components/Loading";
import utils from "~/common/utils";
import { createUseStoreData } from "~/common/utils/hooks";
import { RecoilState, atom, useRecoilCallback } from "recoil";
import _ from "lodash";
import { wordpressApi } from "~/Request";
class StoreDetail extends BaseStore {
  storeInfo = null;
  async getStoreInfo(id: number | string) {
    const [err, res] = await utils.resolvePromise(wordpressApi.getStores(id));
    if (err) return Promise.reject();
    this.storeInfo = _.get(res, "data");
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
