import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createUser, generateUserBody } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-up", () => {
  it("should return status 403 for invalid body", async () => {
    const body = {};

    const result = await supertest(app).post("/sign-up").send(body);
    const { status } = result;
    expect(status).toEqual(403);
  });

  it("should return status 201 when account is created sucessufully", async () => {
    const body = generateUserBody();

    const result = await supertest(app).post("/sign-up").send(body);
    const { status } = result;
    expect(status).toEqual(201);
  });

  it("should return status 409 when email is already in use", async () => {
    const user = await createUser();
    const body = generateUserBody({ email: user.email });

    const result = await supertest(app).post("/sign-up").send(body);
    const { status } = result;
    expect(status).toEqual(409);
  });
});

describe("POST /sign-in", () => {
  it("should return status 403 for invalid body", async () => {
    const body = {};

    const result = await supertest(app).post("/sign-in").send(body);
    const status = result.status;
    expect(status).toEqual(403);
  });

  it("should return status 200 when account is logged in sucessufully", async () => {
    const user = await createUser();
    const body = { email: user.email, password: user.password };

    const result = await supertest(app).post("/sign-in").send(body);
    const status = result.status;
    expect(status).toEqual(200);
  });

  it("should return status 401 when email or password does not match or exist", async () => {
    const user = generateUserBody();
    const body = { email: user.email, password: user.password };

    const result = await supertest(app).post("/sign-in").send(body);
    const status = result.status;
    expect(status).toEqual(401);
  });
});