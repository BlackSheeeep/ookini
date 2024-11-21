import get from "lodash/get";
import set from "lodash/set";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import isObject from "lodash/isObject";
import isUndefined from "lodash/isUndefined";
import isString from "lodash/isString";
import isNaN from "lodash/isNaN";
import isNumber from "lodash/isNumber";
import isNull from "lodash/isNull";
import groupBy from "lodash/groupBy";
import flatten from "lodash/flatten";
import toPairs from "lodash/toPairs";
import join from "lodash/join";
import map from "lodash/map";
import trim from "lodash/trim";
import replace from "lodash/replace";
import remove from "lodash/remove";
import assign from "lodash/assign";
import isFunction from "lodash/isFunction";
import toNumer from "lodash/toNumber";
import throttle from "lodash/throttle";
export const lodash = {
  set,
  get,
  isArray,
  isEmpty,
  isObject,
  isUndefined,
  isString,
  isNaN,
  isNumber,
  isNull,
  groupBy,
  flatten,
  toPairs,
  join,
  map,
  trim,
  replace,
  remove,
  assign,
  isFunction,
  toNumer,
  throttle,
};
global._ = lodash;
declare global {
  var _: typeof lodash;
  var setRem: typeof window.runTime.setRem;
  var baseURL: string;
}
export {};
