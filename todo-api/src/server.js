const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
const { databaseUrl, env } = require("./config/configs")

const app = express();

mongoose.connect(databaseUrl || 'mongodb://localhost:27017/todo', {
  useNewUrlParser: true
});


if (env === 'test') {
  mongoose.connection.once('open', () => {
    mongoose.connection.db.dropDatabase();
  });
}

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
  res.status(error.httpStatusCode).json(error.responseMessage || "Internal Server Error");
});

module.exports = app;