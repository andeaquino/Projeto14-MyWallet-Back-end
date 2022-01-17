import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createToken } from "../factories/userFactory";
import { generateEntryBody } from "../factories/entryFactory";
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

describe("POST /entries", () => {
  it("should return status 401 for user not authorized", async () => {
    const body = generateEntryBody();

    const result = await supertest(app).get("/entries").send(body);
    const { status } = result;
    expect(status).toEqual(401);
  });

  it("should return status 403 for invalid body", async () => {
    const body = {};
    const token = await createToken();

    const result = await supertest(app)
      .post("/entries")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    const { status } = result;
    expect(status).toEqual(403);
  });

  it("should return status 201 when entry is created sucessufully", async () => {
    const body = generateEntryBody();
    const token = await createToken();

    const result = await supertest(app)
      .post("/entries")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    const { status } = result;
    expect(status).toEqual(201);
  });
});

describe("GET /entries", () => {
  it("should return status 401 for user not authorized", async () => {
    const result = await supertest(app).get("/entries");
    const { status } = result;
    expect(status).toEqual(401);
  });

  it("should return status 200 for sucess", async () => {
    const token = await createToken();

    const result = await supertest(app)
      .get("/entries")
      .set("Authorization", `Bearer ${token}`);
    const { body } = result;
    expect(body).toEqual(
      expect.objectContaining({
        entries: expect.any(Array),
      })
    );
  });
});