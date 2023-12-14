// db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tsl',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection()
    .then((connection) => {
        console.log('Database connection successful');
        connection.release();
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
        throw error; // You may want to handle this error more gracefully in production.
    });

const query = async (sql, values) => {
    const connection = await pool.getConnection();
    try {
        return await connection.query(sql, values);
    } finally {
        connection.release();
    }
};

module.exports = {
    query,

    insertMessage: async (senderId, recipientId, message) => {
        try {
            const result = await query(
                'INSERT INTO messages (sender_id, recipient_id, message) VALUES (?, ?, ?)',
                [senderId, recipientId, message]
            );
            return result[0].insertId;
        } catch (error) {
            throw error;
        }
    },
};
