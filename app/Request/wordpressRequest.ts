import axios, { AxiosRequestConfig } from "axios";
const instance = axios.create({
  baseURL: "/wp-json/wp/v2",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use((config) => {
  // 添加自定义请求头
  // config.headers["Editor view"] = "";
  return config;
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default function (
  method: "post" | "get" | "delete",
  path: string[],
  reqConfig?: AxiosRequestConfig
) {
  // const config = lodash.merge(
  //   {
  //     headers: {
  //       "Editor view": "Raw input",
  //     },
  //   },
  //   reqConfig
  // );
  // ${
  //     method === "get" && params
  //       ? `?${Object.entries(params)
  //           .map(([key, item]) => `${key}=${item}`)
  //           .join("&")}`
  //       : ""
  //   }
  const config =
    method === "post"
      ? {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJraW1vbm8tYWRtaW4iLCJpYXQiOjE3MzY0MDc3NTgsImV4cCI6MTg5NDA4Nzc1OH0.Bx8JLO6RSCBT1EdFtWpPB_1Izd7gK9dkAoRYMApWKRM",
          },
        }
      : {};
  return instance[method](
    `https://wp.address-ookini.com/wp-json/wp/v2/${path.join("/")}`,
    reqConfig,
    config
  );
}
