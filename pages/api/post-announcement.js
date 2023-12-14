import db from '../../db';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { announcement } = req.body;

        // Save the announcement to your database
        // You should use your database library to insert the data
        await db.query('INSERT INTO announcements (content) VALUES (?)', [announcement]);

        res.status(201).json({ message: 'Announcement posted successfully' });
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};
