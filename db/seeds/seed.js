const format = require("pg-format");
const db = require("../connection");

const seed = ({ usersData, busksData }) => {
  return db
    .query(`DROP TABLE IF EXISTS busks CASCADE;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users CASCADE;`);
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
          user_location VARCHAR(100) NOT NULL,
          user_about_me VARCHAR(1000),
          user_set_up BOOLEAN DEFAULT FALSE,
          instruments TEXT[]
        );
      `);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE busks (
          busk_id SERIAL PRIMARY KEY,
          busk_location JSONB NOT NULL,
          busk_location_name VARCHAR(100) NOT NULL,
          busk_time_date DATE NOT NULL,
          username VARCHAR(50) REFERENCES users(username) ON DELETE CASCADE,
          user_image_url VARCHAR(250),
          busk_about_me VARCHAR(1000) NOT NULL,
          busk_setup VARCHAR(500) NOT NULL,
          busk_selected_instruments TEXT[]
        );
      `);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO users (username, full_name, user_email, user_password, user_image_url, user_location, user_about_me, user_set_up, instruments) VALUES %L RETURNING *;",
        usersData.map(
          ({
            username,
            full_name,
            user_email,
            user_password,
            user_image_url,
            user_location,
            user_about_me,
            user_set_up,
            instruments,
          }) => [
            username,
            full_name,
            user_email,
            user_password,
            user_image_url,
            user_location,
            user_about_me,
            user_set_up,
            `{${instruments.join(",")}}`,
          ]
        )
      );

      return db.query(insertUsersQueryStr);
    })
    .then(() => {
      const insertBusksQueryStr = format(
        "INSERT INTO busks (busk_location, busk_location_name, busk_time_date, username, user_image_url, busk_about_me, busk_setup, busk_selected_instruments) VALUES %L RETURNING *;",
        busksData.map(
          ({
            busk_location,
            busk_location_name,
            busk_time_date,
            username,
            user_image_url,
            busk_about_me,
            busk_setup,
            busk_selected_instruments,
          }) => [
            JSON.stringify(busk_location),
            busk_location_name,
            busk_time_date,
            username,
            user_image_url,
            busk_about_me,
            busk_setup,
            `{${busk_selected_instruments.join(",")}}`,
          ]
        )
      );

      return db.query(insertBusksQueryStr);
    })
    .then(() => {
      console.log("Database seeded successfully.");
    })
    .catch((err) => {
      console.error("Error seeding database:", err);
    });
};

module.exports = seed;
