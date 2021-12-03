const { fetchAPIs } = require("../models/api-model.js");

exports.getAPIs = (req, res, next) => {
  fetchAPIs()
    .then((endpoints) => {
      res.status(200).send(endpoints);
    })
    .catch(next);
};
