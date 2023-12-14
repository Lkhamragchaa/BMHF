// pages/api/register.js
import db from '../../db';
import bcrypt from 'bcrypt';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const [results] = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
            username,
            email,
            hashedPassword
        ]);

        res.status(201).json({ message: 'User registered successfully' });
    }
};
