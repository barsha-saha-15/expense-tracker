'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/components/api';

export default function EditExpensePage() {
  const router = useRouter();
  const params = useParams();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    api
      .get(`/expenses/${params.id}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setDescription(res.data.description); // ✅ Correct field
        setAmount(res.data.amount);
        setCategory(res.data.category);
      })
      .catch(() => router.push('/login'));
  }, [params.id, router]);

  const handleUpdate = async () => {
    try {
      await api.put(
        `/expenses/${params.id}`,
        { description, amount, category },
        {
          headers: {
            authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      router.push('/home');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update expense.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
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
