const db = require("../db/connection.js");

exports.fetchArticleById = (id) => {
  return db
    .query(
      ` SELECT articles.*,
        COUNT(comments.article_id) AS comment_count
        FROM articles
        LEFT JOIN comments
        ON articles.article_id = comments.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id;`,
      [id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.updateArticleById = (id, vote) => {
  return db
    .query(
      `UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;`,
      [vote, id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.fetchArticles = () => {};
