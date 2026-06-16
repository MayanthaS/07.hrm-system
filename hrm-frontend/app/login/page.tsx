"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { apiRequest } from '@/lib/api';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(form)
      });
      localStorage.setItem("token", res.access_token);
      router.push("/dashboard");
    } catch (error) {
      setError(error.message || "Failed Authentication Setup");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96 flex flex-col gap-4">
        <h2 className="text-heading font-bold text-center text-primary">Sign In</h2>
        {error && <p className="text-danger text-caption">{error}</p>}
        <Input label="Email Address" type="email" required onChange={e => setForm({...form, email: e.target.value})} />
        <Input label="Password" type="password" required onChange={e => setForm({...form, password: e.target.value})} />
        <Button type="submit" variant="primary" className="mt-2">Log In</Button>
        <p className="text-caption text-center text-secondary cursor-pointer" onClick={() => router.push('/register')}>
          Need an account? Register
        </p>
      </form>
    </div>
  );
}