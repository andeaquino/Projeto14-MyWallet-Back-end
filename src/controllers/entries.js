import connection from "../database/database.js";

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
            const entries = await connection.query(`
                SELECT * FROM entries
                WHERE "userId" = $1
            `, [user.id]);

            res.status(200).send(entries.rows);
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
                VALUES ($1, NOW(), $2, $3)
            `, [user.id, description, value]);

            res.sendStatus(200);
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