const axios = require("axios");
const lodash = require("lodash");
module.exports.baseUrl = "https://wp.address-ookini.com/wp-json/wp/v2/";

module.exports.request = (method, path, params) => {
  return axios[method](
    module.exports.baseUrl + (Array.isArray(path) ? path.join("/") : path),
    params
  );
};
