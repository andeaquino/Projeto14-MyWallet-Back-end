import connection from "../database.js";

async function createEntry(userId, description, value) {
  await connection.query(
    `INSERT INTO entries (user_id, date, description, value) VALUES ($1, NOW(), $2, $3::decimal)`,
    [userId, description, value]
  );
}

async function findUserEntries(userId) {
  const result = await connection.query(
    `SELECT * FROM entries WHERE user_id=$1 ORDER BY "id" DESC`,
    [userId]
  );

  return result.rows;
}

async function getSumEntries(userId) {
  const resultTotal = await connection.query(
    ` SELECT SUM(value) FROM entries WHERE "userId" = $1`,
    [userId]
  );
  return resultTotal.rows[0].sum;
}

export { createEntry, findUserEntries, getSumEntries };
