import { useState } from 'react';
import Link from 'next/link';

import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
    const [announcement, setAnnouncement] = useState('');
    const [news, setNews] = useState('');

    const handleAnnouncementSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/post-announcement', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ announcement }),
            });
            if (response.status === 201) {
                console.log('Announcement posted successfully');
            } else {
                console.error('Failed to post announcement');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleNewsSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/post-news', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ news }),
            });
            if (response.status === 201) {
                console.log('News posted successfully');
            } else {
                console.error('Failed to post news');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="w-3/4 p-4">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                <form onSubmit={handleAnnouncementSubmit} className="mb-8">
                    <label htmlFor="announcement" className="block mb-2">Announcement:</label>
                    <textarea
                        id="announcement"
                        value={announcement}
                        onChange={(e) => setAnnouncement(e.target.value)}
                        rows="4"
                        className="w-full border rounded-md p-2"
                    />
                    <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Post Announcement</button>
                </form>
                <Link href="/chat">Go to Chat</Link>
                <form onSubmit={handleNewsSubmit}>
                    <label htmlFor="news" className="block mb-2">News:</label>
                    <textarea
                        id="news"
                        value={news}
                        onChange={(e) => setNews(e.target.value)}
                        rows="4"
                        className="w-full border rounded-md p-2"
                    />
                    <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Post News</button>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;
