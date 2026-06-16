"use client";
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/app/components/ui/layout/DashboardLayout';
// import { apiRequest } from '@/lib/api';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);

  // useEffect(() => {
  //   apiRequest("/dashboard/summary")
  //     .then(data => setMetrics(data))
  //     .catch(err => console.error(err));
  // }, []);

  // if (!metrics) return <div className="p-8 text-center text-subheading">Loading System Dashboard State...</div>;

  return (
    <DashboardLayout>
      <h1 className="text-heading font-bold mb-6">HRM System Metrics</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 text-black">
          <div className="text-caption font-bold text-secondary uppercase">Total Employees</div>
          {/* <div className="text-heading font-black text-primary mt-2">{metrics.total_employees}</div> */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 text-black">
          <div className="text-caption font-bold text-secondary uppercase">Active Units / Depts</div>
          {/* <div className="text-heading font-black text-success mt-2">{metrics.total_departments}</div> */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 text-black">
          <div className="text-caption font-bold text-secondary uppercase">Disbursed Payroll Totals</div>
          {/* <div className="text-heading font-black text-warning mt-2">${metrics.monthly_payroll_total}</div> */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 text-black">
          <div className="text-caption font-bold text-secondary uppercase">Pending Actions</div>
          {/* <div className="text-heading font-black text-danger mt-2">{metrics.pending_payrolls}</div> */}
        </div>
      </div>
    </DashboardLayout>
  );
}