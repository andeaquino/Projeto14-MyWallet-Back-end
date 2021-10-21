import connection from "../database/database.js";
import bcrypt from 'bcrypt';

const postUsers = async (req, res) => {
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

export {
    postUsers
}