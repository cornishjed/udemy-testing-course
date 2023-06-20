const httpMocks = require("node-mocks-http"); // enables simulation of req res operations

const TodoController = require("../../controllers/todo.controller"); // importing neccessary files for testing
const TodoModel = require("../../model/todo.model");
const newTodo = require("../mock-data/new-todo.json");

TodoModel.create = jest.fn(); // function must be defined as jest function for testing

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

// testing a function. each 'it' is a condition it should pass
describe("TodoController.createTodo", () => {
  beforeEach(() => {
    req.body = newTodo; // initiated before each test
  });
  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });
  it("should call TodoModel.create", () => {
    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });
  it("should return 201 response code", async () => {
    await TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("should return json body in response", async () => {
    TodoModel.create.mockReturnValue(newTodo); // "Accepts a value that will be returned whenever the mock function is called."
    await TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
  it("should handle errors", async () => {
    const errorMessage = { message: "Done property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    TodoModel.create.mockReturnValue(rejectedPromise);
    await TodoController.createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
