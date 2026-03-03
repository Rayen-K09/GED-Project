import React from 'react';
import { FileText, CheckCircle, AlertCircle, Clock, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

const mockDocuments = [
  { id: 'DOC-2024-001', name: 'Invoice_ACME_Feb24.pdf', supplier: 'Acme Corp', amount: '$1,250.00', status: 'Validated', date: 'Feb 13, 2024' },
  { id: 'DOC-2024-002', name: 'PO_Globex_Jan24.pdf', supplier: 'Globex Inc', amount: '$4,500.00', status: 'Pending', date: 'Feb 12, 2024' },
  { id: 'DOC-2024-003', name: 'Receipt_Soylent_Q1.jpg', supplier: 'Soylent Corp', amount: '$850.50', status: 'Rejected', date: 'Feb 12, 2024' },
  { id: 'DOC-2024-004', name: 'Contract_Umbrella_2024.pdf', supplier: 'Umbrella Corp', amount: '$12,000.00', status: 'Sent to ERP', date: 'Feb 11, 2024' },
  { id: 'DOC-2024-005', name: 'Invoice_Massive_Jan24.pdf', supplier: 'Massive Dynamic', amount: '$3,200.00', status: 'Validated', date: 'Feb 10, 2024' },
  { id: 'DOC-2024-006', name: 'Receipt_Hooli_Jan24.png', supplier: 'Hooli', amount: '$1,200.00', status: 'Pending', date: 'Feb 09, 2024' },
  { id: 'DOC-2024-007', name: 'PO_Initech_Q1.pdf', supplier: 'Initech', amount: '$5,400.00', status: 'Sent to ERP', date: 'Feb 08, 2024' },
  { id: 'DOC-2024-008', name: 'Invoice_Cyberdyne_Feb24.pdf', supplier: 'Cyberdyne Systems', amount: '$8,900.00', status: 'Validated', date: 'Feb 08, 2024' },
];

export function Documents() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Validated':
        return <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-100"><CheckCircle className="w-3.5 h-3.5" /> Validated</span>;
      case 'Pending':
        return <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-100"><Clock className="w-3.5 h-3.5" /> Pending</span>;
      case 'Rejected':
        return <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-100"><AlertCircle className="w-3.5 h-3.5" /> Rejected</span>;
      case 'Sent to ERP':
        return <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100"><FileText className="w-3.5 h-3.5" /> Sent to ERP</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Documents</h2>
          <p className="text-gray-500 mt-1">Manage and track all your processed documents.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg text-sm shadow-md shadow-blue-200 hover:bg-blue-700 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Add New
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 w-10">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </th>
                <th className="px-6 py-4">Document Name</th>
                <th className="px-6 py-4">Supplier</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockDocuments.map((doc) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={doc.id} 
                  className="hover:bg-gray-50/80 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{doc.supplier}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{doc.amount}</td>
                  <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                  <td className="px-6 py-4 text-gray-500">{doc.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
