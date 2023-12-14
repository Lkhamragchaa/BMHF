import db from '../../db';

export default async (req, res) => {
    if (req.method === 'GET') {
        // Fetch the list of users from the database
        const [results] = await db.query('SELECT * FROM users');
        const users = results;

        res.status(200).json(users);
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};
