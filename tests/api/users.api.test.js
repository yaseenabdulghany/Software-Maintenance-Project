const request = require("supertest");
const app = require("../../src/app");
const userStore = require("../../src/services/user-store");

describe("api tests for /users routes", () => {
  beforeEach(() => {
    userStore.resetUsers();
  });

  test("get /users returns an empty array at the start", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: []
    });
  });

  test("post /users creates a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "yousef",
      email: "yousef@example.com"
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("user created successfully");
    expect(response.body.data).toEqual({
      id: 1,
      name: "yousef",
      email: "yousef@example.com"
    });
  });

  test("post /users returns 400 for missing data", async () => {
    const response = await request(app).post("/users").send({
      name: "a"
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("name and email are required");
  });

  test("put /users/:id updates an existing user", async () => {
    await request(app).post("/users").send({
      name: "kareem",
      email: "kareem@example.com"
    });

    const response = await request(app).put("/users/1").send({
      name: "kareem adel",
      email: "kareem@example.com"
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("user updated successfully");
    expect(response.body.data.name).toBe("kareem adel");
  });

  test("put /users/:id returns 400 for invalid data", async () => {
    await request(app).post("/users").send({
      name: "salma",
      email: "salma@example.com"
    });

    const response = await request(app).put("/users/1").send({
      name: "",
      email: "salma@example.com"
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("name and email are required");
  });

  test("put /users/:id returns 404 when the user does not exist", async () => {
    const response = await request(app).put("/users/5").send({
      name: "unknown user",
      email: "unknown@example.com"
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("user not found");
  });

  test("delete /users/:id removes a user", async () => {
    await request(app).post("/users").send({
      name: "fady",
      email: "fady@example.com"
    });

    const response = await request(app).delete("/users/1");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("user deleted successfully");
    expect(response.body.data.email).toBe("fady@example.com");
  });

  test("delete /users/:id returns 404 for a missing user", async () => {
    const response = await request(app).delete("/users/1");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("user not found");
  });
});
