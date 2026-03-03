import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Edit2, Save, FileText, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { motion } from 'motion/react';

export function Validation() {
  const [zoom, setZoom] = useState(100);
  
  const [formData, setFormData] = useState({
    invoiceNumber: 'INV-2024-001',
    supplier: 'Acme Corp',
    date: '2024-02-13',
    totalAmount: '1250.00',
    taxAmount: '125.00',
    currency: 'USD',
    dueDate: '2024-03-13'
  });

  const [confidence, setConfidence] = useState(92);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Validation Queue</h2>
            <p className="text-xs text-gray-500">Document ID: #INV-2024-001 • <span className="text-orange-600 font-medium">Pending Review</span></p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Reject
          </button>
          <button className="px-4 py-2 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-medium shadow-sm shadow-green-200 transition-colors flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Validate & Push
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Document Preview Panel */}
        <div className="flex-1 bg-gray-100 border-r border-gray-200 flex flex-col relative overflow-hidden group">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-4 shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="hover:text-blue-300"><ZoomOut className="w-4 h-4" /></button>
            <span className="text-xs font-mono min-w-[3rem] text-center">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="hover:text-blue-300"><ZoomIn className="w-4 h-4" /></button>
          </div>
          
          <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-slate-200/50">
            <motion.div 
              style={{ scale: zoom / 100 }}
              className="bg-white shadow-2xl min-w-[600px] min-h-[800px] rounded-sm p-12 relative origin-top"
            >
              {/* Mock Invoice Layout */}
              <div className="flex justify-between mb-12">
                <div className="text-2xl font-bold text-gray-800">INVOICE</div>
                <div className="text-right">
                  <div className="font-bold text-xl text-blue-600">ACME CORP</div>
                  <div className="text-gray-500 text-sm mt-1">123 Business Rd, Tech City</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <div className="text-gray-500 text-xs uppercase font-bold mb-1">Bill To</div>
                  <div className="font-medium text-gray-900">Foundry Enterprises</div>
                  <div className="text-gray-600 text-sm">456 Innovation Ave</div>
                </div>
                <div className="text-right">
                  <div className="flex justify-end gap-4 mb-2">
                    <span className="text-gray-500 text-sm">Invoice #</span>
                    <span className="font-medium text-gray-900">INV-2024-001</span>
                  </div>
                  <div className="flex justify-end gap-4">
                    <span className="text-gray-500 text-sm">Date</span>
                    <span className="font-medium text-gray-900">Feb 13, 2024</span>
                  </div>
                </div>
              </div>

              <table className="w-full mb-12">
                <thead className="border-b-2 border-gray-100">
                  <tr className="text-left text-sm text-gray-500">
                    <th className="pb-4">Description</th>
                    <th className="pb-4 text-right">Qty</th>
                    <th className="pb-4 text-right">Price</th>
                    <th className="pb-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-gray-50">
                    <td className="py-4">Web Development Services</td>
                    <td className="py-4 text-right">1</td>
                    <td className="py-4 text-right">$1,250.00</td>
                    <td className="py-4 text-right font-medium">$1,250.00</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-48 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-gray-900">$1,250.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax (10%)</span>
                    <span className="font-medium text-gray-900">$125.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t-2 border-gray-100 pt-2 mt-2">
                    <span className="text-gray-900">Total</span>
                    <span className="text-blue-600">$1,375.00</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Extraction Panel */}
        <div className="w-96 bg-white overflow-y-auto shrink-0 flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] z-10">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-900">Extracted Data</h3>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                confidence > 90 ? 'bg-green-100 text-green-700' : 
                confidence > 70 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
              }`}>
                {confidence > 90 ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                {confidence}% Confidence
              </div>
            </div>
            <p className="text-xs text-gray-500">Review and edit the extracted fields before validating.</p>
          </div>

          <div className="p-6 space-y-6 flex-1">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Invoice Number</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-green-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  <CheckCircle className="w-4 h-4 text-green-500 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Supplier</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-green-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  <CheckCircle className="w-4 h-4 text-green-500 absolute right-3 top-2.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Date</label>
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-green-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Due Date</label>
                  <input 
                    type="date" 
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-yellow-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm shadow-yellow-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Currency</label>
                  <select 
                    name="currency"
                    value={formData.currency}
                    onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full px-3 py-2 bg-gray-50 border border-green-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Tax Amount</label>
                  <input 
                    type="text" 
                    name="taxAmount"
                    value={formData.taxAmount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-green-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Total Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-500 font-medium">$</span>
                  <input 
                    type="text" 
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleInputChange}
                    className="w-full pl-6 pr-3 py-2 bg-gray-50 border border-green-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                  <CheckCircle className="w-4 h-4 text-green-500 absolute right-3 top-2.5" />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
               <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Line Items</h4>
               <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
                 <div className="flex justify-between items-start mb-2">
                   <div className="flex-1">
                     <p className="text-sm font-medium text-gray-900">Web Development Services</p>
                     <p className="text-xs text-gray-500">Qty: 1</p>
                   </div>
                   <p className="text-sm font-bold text-gray-900">$1,250.00</p>
                 </div>
                 <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                   <Edit2 className="w-3 h-3" /> Edit Item
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
