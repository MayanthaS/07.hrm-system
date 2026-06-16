"use client";
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/app/components/ui/layout/DashboardLayout';
import { apiRequest } from '@/lib/api';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Table } from '@/app/components/ui/tabel';

export default function EmployeePage() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [form, setForm] = useState({
    employee_code: '', first_name: '', last_name: '', email: '',
    department_id: 1, position_id: 1, joining_date: '', employment_type: 'FULL_TIME', basic_salary: 3000
  });

  const fetchEmployees = () => {
    apiRequest("/employees").then(res => setEmployees(res)).catch(e => console.error(e));
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { ...form, joining_date: new Date(form.joining_date).toISOString() };
      await apiRequest("/employees", { method: "POST", body: JSON.stringify(payload) });
      fetchEmployees();
    } catch (err) { alert("Error adding employee record structural constraints"); }
  };

  return (
    <DashboardLayout>
      <h1 className="text-heading font-bold mb-4">Onboarding Processing Center</h1>
      <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input label="Code" required onChange={e => setForm({...form, employee_code: e.target.value})} />
        <Input label="First Name" required onChange={e => setForm({...form, first_name: e.target.value})} />
        <Input label="Last Name" required onChange={e => setForm({...form, last_name: e.target.value})} />
        <Input label="Email" type="email" required onChange={e => setForm({...form, email: e.target.value})} />
        <Input label="Salary" type="number" required onChange={e => setForm({...form, basic_salary: Number(e.target.value)})} />
        <Input label="Joining Date" type="date" required onChange={e => setForm({...form, joining_date: e.target.value})} />
        <Button type="submit" variant="success" className="md:col-span-3 mt-2">Finalize and Onboard</Button>
      </form>

      <Table headers={["Code", "Full Name", "Email Address", "Base Structure Status"]}>
        {employees.map(emp => (
          <tr key={emp.id} className="hover:bg-slate-50">
            <td className="p-4">{emp.employee_code}</td>
            <td className="p-4 font-medium">{emp.first_name} {emp.last_name}</td>
            <td className="p-4">{emp.email}</td>
            <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 text-caption rounded-full">{emp.status}</span></td>
          </tr>
        ))}
      </Table>
    </DashboardLayout>
  );
}