const pool = require('./pool');

async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messages');
    return rows;
}

async function insertMessage(user, text) {
    await pool.query(
        'INSERT INTO messages (user, text) VALUES ($1, $2)',
        [user, text]
    );
}

async function searchUser(name) {
    const searchName = `%${name}%`;

    const res = await pool.query(
        'SELECT * FROM messages WHERE user ILIKE $1',
        [searchName]
    );

    return res.rows;
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
};