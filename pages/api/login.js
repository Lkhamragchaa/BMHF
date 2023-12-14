// pages/api/login.js
import db from '../../db';
import bcrypt from 'bcrypt';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { username, password, socketId } = req.body; // Add socketId to the request body

        try {
            // Fetch user data from the database based on the username
            const [results] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

            if (results.length > 0) {
                const user = results[0];
                // Check if the provided password matches the hashed password in the database
                const passwordMatch = await bcrypt.compare(password, user.password);

                if (passwordMatch) {
                    // Update the user's socket_id in the database (if socketId is provided)
                    if (socketId) {
                        await db.query('UPDATE users SET socket_id = ? WHERE id = ?', [socketId, user.id]);
                    }

                    if (user.role === 'admin') {
                        // Redirect to the admin dashboard
                        res.status(200).json({ message: 'Admin login successful', redirect: '/admin-dashboard' });
                    } else if (user.role === 'manager') {
                        // Redirect to the manager dashboard
                        res.status(200).json({ message: 'Manager login successful', redirect: '/manager-dashboard' });
                    } else if (user.role === 'employee') {
                        // Redirect to the manager dashboard
                        res.status(200).json({ message: 'User login successful', redirect: '/user-dashboard' });
                    }
                    else {
                        // Unauthorized access for other roles
                        res.status(403).json({ message: 'Access denied. Invalid role' });
                    }
                } else {
                    // Password doesn't match
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            } else {
                // User not found
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
};
