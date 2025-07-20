'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/components/api";
import Link from "next/link";   // <-- Import Link from next/link

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await api.post("/auth/login", { email, password });
            const token = response?.data?.data;

            if (!token) {
                alert("Login failed: No token received");
                return;
            }

            sessionStorage.setItem("token", token);
            router.push("/home");
        } catch (error: any) {
            console.log(error);//debug
            if (error.response?.data?.error) {
                alert("Login failed: " + error.response.data.error);
            } else {
                alert("Login failed: Please check your credentials.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border p-2 mb-2"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-2 mb-4"
            />
            <button onClick={handleLogin} className="bg-blue-600 text-white py-2 w-full rounded">
                Login
            </button>

            {/* <-- Register link here */}
            <p className="mt-4 text-center">
                Don't have an account?{' '}
                <Link href="/" className="text-blue-600 hover:underline">
                    Register here
                </Link>
            </p>
        </div>
    );

}
