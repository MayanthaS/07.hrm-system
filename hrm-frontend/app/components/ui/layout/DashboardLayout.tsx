"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-4 justify-between">
        <div>
          <div className="text-heading font-bold mb-8 text-primary">HRM Core</div>
          <nav className="flex flex-col gap-2">
            <button onClick={() => router.push('/dashboard')} className="text-left px-4 py-2 rounded hover:bg-slate-800 text-body">Dashboard</button>
            <button onClick={() => router.push('/departments')} className="text-left px-4 py-2 rounded hover:bg-slate-800 text-body"> Departments</button>
            <button onClick={() => router.push('/employees')} className="text-left px-4 py-2 rounded hover:bg-slate-800 text-body"> Employee Onboarding</button>
            <button onClick={() => router.push('/payroll')} className="text-left px-4 py-2 rounded hover:bg-slate-800 text-body"> Payroll Records</button>
          </nav>
        </div>
        <button onClick={handleLogout} className="bg-danger text-white p-2 rounded text-body hover:bg-red-700">Logout</button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-surface p-8">
        {children}
      </main>
    </div>
  );
};