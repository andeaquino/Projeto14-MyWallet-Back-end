import connection from "../database/database.js";
import { entrySchema } from "../schemas/entriesSchema.js";

const getEntries = async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token) return res.sendStatus(401);
  
    try {
        const result = await connection.query(`
            SELECT * FROM sessions
            JOIN users
            ON sessions."userId" = users.id
            WHERE sessions.token = $1
        `, [token]);
        const user = result.rows[0];

        if(user) {
            const resultEntries = await connection.query(`
                SELECT date, description, value FROM entries
                WHERE "userId" = $1
                ORDER BY id DESC
            `, [user.id]);
            const entries = resultEntries.rows;

            const resultTotal = await connection.query(`
                SELECT SUM(value) FROM entries
                WHERE "userId" = $1
            `, [user.id]);
            const total = resultTotal.rows[0].sum;
            
            res.status(200).send({entries, total});
        } else {
            res.sendStatus(401);
        }
    } catch {
        res.sendStatus(500);
    }   
}

const postEntry = async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const {description, value} = req.body;

    if(!token) return res.sendStatus(401);
    if(entrySchema.validate({description, value}).error || value === 0) return res.sendStatus(400);

    try {
        const result = await connection.query(`
            SELECT * FROM sessions
            JOIN users
            ON sessions."userId" = users.id
            WHERE sessions.token = $1
        `, [token]);
        const user = result.rows[0];

        if(user) {
            await connection.query(`
                INSERT INTO entries
                ("userId", date, description, value) 
                VALUES ($1, NOW(), $2, $3::decimal)
            `, [user.id, description, value]);

            res.sendStatus(201);
        } else {
            res.sendStatus(401);
        }
    } catch {
        res.sendStatus(500);
    }
}

export {
    getEntries,
    postEntry
}