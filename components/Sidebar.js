import Link from 'next/link';

const Sidebar = () => {
    return (
        <nav className="bg-gray-200 w-1/4 p-4">
            <ul>
                <li className="mb-4">
                    <Link href="/Announcements" className="text-blue-600 hover:underline">Announcement</Link>
                </li>
                <li className="mb-4">
                    <Link href="/News" className="text-blue-600 hover:underline">News</Link>
                </li>
                <li className="mb-4">
                    <Link href="/chat" className="text-blue-600 hover:underline">Chat</Link>
                </li>
                <li className="mb-4">
                    <Link href="/SeeList" className="text-blue-600 hover:underline">See List</Link>
                </li>
                <li className="mb-4">
                    <Link href="/add-user" className="text-blue-600 hover:underline">Add User</Link>
                </li>
                <li className="mb-4">
                    <Link href="/meeting" className="text-blue-600 hover:underline">Meet</Link>
                </li>
                {/* Add more navigation links as needed */}
            </ul>
        </nav>
    );
};

export default Sidebar;
