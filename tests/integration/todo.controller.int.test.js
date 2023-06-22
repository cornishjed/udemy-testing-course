const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

let firstTodo;

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
    const response = await request(app).get(
      endpointUrl + "64917d7b8b140f045b36ffff"
    );
    expect(response.statusCode).toBe(404);
  });
  it(
    "POST " + endpointUrl,
    async () => {
      const response = await request(app).post(endpointUrl).send(newTodo); // 'request' and 'expect' are supertest
      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(newTodo.title);
      expect(response.body.done).toBe(newTodo.done);
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
});
