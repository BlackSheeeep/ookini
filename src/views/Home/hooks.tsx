import { createUseStoreData, useAwaitData } from "common/utils/hooks";
import homeStore from "./store";
import Loading from "common/components/Loading";

export const useHomeData = createUseStoreData(homeStore);

export const awaitCompt = (
  Compt: React.FC<{ [key: string]: any; data: any }>,
  path: string[],
  initApi?: () => void
) => {
  return (props: any) => {
    const [data] = useHomeData(path);
    // const data = useRecoilValue(_.get(homeStore, path));
    // useEffect(() => {
    //   initApi?.();
    // }, []);
    if (_.isEmpty(data)) return <Loading></Loading>;
    return <Compt data={data} {...props} />;
  };
};
