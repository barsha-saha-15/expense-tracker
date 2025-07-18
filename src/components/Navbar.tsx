'use client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    const logout = () => {
        sessionStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <nav className="bg-blue-600 p-4 text-white flex justify-between">
            <h1 className="font-bold text-lg">💰 Expense Tracker</h1>
            <button onClick={logout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
        </nav>
    );
}
