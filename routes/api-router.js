const apiRouter = require("express").Router();
const articlesRouter = require("./articles-router.js");
const commentsRouter = require("./comments-router.js");
const topicsRouter = require("./topics-router.js");
const { getAPIs } = require("../controllers/api-controller.js");

apiRouter.get("/", getAPIs);

apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
