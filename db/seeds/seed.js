const db = require("../connection.js");
const format = require("pg-format");

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;

  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS articles;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS topics;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE topics (
        slug VARCHAR(100) PRIMARY KEY,
        description VARCHAR(200) NOT NULL
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
        username VARCHAR(50) PRIMARY KEY,
        name VARCHAR(50),
        avatar_url VARCHAR
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        body TEXT NOT NULL,
        votes INT DEFAULT 0,
        topic VARCHAR(100) REFERENCES topics(slug),
        author VARCHAR(50) REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(50) REFERENCES users(username),
        article_id INT REFERENCES articles(article_id),
        votes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        body TEXT
      );`);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO topics (description, slug)
        VALUES
        %L
        RETURNING *;`,
        topicData.map((topic) => [topic.description, topic.slug])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO users (username, name, avatar_url)
      VALUES
      %L
      RETURNING *;`,
        userData.map((user) => [user.username, user.name, user.avatar_url])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO articles (title, body, votes, topic, author, created_at)
        VALUES
        %L
        RETURNING *;`,
        articleData.map((article) => [
          article.title,
          article.body,
          article.votes,
          article.topic,
          article.author,
          article.created_at,
        ])
      );
      return db.query(queryStr);
    })
    .then(() => {
      const queryStr = format(
        `INSERT INTO comments (author, article_id, votes, created_at, body)
        VALUES
        %L
        RETURNING *;`,
        commentData.map((comment) => [
          comment.author,
          comment.article_id,
          comment.votes,
          comment.created_at,
          comment.body,
        ])
      );
      return db.query(queryStr);
    });
};

module.exports = seed;
