'use client';

import { useState } from 'react';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'SUPERADMIN' | 'OPERATIONS_MANAGER' | 'CATALOG_AUDITOR' | 'LOGISTICS_DISPATCHER' | 'SUPPORT_SPECIALIST';
  assignedStore?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

const initialStaff: StaffMember[] = [
  {
    id: 'staff_1',
    name: 'Shriram Gogate',
    email: 'admin@gogateproducts.com',
    phone: '+919820011223',
    role: 'SUPERADMIN',
    status: 'ACTIVE',
  },
  {
    id: 'staff_2',
    name: 'Prathamesh Kadam',
    email: 'kadam.ops@gogateproducts.com',
    phone: '+919820033445',
    role: 'LOGISTICS_DISPATCHER',
    assignedStore: 'Ratnagiri Hub & Direct Linehaul',
    status: 'ACTIVE',
  },
  {
    id: 'staff_3',
    name: 'Sneha Deshmukh',
    email: 'sneha.audit@gogateproducts.com',
    phone: '+919820055667',
    role: 'CATALOG_AUDITOR',
    status: 'ACTIVE',
  },
];

export default function StaffManagementPage() {
  const [staff] = useState<StaffMember[]>(initialStaff);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Staff Portal & RBAC Access</h2>
        <p className="text-sm text-slate-500 mt-1">
          Assign granular operational permissions to internal staff: Catalog Auditors, Logistics Dispatchers, and Customer Support Specialists.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
            <tr>
              <th className="py-3 px-5">Staff Name & Contact</th>
              <th className="py-3 px-5">Role Permission</th>
              <th className="py-3 px-5">Scope / Assigned Hub</th>
              <th className="py-3 px-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {staff.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50/80 transition">
                <td className="py-4 px-5">
                  <p className="font-bold text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.email} • {member.phone}</p>
                </td>
                <td className="py-4 px-5">
                  <span className="inline-flex px-2.5 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                    {member.role.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="py-4 px-5">
                  <span className="text-xs text-slate-600">{member.assignedStore || 'All Ecosystem Stores'}</span>
                </td>
                <td className="py-4 px-5">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {member.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
