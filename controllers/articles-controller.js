const {
  fetchArticleById,
  updateArticleById,
  fetchArticles,
} = require("../models/articles-model.js");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes: newVote } = req.body;
  updateArticleById(article_id, newVote)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch(next);
};

exports.getArticle = (req, res, next) => {
  fetchArticles()
    .then(() => {})
    .catch(next);
};
