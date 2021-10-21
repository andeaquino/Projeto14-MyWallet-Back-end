import connection from "../database/database.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

const signUp = async (req, res) => {
    const {name, email, password} = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    try {
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

            res.status(200).send(token);
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