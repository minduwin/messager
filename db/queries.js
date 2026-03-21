const pool = require('./pool');

async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messages');
    return rows;
}

async function insertMessage(alias, info) {
    await pool.query(
        'INSERT INTO messages (username, text) VALUES ($1, $2)',
        [alias, info]
    );
}

async function searchUser(name) {
    const searchName = `%${name}%`;

    const res = await pool.query(
        'SELECT * FROM messages WHERE username ILIKE $1',
        [searchName]
    );

    return res.rows;
}

async function getMessage(id) {
    const res = await pool.query(
        'SELECT * FROM messages WHERE id = $1',
        [id]
    );

    return res.rows[0];
}

async function deleteUser(id) {
    const res = await pool.query(
        'DELETE FROM messages WHERE id = $1 RETURNING *',
        [id]
    );

    return res.rows;
}

module.exports = {
    getAllMessages,
    insertMessage,
    searchUser,
    deleteUser,
    getMessage
};