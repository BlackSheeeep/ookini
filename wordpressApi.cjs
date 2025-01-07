const axios = require("axios");
const _ = require("lodash");
const {
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
} = require("./constants");
async function resolvePromise(promise: Promise<any>) {
  const res = await promise
    .then((res: any) => [null, res])
    .catch((err: any) => [err, null]);
  return res;
}
function parseRequestData(data: Record<string, any>, whiteList?: string[]) {
  return _.toPairs(data).reduce((obj, [key, value]) => {
    if (filterMap.has(key) && !whiteList?.includes(key)) return obj;
    const path = this.toLowerCase(key).split("_");
    _.set(obj, path, value);
    return obj;
  }, {});
}
const wpJsonBase = "https://wp.address-ookini.com/wp-json";

async function request(method, options, url, whiteList) {
  const [err, res] = await resolvePromise(
    axios[method]?.(url || (global.baseURL || wpJsonBase) + options.url, {
      headers:
        method.toUpperCase() === "POST"
          ? {
              "Editor view": "Raw input",
            }
          : {},
      ...options,
    })
  );
  if (err) return Promise.reject(err);
  const datas = _.get(res, "data");
  const temp = _.isArray(datas)
    ? datas?.map((item) => parseRequestData(item, whiteList))
    : parseRequestData(datas, whiteList);
  return Promise.resolve({
    originData: res.data,
    data: temp,
  });
}

const createReq = (baseUrl) => {
  return async (method, path, options, whiteList) => {
    const p = path?.join("/");
    const url = baseUrl + (_.isString(p) ? "/" + p : "");
    return await request(method, { url, ...options }, undefined, whiteList);
  };
};

const mediaReq = createReq(mediaUrl);
const imagesReq = createReq(imagesUrl);
const postsReq = createReq(postsUrl);
const pagesReq = createReq(pagesUrl);
const storeReq = createReq(storeInfoUrl);
const feeplanReq = createReq(feePlanUrl);
const faqsReq = createReq(faqsUrl);
const galleryReq = createReq(galleryUrl);
const reservationReq = createReq(reservationUrl);
const recommendReq = createReq(recommendUrl);
const categories = createReq(categoriesUrl);
const newsReq = createReq(newsUrl);
const advantageReq = createReq(advantageUrl);

module.exports = {
  request,
  mediaReq,
  imagesReq,
  postsReq,
  pagesReq,
  storeReq,
  feeplanReq,
  faqsReq,
  galleryReq,
  reservationReq,
  recommendReq,
  categories,
  newsReq,
  advantageReq,
};
