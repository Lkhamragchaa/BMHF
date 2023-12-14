import db from '../../db';

export default async (req, res) => {
    try {
        const [news] = await db.query('SELECT * FROM news');
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching news' });
    }
};
