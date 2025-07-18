'use client';
import { useEffect, useState } from 'react';
import api from '@/components/api';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

interface Expense {
    id: number;
    description: string;
    amount: number;
    category: string;
    date: string;
}

export default function Home() {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        api
            .get('/expenses', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setExpenses(res.data))
            .catch(() => router.push('/login'));
    }, [router]);

    const deleteExpense = async (id: number) => {
        const confirmed = window.confirm('Are you sure you want to delete this expense?');
        if (!confirmed) return;

        const token = sessionStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            await api.delete(`/expenses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setExpenses(expenses.filter((e) => e.id !== id));
        } catch (error) {
            console.error('Delete failed', error);
            router.push('/login');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-3xl mx-auto mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">My Expenses</h2>
                    <Link href="/add-expense" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Add Expense
                    </Link>
                </div>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Description</th>
                            <th className="p-2">৳</th>
                            <th className="p-2">Category</th>
                            <th className="p-2">Date</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((e) => (
                            <tr key={e.id} className="text-center border-t">
                                <td className="p-2">{e.description}</td>
                                <td className="p-2">{e.amount}</td>
                                <td className="p-2">{e.category}</td>
                                <td className="p-2">{e.date.split('T')[0]}</td>
                                <td className="p-2">
                                    <Link href={`/edit-expense/${e.id}`} className="text-blue-600 mr-2">
                                        Edit
                                    </Link>
                                    <button onClick={() => deleteExpense(e.id)} className="text-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
