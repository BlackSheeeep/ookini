import axios from "axios";
import { type AxiosRequestConfig } from "axios";
import utils from "~/common/utils";
import {
  advantageUrl,
  categoriesUrl,
  faqsUrl,
  feePlanUrl,
  galleryUrl,
  imagesUrl,
  mediaUrl,
  pagesUrl,
  postsUrl,
  recommendUrl,
  reservationUrl,
  newsUrl,
  storeInfoUrl,
} from "./constants";
// const wpJsonBase = "https://api.address-ookini.com/wp-json";
const wpJsonBase = "https://cdn.address-ookini.com/wp-json";
import _ from "lodash";

export default async function request(
  method: "get" | "post" | "delete",
  options: AxiosRequestConfig,
  url?: string,
  whiteList?: string[]
): Promise<any> {
  const [err, res] = await utils.resolvePromise(
    axios[method]?.(url || wpJsonBase + options.url, {
      headers:
        method.toUpperCase() === "POST"
          ? {
              // "Access-Control-Request-Method": method.toLocaleUpperCase(),
              // "Access-Control-Request-Headers": "x-custom-header",
              // Authorization:
              "Editor view": "Raw input",
              //   "'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJraW1vbm8tYWRtaW4iLCJpYXQiOjE3MDU4NTUwMTgsImV4cCI6MTg2MzUzNTAxOH0.Zp34TuNpSv1Sc39lWFc2CApq7glMXnXWlAGLhq_sc5A'",
            }
          : {},
      ...options,
    })
  );
  if (err) return Promise.reject(err);
  const datas = _.get(res, "data");
  const temp = _.isArray(datas)
    ? datas?.map((item) => utils.parseRequestData(item, whiteList))
    : utils.parseRequestData(datas, whiteList);
  return Promise.resolve({
    originData: res.data,
    data: temp,
  });
}

const createReq = (baseUrl: string) => {
  return async (
    method: "get" | "post" | "delete",
    path?: string[],
    options?: AxiosRequestConfig,
    whiteList?: string[]
  ) => {
    const p = path?.join("/");
    const url = baseUrl + (_.isString(p) ? "/" + p : "");
    return await request(method, { url, ...options }, undefined, whiteList);
  };
};
export const mediaReq = createReq(mediaUrl);
export const imagesReq = createReq(imagesUrl);
export const postsReq = createReq(postsUrl);
export const pagesReq = createReq(pagesUrl);
export const storeReq = createReq(storeInfoUrl);
export const feeplanReq = createReq(feePlanUrl);
export const faqsReq = createReq(faqsUrl);
export const galleryReq = createReq(galleryUrl);
export const reservationReq = createReq(reservationUrl);
export const recommendReq = createReq(recommendUrl);
export const categories = createReq(categoriesUrl);
export const newsReq = createReq(newsUrl);
export const advantageReq = createReq(advantageUrl);
