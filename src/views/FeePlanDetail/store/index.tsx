import { BaseStore } from "common/baseStore";
import Loading from "common/components/Loading";
import utils from "common/utils";
import { createUseStoreData } from "common/utils/hooks";
import { RecoilState, atom, useRecoilCallback } from "recoil";
import { wordpressApi } from "Request";
class FeePlanStore extends BaseStore {
  currFeePlan = atom({
    key: "currFeePlan",
    default: null,
  });
  async getCurrFeePlan(id: number | string) {
    const [err, res] = await utils.resolvePromise(wordpressApi.getFeePlan(id));
    if (err) return Promise.reject();
    this.updateState?.({ currFeePlan: _.get(res, "data") });
  }
}

const feePlanStore = new FeePlanStore();

export const useFeePlanData = createUseStoreData(feePlanStore);
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

export default feePlanStore;
