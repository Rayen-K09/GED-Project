import React from 'react';
import { FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const mockData = [
  { id: 'INV-2024-001', supplier: 'Acme Corp', amount: '$1,250.00', status: 'Validated', date: 'Just now' },
  { id: 'INV-2024-002', supplier: 'Globex Inc', amount: '$4,500.00', status: 'Pending', date: '2 min ago' },
  { id: 'INV-2024-003', supplier: 'Soylent Corp', amount: '$850.50', status: 'Rejected', date: '15 min ago' },
  { id: 'INV-2024-004', supplier: 'Umbrella Corp', amount: '$12,000.00', status: 'Sent to ERP', date: '1 hour ago' },
  { id: 'INV-2024-005', supplier: 'Massive Dynamic', amount: '$3,200.00', status: 'Validated', date: '2 hours ago' },
];

export function RecentActivityTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Validated':
        return <span className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700"><CheckCircle className="w-3 h-3" /> Validated</span>;
      case 'Pending':
        return <span className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700"><Clock className="w-3 h-3" /> Pending</span>;
      case 'Rejected':
        return <span className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-700"><AlertCircle className="w-3 h-3" /> Rejected</span>;
      case 'Sent to ERP':
        return <span className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700"><FileText className="w-3 h-3" /> Sent to ERP</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-4">Document ID</th>
              <th className="px-6 py-4">Supplier</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                <td className="px-6 py-4 text-gray-600">{item.supplier}</td>
                <td className="px-6 py-4 text-gray-900 font-medium">{item.amount}</td>
                <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                <td className="px-6 py-4 text-gray-500">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
