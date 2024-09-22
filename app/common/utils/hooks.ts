import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import qs from "qs";

export const useAwaitData = (
  data: any,
  path: string[],
  getDataApi: () => Promise<any>
) => {
  const [internalData, setInternalData] = useRecoilState(_.get(data, path));
  useEffect(() => {
    getDataApi?.();
  }, []);
  return [internalData, setInternalData];
};

export const useSearch = () => {
  const { search } = useLocation();
  return qs.parse(search.substring(1));
};

export const createUseStoreData = (storeInstance: any) => {
  return (originPath: string[], ...apiParams: any) => {
    const path = [...originPath];
    const temp = _.remove(path, (a, index) => index === 0)?.[0]?.split("");
    const firstWord = _.remove(temp, (a, index) => index === 0)?.[0];
    path.unshift(firstWord.toLocaleUpperCase() + temp.join(""));
    const func = _.get(storeInstance, "get" + path.join("."));
    return useAwaitData(
      storeInstance,
      originPath,
      _.isFunction(func) ? () => func(...apiParams) : () => {}
    );
  };
};
