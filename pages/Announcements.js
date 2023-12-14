import React, { useEffect, useState } from 'react';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetch('/api/announcements')
            .then((response) => response.json())
            .then((data) => setAnnouncements(data))
            .catch((error) => console.error('Error fetching announcements:', error));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Announcements</h1>
            <ul>
                {announcements.map((announcement) => (
                    <li key={announcement.id} className="mb-2">
                        <div className="bg-gray-100 p-2 rounded-md">
                            <p className="text-black">{announcement.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Announcements;
