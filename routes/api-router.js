const apiRouter = require("express").Router();
const articlesRouter = require("./articles-router.js");
const commentsRouter = require("./comments-router.js");
const topicsRouter = require("./topics-router.js");

apiRouter.get("/", (req, res, next) => {
  res.status(200).send("API Router working here...");
});

apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
