// src/app/add-expense/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/components/api';
import Navbar from '@/components/Navbar';

export default function AddExpense() {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const router = useRouter();

    const handleAdd = async () => {
        try {
            await api.post('/expenses', { description, amount, category, date });
            router.push('/home'); // ✅ Correct path based on your routing
        } catch (err) {
            alert('Failed to add expense.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-md mx-auto mt-6">
                <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
                <input className="w-full border p-2 mb-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                <input className="w-full border p-2 mb-2" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
                <input className="w-full border p-2 mb-2" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
                <input className="w-full border p-2 mb-4" type="date" value={date} onChange={e => setDate(e.target.value)} />
                <button onClick={handleAdd} className="bg-blue-600 text-white w-full py-2">Add</button>
            </div>
        </div>
    );
}
