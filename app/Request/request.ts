import axios, { AxiosRequestConfig } from "axios";
import lodash from "lodash";
export default function (
  method: "post" | "get" | "delete",
  path: string[],
  reqConfig: AxiosRequestConfig & { params?: Record<string, any> }
) {
  const config = lodash.merge(
    {
      headers: {
        "Editor view": "Raw input",
      },
    },
    reqConfig
  );
  // ${
  //     method === "get" && params
  //       ? `?${Object.entries(params)
  //           .map(([key, item]) => `${key}=${item}`)
  //           .join("&")}`
  //       : ""
  //   }
  return axios[method](
    `${process.env.VITE_API_URL}/api/${path.join("/")}`,
    config
  );
}
