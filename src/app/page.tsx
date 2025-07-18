'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/components/api';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', { email, password });
      router.push('/login'); // ✅ go to login after register
    } catch (err: any) {
      alert(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        className="w-full border p-2 mb-2"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full border p-2 mb-4"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white w-full py-2 mb-4"
      >
        Register
      </button>

      {/* ✅ Login Link */}
      <p className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
