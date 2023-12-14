import db from '../../db';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { news } = req.body;

        // Save the news to your database
        // You should use your database library to insert the data
        await db.query('INSERT INTO news (content) VALUES (?)', [news]);

        res.status(201).json({ message: 'News posted successfully' });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};
