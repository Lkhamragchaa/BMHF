import Sidebar from '../components/Sidebar';
import Link from 'next/link';


const ManagerDashboard = () => {
    // Manager-specific content and functionality
    return (
        <div className="flex">
            
            <Sidebar />
            <div className="w-3/4 p-4">
                <h1 className="text-3xl font-bold">Manager Dashboard</h1>
                <Link href="/chat">Go to Chat</Link>
                {/* Add manager-specific content and features */}
            </div>
        </div>
    );
};

export default ManagerDashboard;
