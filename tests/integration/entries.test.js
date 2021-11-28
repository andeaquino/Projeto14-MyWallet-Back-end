import "../../src/setup.js";
import app from "../../src/app.js";
import supertest from "supertest";
import connection from "../../src/database.js";
import { createToken } from "../factory/userFactory.js";
import { generateEntryBody } from "../factory/entryFactory.js";

describe("POST /entries", () => {
  afterAll(async () => {
    await connection.query(`DELETE FROM entries`);
    await connection.query(`DELETE FROM users`);
  });

  it("return 401 for user not authorized", async () => {
    const body = generateEntryBody();

    const result = await supertest(app).get("/entries").send(body);
    const { status } = result;
    expect(status).toEqual(401);
  });

  it("returns 403 for invalid body", async () => {
    const body = {};
    const token = await createToken();

    const result = await supertest(app)
      .post("/entries")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    const { status } = result;
    expect(status).toEqual(403);
  });

  it("returns 201 when entry is created sucessufully", async () => {
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
  afterAll(async () => {
    await connection.query(`DELETE FROM users`);
  });

  it("return 401 for user not authorized", async () => {
    const result = await supertest(app).get("/entries");
    const { status } = result;
    expect(status).toEqual(401);
  });

  it("returns 200 for sucess", async () => {
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
