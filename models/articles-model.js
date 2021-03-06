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
      ` UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;`,
      [vote, id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.fetchArticles = (sort_by = "created_at", order = "desc", topic) => {
  if (
    ![
      "created_at",
      "author",
      "title",
      "article_id",
      "topic",
      "votes",
      "comment_count",
    ].includes(sort_by)
  ) {
    return Promise.reject({ status: 400, msg: "Invalid sort_by query" });
  }

  if (!["desc", "asc"].includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  let queryStr = `
  SELECT a.article_id, a.author, a.title, a.topic, a.votes, a.created_at, 
  COUNT(comments.article_id) AS comment_count
  FROM articles a
  LEFT JOIN comments
  ON a.article_id = comments.article_id `;

  const queryValues = [];

  if (topic) {
    queryValues.push(topic);
    queryStr += `WHERE topic = $1`;
  }

  if (sort_by === "comment_count") {
    queryStr += `
  GROUP BY a.article_id
  ORDER BY ${sort_by} ${order};`;
  } else {
    queryStr += `
  GROUP BY a.article_id
  ORDER BY a.${sort_by} ${order};`;
  }

  return db.query(queryStr, queryValues).then(({ rows }) => {
    return rows;
  });
};

exports.fetchArticleComments = (id) => {
  return db
    .query(
      ` SELECT c.comment_id, c.votes, c.created_at, c.author, c.body
        FROM comments c
        WHERE c.article_id = $1
        ORDER BY c.created_at DESC;`,
      [id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.writeComment = (id, username, body) => {
  let queryStr = `
    INSERT INTO comments (author, body, article_id)
    VALUES ($1, $2, $3)
    RETURNING *;`;

  return db.query(queryStr, [username, body, id]).then(({ rows }) => {
    return rows[0];
  });
};
