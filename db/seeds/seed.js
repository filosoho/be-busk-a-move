const format = require("pg-format");
const db = require("../connection");
const { usersData } = require("../data/development-data");

const seed = () => {
  return db
    .query(`DROP TABLE IF EXISTS users;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS buskers;`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE users (
        users_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        user_email VARCHAR(60) UNIQUE NOT NULL,
        user_password VARCHAR(40) NOT NULL,
        user_image_url VARCHAR(250),
        user_location VARCHAR NOT NULL(100),
        user_about_me VARCHAR(1000),
        user_set_up BOOLEAN DEFAULT FALSE,
        instruments TEXT[]
      );`);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE buskers (
        busk_id SERIAL PRIMARY KEY,
        busk_location_name VARCHAR(100) NOT NULL,
        busk_date DATE NOT NULL,
        busk_time TIME NOT NULL,
        username VARCHAR(50) REFERENCES users(username),
        user_image_url VARCHAR(250) REFERENCES users(user_image_url),
        busk_about_me VARCHAR(1000) NOT NULL,
        busk_setup VARCHAR(500) NOT NULL
      );`);
    })
    .then(() => {
      const formattedUsersData = usersData.map(convertTimestampToDate);
      const insertUsersQueryStr = format(
        "INSERT INTO users (username, full_name, user_email, user_password, user_image_url, user_location,user_about_me, user_set_up, instruments (array)) VALUES %L RETURNING *;",
        formattedArticleData.map(
          ({
            title,
            topic,
            author,
            body,
            created_at,
            votes = 0,
            article_img_url,
          }) => [title, topic, author, body, created_at, votes, article_img_url]
        )
      );

      return db.query(insertArticlesQueryStr);
    })
    .then(({ rows: articleRows }) => {
      const articleIdLookup = createRef(articleRows, "title", "article_id");
      const formattedCommentData = formatComments(commentData, articleIdLookup);

      const insertCommentsQueryStr = format(
        "INSERT INTO comments (body, author, article_id, votes, created_at) VALUES %L;",
        formattedCommentData.map(
          ({ body, author, article_id, votes = 0, created_at }) => [
            body,
            author,
            article_id,
            votes,
            created_at,
          ]
        )
      );
      return db.query(insertCommentsQueryStr);
    });
};

module.exports = seed;
