import supertest from "supertest";
import { getConnection } from "typeorm";
import http from "../../src/enums/http.status";

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

describe("POST /entry", () => {
  it("should return unauthorized status for user not authorized", async () => {
    const body = generateEntryBody();

    const result = await supertest(app).get("/entry").send(body);
    const { status } = result;
    expect(status).toEqual(http.UNAUTHORIZED);
  });

  it("should return unprocessable status entity for invalid body", async () => {
    const body = {};
    const token = await createToken();

    const result = await supertest(app)
      .post("/entry")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    const { status } = result;
    expect(status).toEqual(http.UNPROCESSABLE_ENTITY);
  });

  it("should return created status when entry is created sucessufully", async () => {
    const body = generateEntryBody();
    const token = await createToken();

    const result = await supertest(app)
      .post("/entry")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    const { status } = result;
    expect(status).toEqual(http.CREATED);
  });
});

describe("GET /entry", () => {
  it("should return unauthorized status for user not authorized", async () => {
    const result = await supertest(app).get("/entry");
    const { status } = result;
    expect(status).toEqual(http.UNAUTHORIZED);
  });

  it("should return OK status for sucess", async () => {
    const token = await createToken();

    const result = await supertest(app)
      .get("/entry")
      .set("Authorization", `Bearer ${token}`);
    const { body } = result;
    expect(body).toEqual(
      expect.objectContaining({
        entries: expect.any(Array),
      })
    );
  });
});