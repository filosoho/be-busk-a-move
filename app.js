const express = require("express");
const cors = require("cors");
const app = express();
const endpoints = require("./endpoints.json");

app.use(cors());

app.use(express.json());

app.get("/api", (req, res, next) => {
  res.status(200).send({ endpoints: endpoints });
});

module.exports = app;
