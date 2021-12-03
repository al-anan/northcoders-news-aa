const endpoints = require("../endpoints.json");

exports.fetchAPIs = () => {
  return Promise.resolve(endpoints);
};
