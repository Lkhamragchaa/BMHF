import db from '../../../db';

export default async (req, res) => {
    if (req.method === 'DELETE') {
        const userId = req.query.id;

        // Delete the user with the specified userId from the database
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [userId]);

        if (result.affectedRows > 0) {
            res.status(200).end(); // User deleted successfully
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};
