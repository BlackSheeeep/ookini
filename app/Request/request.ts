import axios, { AxiosRequestConfig } from "axios";
import lodash from "lodash";

// 创建 axios 实例
const instance = axios.create({
  baseURL: "https://address-ookini.com/api", // 基础 URL
  timeout: 10000, // 请求超时时间（10 秒）
  headers: {
    "Content-Type": "application/json", // 默认请求头
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response.data; // 直接返回响应数据
  },
  (error) => {
    // 对响应错误做些什么
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("未授权，请重新登录");
          break;
        case 404:
          console.error("请求的资源不存在");
          break;
        case 500:
          console.error("服务器内部错误");
          break;
        default:
          console.error("请求失败", error.response.status);
      }
    } else if (error.request) {
      console.error("请求未收到响应", error.request);
    } else {
      console.error("请求设置错误", error.message);
    }
    return Promise.reject(error);
  }
);

export default function (
  method: "post" | "get" | "delete",
  path: string[],
  reqConfig?: AxiosRequestConfig & { params?: Record<string, any> }
) {
  const config = lodash.merge({}, reqConfig);
  // ${
  //     method === "get" && params
  //       ? `?${Object.entries(params)
  //           .map(([key, item]) => `${key}=${item}`)
  //           .join("&")}`
  //       : ""
  //   }
  return instance[method](
    `${process.env.VITE_API_URL}/api/${path.join("/")}`,
    config
  );
}
