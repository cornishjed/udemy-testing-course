const TodoModel = require("../model/todo.model");

exports.createTodo = async (req, res, next) => {
  try {
    const createdModel = await TodoModel.create(req.body); // find() and create() are functions available to mongoose objects
    res.status(201).json(createdModel); // the response status and json attributes
  } catch (err) {
    next(err);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const allTodos = await TodoModel.find({}); 
    res.status(200).json(allTodos);
  } catch (err) {
    next(err);
  }
}

exports.getTodoById = async (req, res, next) => {
  try {
    const todoModel = await TodoModel.findById(req.params.todoId); // ":todoId" in routes
    todoModel ? res.status(200).json(todoModel) : res.status(404).send();
  } catch (err) {
     next(err);
  }
}