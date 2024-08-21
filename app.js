const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routers/api-router");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

//400 (SQL) errors
app.use((error, request, response, next) => {
  if (error.code === "22P02" || error.code === "23502") {
    response.status(400).send({ msg: "Bad request" });
  }
  next(error);
});

//custom 404 errors
app.use((error, request, response, next) => {
  if (error.code === "23503") {
    response.status(404).send({ msg: "not found" });
  }
  next(error);
});

app.use((error, request, response, next) => {
  if (error.status && error.msg) {
    response.status(error.status).send({ msg: error.msg });
  }
  next(error);
});

//500 error
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
