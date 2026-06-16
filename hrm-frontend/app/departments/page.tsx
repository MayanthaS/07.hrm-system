"use client";

import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/app/components/ui/layout/DashboardLayout';
// import { apiRequest } from '@/lib/api';
import { Button } from '@/app/components/ui/Button';
import { Input } from '@/app/components/ui/Input';
import { Table } from '@/app/components/ui/tabel';
// import { Modal } from '@/app/components/ui/Modal';
// import { StatusBadge } from '@/components/ui/StatusBadge';

interface Department {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Form State
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  const fetchDepartments = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiRequest('/departments', { method: 'GET' });
      setDepartments(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load departments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitLoading(true);
    try {
      await apiRequest('/departments', {
        method: 'POST',
        body: JSON.stringify({ name, description, is_active: true }),
      });
      // Reset form and refresh data
      setName('');
      setDescription('');
      setIsModalOpen(false);
      fetchDepartments();
    } catch (err: any) {
      alert(err.message || 'Failed to create department.');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-heading font-bold text-slate-900">Departments</h1>
          <p className="text-caption text-secondary">Manage company organizational units</p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          + Add Department
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-danger text-danger p-4 rounded mb-6 text-body">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12 text-subheading text-secondary font-medium">
          Loading departments...
        </div>
      ) : departments.length === 0 ? (
        /* Empty State */
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center shadow-sm">
          <p className="text-subheading font-medium text-secondary mb-2">No departments found</p>
          <p className="text-caption text-slate-400 mb-4">Get started by creating your first company department.</p>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Create Department
          </Button>
        </div>
      ) : (
        /* Data State */
        <Table headers={["ID", "Department Name", "Description", "Status", "Created Date"]}>
          {departments.map((dept) => (
            <tr key={dept.id} className="hover:bg-slate-50 transition-colors border-b border-slate-100">
              <td className="p-4 font-semibold text-slate-600">#{dept.id}</td>
              <td className="p-4 font-medium text-slate-900">{dept.name}</td>
              <td className="p-4 text-secondary max-w-xs truncate">{dept.description || 'No description provided'}</td>
              <td className="p-4">
                <StatusBadge status={dept.is_active ? 'ACTIVE' : 'INACTIVE'} />
              </td>
              <td className="p-4 text-slate-500">
                {new Date(dept.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </Table>
      )}

      {/* Reusable Modal Component for Adding Department */}
      {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Department">
        <form onSubmit={handleCreateDepartment} className="flex flex-col gap-4">
          <Input 
            label="Department Name" 
            type="text" 
            placeholder="e.g., Human Resources, Engineering" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex flex-col gap-1 w-full">
            <label className="text-caption font-semibold text-secondary">Description</label>
            <textarea 
              className="border border-slate-300 rounded px-3 py-2 text-body focus:outline-none focus:border-primary min-h-[100px]"
              placeholder="Provide a brief summary of the department scope..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitLoading}>
              {isSubmitLoading ? 'Saving...' : 'Save Department'}
            </Button>
          </div>
        </form>
      </Modal> */}
    </DashboardLayout>
  );
}