const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

// when POST at endpointUrl is triggered, test sequence carried out
describe(endpointUrl, () => { // 'describe' and 'it' being part of jest...
  it("POST" + endpointUrl, async () => {
    const response = await request(app).post(endpointUrl).send(newTodo); // 'request' and 'expect' are supertest
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });
  it(
    "should return error 500 on malformed data with POST" + endpointUrl,
    async () => {
      const response = await request(app).post(endpointUrl).send({
        title: "Missing done property",
      });
      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message:
          "Todo validation failed: done: Path `done` is required.",
      });
    }
  );
});
