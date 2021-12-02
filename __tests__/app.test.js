const db = require("../db/connection.js");
const request = require("supertest");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("200, responds with an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(Array.isArray(topics)).toBe(true);
        expect(topics[0]).toHaveProperty("slug");
        expect(topics[0]).toHaveProperty("description");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200, responds with article object when article_id matches passed id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: article }) => {
        expect(typeof article).toBe("object");
        expect(article).toHaveProperty("comment_count");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200, takes an object inc_votes and returns updated article", () => {
    return request(app)
      .patch("/api/articles/3")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body: article }) => {
        expect(typeof article).toBe("object");
        expect(article.votes).toBe(1);
      });
  });
});

describe("GET /api/articles", () => {
  test("200, responds with array of article objects");
});
