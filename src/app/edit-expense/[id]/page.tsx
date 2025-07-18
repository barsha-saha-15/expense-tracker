'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/components/api';

export default function EditExpensePage() {
    const router = useRouter();
    const params = useParams();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        api
            .get(`/expenses/${params.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setTitle(res.data.title);
                setAmount(res.data.amount);
            })
            .catch(() => router.push('/login'));
    }, [params.id]);

    const handleUpdate = async () => {
        try {
            await api.put(
                `/expenses/${params.id}`,
                { title, amount },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                    },
                }
            );
            router.push('/home');
        } catch (err) {
            console.error('Update failed:', err);
            router.push('/home');
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
            <input
                className="w-full p-2 border rounded mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                className="w-full p-2 border rounded mb-4"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
            />
            <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Update
            </button>
        </div>
    );
}
