//@ts-ignore
import _ from "lodash";
const filterMap = new Set([
  "_links",
  "date",
  "date_gmt",
  "guid",
  "modified",
  "modified_gmt",
  "link",
  "slug",
  "status",
  // "title",
  "type",
  "template",
]);
export default {
  __uesr_agent: "",
  setUserAgent(agent: string) {
    this.__uesr_agent = agent;
  },
  get isMobileDevice() {
    try {
      return document.body.clientWidth <= 600;
    } catch (error) {
      return /mobile/i.test(this.__uesr_agent); // 简单的正则判断
    }
  },
  remixServerUrl: import.meta?.env?.VITE_API_URL,
  isProduction: import.meta?.env?.VITE_ENV === "production",
  uniteClass(...params: string[]) {
    const arr = _.map(params, (item: string) => _.trim(item));
    return _.join(arr, " ");
  },
  async resolvePromise(promise: Promise<any>) {
    const res = await promise
      .then((res: any) => [null, res])
      .catch((err: any) => [err, null]);
    return res;
  },
  safeParseJson(str: string) {
    try {
      //通过JSON将str转换为json对象，如果转换出现异常，进入catch,返回false
      let obj = JSON.parse(str);
      if (typeof obj === "object" && obj) {
        return obj;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      //转换异常，返回false
      return false;
    }
  },
  checkIsJsonString(str: string) {
    try {
      //通过JSON将str转换为json对象，如果转换出现异常，进入catch,返回false
      let obj = JSON.parse(str);
      if (typeof obj === "object" && obj) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      //转换异常，返回false
      return false;
    }
  },

  goto(path: string) {
    const obj = new URL(window.location.href);
    obj.pathname = path;
    let a: any = document.createElement("a");
    a.href = "http://" + obj.host + decodeURIComponent(obj.pathname);
    a.click();
    a = null;
  },
  parseRequestData(data: Record<string, any>, whiteList?: string[]) {
    return _.toPairs(data).reduce((obj, [key, value]) => {
      if (filterMap.has(key) && !whiteList?.includes(key)) return obj;
      const path = this.toLowerCase(key).split("_");
      _.set(obj, path, value);
      return obj;
    }, {});
  },
  toLowerCase(str: string) {
    function toHump(name: string) {
      return name
        .toLocaleLowerCase()
        .replace(/\-(\w)/g, function (all, letter) {
          return letter.toUpperCase();
        });
    }
    return toHump(str);
  },
};
