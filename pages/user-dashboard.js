// pages/UserDashboard.js
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Chat from '../components/ChatComponent';
import Sidebar from '../components/Sidebar'; // Import Sidebar if not already imported

const UserDashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // Check if the session exists and has a user ID
  if (!session || !session.user?.id) {
    // Redirect to the login page if the user is not authenticated
    return null;
  }

  const userId = session.user.id;

  return (
    <div className="flex">
      <Sidebar /> {/* Assuming Sidebar is a component used in your layout */}
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <Chat userId={userId} recipientId={router.query.recipientId} />
        {/* Add other user-specific content and features */}
      </div>
    </div>
  );
};

export default UserDashboard;
