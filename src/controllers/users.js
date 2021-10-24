import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";
import { signUpSchema, signInSchema } from "../schemas/usersSchemas.js";

const signUp = async (req, res) => {
    const {name, email, password} = req.body;

    if(signUpSchema.validate({name, email, password}).error) {
        return res.sendStatus(400);
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
        const emailCheck = await connection.query(`
            SELECT * FROM users
            WHERE email = $1
        `, [email]);
        if(emailCheck.rowCount !== 0) {
            return res.sendStatus(409);
        }

        await connection.query(`
            INSERT INTO users 
            (name, email, password) 
            VALUES ($1, $2, $3)
        `, [name, email, passwordHash]);

        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;

    if(signInSchema.validate({email, password}).error) {
        return res.sendStatus(400);
    }

    try {
        const result = await connection.query(`
            SELECT * FROM users
            WHERE email = $1 
        `, [email]);

        const user = result.rows[0];

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            await connection.query(`
                INSERT INTO sessions ("userId", token) 
                VALUES ($1, $2)
            `, [user.id, token]);

            res.status(200).send({token, name: user.name});
        } else {
            res.sendStatus(401);
        }

    } catch {
        res.sendStatus(500);
    }
}

export {
    signUp,
    signIn
}