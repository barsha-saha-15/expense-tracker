'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/components/api';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      if (!email || !password) {
        alert("email password required");
        return;
      }
      const res = await api.post("/auth/register", { email, password });
      if (res.data.success) {
        alert("Registration successful, please log in.");
        router.push("/login");
      } else {
        alert(res.data.message || "Registration failed.please try again.");
        return;
      }

    } catch (err: any) {
      console.error("Registration failed", err);
      alert("Registration failed");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        type="email"
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
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </div>
  );
}
