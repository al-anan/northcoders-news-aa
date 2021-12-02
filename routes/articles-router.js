const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  getArticles,
} = require("../controllers/articles-controller.js");

articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.get("/", getArticles);
// articlesRouter.get("/:article_id/comments", cF); // tbc
// articlesRouter.post("/:article_id/comments", cF); // tbc

module.exports = articlesRouter;
