const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json("Hello World!"); // returns json, making this a REST api
});

app.listen(3000, () => {
  console.log("Server is now running!");
});
