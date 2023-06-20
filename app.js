const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const app = express();
const mongodb = require("./mongodb/mongodb.connect");

mongodb.connect();

app.use(express.json()); // enables passing of post data into req.body (todo.controller)

app.use("/todos", todoRoutes); // used for CRUD methods

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.get("/", (req, res) => {
  res.json("Hello World!"); // returns json, making this a REST api
});

module.exports = app; // for supertest to pick up app
