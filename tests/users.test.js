import app from "../src/app.js";
import supertest from "supertest";
import connection from "../src/database/database.js";

describe("POST /sign-up", () => {

    beforeAll(async () => {
        await connection.query(`
        INSERT INTO users 
        (name, email, password) 
        VALUES ('Teste 409', 'teste@409.com.br', '123')
        `);

        await connection.query(`
        DELETE FROM users 
        WHERE email = 'teste@201.com.br'
        `);
    });

    afterAll(async () => {
        await connection.query(`
        DELETE FROM users 
        WHERE email = 'teste@409.com.br'
        `);

        connection.end();
      });

    it("returns 403 for invalid body", async () => {
        const body = {
            name: "",
            email: "",
            password: "123"
        };

        const result = await supertest(app)
            .post('/sign-up')
            .send(body);
        const status = result.status;
        expect(status).toEqual(403);
    });

    it("returns 409 when email is already in use", async () => {
        const body = {
            name: "Teste 409",
            email: "teste@409.com.br",
            password: "123"
        };

        const result = await supertest(app)
            .post('/sign-up')
            .send(body);
        const status = result.status;
        expect(status).toEqual(409);
    });

    it("returns 201 when account is created sucessufully", async () => {
        const body = {
            name: "Teste 201",
            email: "teste@201.com.br",
            password: "123"
        };

        const result = await supertest(app)
            .post('/sign-up')
            .send(body);
        const status = result.status;
        expect(status).toEqual(201);
    });
});