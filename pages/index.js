import Link from 'next/link';

const HomePage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4 text-gray-600">Welcome to the Home Page</h1>
                <p className="text-lg text-gray-600">This is the home page of your Next.js application.</p>
                <div className="mt-4">
                    <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
                    <span className="mx-2">|</span>
                   
                </div>
            </div>
        </div>
    );
};

export default HomePage;
