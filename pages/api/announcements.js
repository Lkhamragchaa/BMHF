import db from '../../db';

export default async (req, res) => {
    try {
        const [announcements] = await db.query('SELECT * FROM announcements');
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching announcements' });
    }
};
