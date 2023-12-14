import db from '../../db';
import bcrypt from 'bcrypt';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // You can adjust the number of salt rounds (e.g., 10) as needed.

        // Insert the new user into the database with the hashed password
        // You should use your database library to insert the data
         await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        res.status(201).json({ message: 'User added successfully' });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};
