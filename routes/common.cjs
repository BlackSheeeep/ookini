const axios = require("axios");
const lodash = require("lodash");
const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "8.209.245.194", // 数据库主机地址
  user: "kimono", // 数据库用户名
  password: "kimono0921", // 数据库密码
  database: "kimono", // 数据库名称
  waitForConnections: true,
  connectionLimit: 10,
  idleTimeout: 60000, // 空闲连接超时时间（毫秒）
  queueLimit: 0,
});
module.exports.connection = pool;
module.exports.baseUrl = "https://wp.address-ookini.com/wp-json/wp/v2/";

module.exports.request = (method, path, params = {}) => {
  params.header = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJraW1vbm8tYWRtaW4iLCJpYXQiOjE3MDU4NTUwMTgsImV4cCI6MTg2MzUzNTAxOH0.Zp34TuNpSv1Sc39lWFc2CApq7glMXnXWlAGLhq_sc5A",
  };
  return axios[method](
    module.exports.baseUrl + (Array.isArray(path) ? path.join("/") : path),
    params
  )
    .then((res) => [null, res])
    .catch((err) => [err, null]);
};
