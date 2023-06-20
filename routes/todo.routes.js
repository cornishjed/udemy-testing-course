const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.post("/", todoController.createTodo); // after post using param 2, returns page to param 1

module.exports = router;