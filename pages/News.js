import React, { useEffect, useState } from 'react';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('/api/news')
            .then((response) => response.json())
            .then((data) => setNews(data))
            .catch((error) => console.error('Error fetching news:', error));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">News</h1>
            <ul>
                {news.map((newsItem) => (
                    <li key={newsItem.id} className="mb-2">
                        <div className="bg-gray-100 p-2 rounded-md">
                        <p className="text-black">{newsItem.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default News;
