const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

let firstTodo, newTodoId;
let nonExistingTodoId = "64917d7b8b140f045b36ffff";
let testData = { title: "Make integration test", done: true };

// when POST at endpointUrl is triggered, test sequence carried out
describe(endpointUrl, () => {
  // 'describe' and 'it' being part of jest...
  test(
    "GET " + endpointUrl,
    async () => {
      const response = await request(app).get(endpointUrl);
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body[0].title).toBeDefined();
      expect(response.body[0].done).toBeDefined();
      firstTodo = response.body[0];
    },
    30000
  );
  test("GET by Id" + endpointUrl + ":todoId", async () => {
    const response = await request(app).get(endpointUrl + firstTodo._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBe(firstTodo.done);
  });
  test("GET todoById doesn't exist" + endpointUrl + ":todoId", async () => {
    const response = await request(app).get(endpointUrl + nonExistingTodoId);
    expect(response.statusCode).toBe(404);
  });
  it(
    "POST " + endpointUrl,
    async () => {
      const response = await request(app).post(endpointUrl).send(newTodo); // 'request' and 'expect' are supertest
      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(newTodo.title);
      expect(response.body.done).toBe(newTodo.done);
      newTodoId = response.body._id;
    },
    30000
  );
  it(
    "should return error 500 on malformed data with POST" + endpointUrl,
    async () => {
      const response = await request(app).post(endpointUrl).send({
        title: "Missing done property",
      });
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: "Todo validation failed: done: Path `done` is required.",
      });
    }
  );
  test(
    "PUT " + endpointUrl + ":todoId",
    async () => {
      const res = await request(app)
        .put(endpointUrl + newTodoId)
        .send(testData);
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe(testData.title);
      expect(res.body.done).toBe(testData.done);
    },
    30000
  );
  test("PUT 404", async () => {
    const res = await request(app)
      .put(endpointUrl + nonExistingTodoId)
      .send();
    expect(res.statusCode).toBe(404);
  });
  test("HTTP DELETE ", async () => {
    const res = await request(app)
      .delete(endpointUrl + newTodoId)
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);
  }, 30000);
  test("HTTP DELETE 404", async () => {
    const res = await request(app)
      .delete(endpointUrl + nonExistingTodoId)
      .send();
    expect(res.statusCode).toBe(404);
  });
});
