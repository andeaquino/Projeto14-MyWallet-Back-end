import connection from "../database/database.js";

const postUsers = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        await connection.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, password]);

        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}

export {
    postUsers
}