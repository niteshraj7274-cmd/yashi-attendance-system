import React, { useState, useEffect } from 'react';
import { X, Save, Settings } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminSalaryRulesModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState({
    lateDeductionType: 'percentage',
    lateDeductionValue: 50,
    halfDayDeductionType: 'percentage',
    halfDayDeductionValue: 50,
    absentDeductionType: 'percentage',
    absentDeductionValue: 100,
    leaveDeductionType: 'paid',
    odCountAsPresent: true,
    holidayWorkedCountAsPaid: true,
    weeklyOffWorkedCountAsPaid: true,
    overtimeRatePerHour: 0
  });

  useEffect(() => {
    if (isOpen) {
      const fetchRules = async () => {
        try {
          const docRef = doc(db, 'settings', 'salary_rules');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setRules(docSnap.data() as any);
          }
        } catch(e) {}
      };
      fetchRules();
    }
  }, [isOpen]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await setDoc(doc(db, 'settings', 'salary_rules'), rules);
      onClose();
    } catch(e) {}
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
          <div className="bg-indigo-700 p-4 text-white flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Settings size={20} className="text-indigo-200" />
              <h2 className="font-bold text-lg">Salary Rules & Deductions</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors"><X size={20} /></button>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50">
            {/* Late Deduction */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">Late Attendance Deduction</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Type</label>
                  <select value={rules.lateDeductionType} onChange={(e) => setRules({...rules, lateDeductionType: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none">
                    <option value="percentage">% of 1 Day Salary</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Value</label>
                  <input type="number" value={rules.lateDeductionValue} onChange={(e) => setRules({...rules, lateDeductionValue: Number(e.target.value)})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                </div>
              </div>
            </div>

            {/* Half Day Deduction */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">Half Day Deduction</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Type</label>
                  <select value={rules.halfDayDeductionType} onChange={(e) => setRules({...rules, halfDayDeductionType: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none">
                    <option value="percentage">% of 1 Day Salary</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Value</label>
                  <input type="number" value={rules.halfDayDeductionValue} onChange={(e) => setRules({...rules, halfDayDeductionValue: Number(e.target.value)})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                </div>
              </div>
            </div>

            {/* Absent Deduction */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">Absent Deduction</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Type</label>
                  <select value={rules.absentDeductionType} onChange={(e) => setRules({...rules, absentDeductionType: e.target.value})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none">
                    <option value="percentage">% of 1 Day Salary</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Value</label>
                  <input type="number" value={rules.absentDeductionValue} onChange={(e) => setRules({...rules, absentDeductionValue: Number(e.target.value)})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                </div>
              </div>
            </div>

            {/* General Rules */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wide border-b pb-2">General Rules</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">Leave Processing</span>
                  <select value={rules.leaveDeductionType} onChange={(e) => setRules({...rules, leaveDeductionType: e.target.value})} className="p-1 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none">
                    <option value="paid">Paid (No Deduction)</option>
                    <option value="unpaid">Unpaid (Deduct Salary)</option>
                  </select>
                </div>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-semibold text-slate-700">Official Duty counts as Present</span>
                  <input type="checkbox" checked={rules.odCountAsPresent} onChange={(e) => setRules({...rules, odCountAsPresent: e.target.checked})} className="w-4 h-4 text-indigo-600 rounded" />
                </label>
                
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-semibold text-slate-700">Holiday Worked counts as Double/Paid</span>
                  <input type="checkbox" checked={rules.holidayWorkedCountAsPaid} onChange={(e) => setRules({...rules, holidayWorkedCountAsPaid: e.target.checked})} className="w-4 h-4 text-indigo-600 rounded" />
                </label>

                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-semibold text-slate-700">Weekly Off Worked counts as Double/Paid</span>
                  <input type="checkbox" checked={rules.weeklyOffWorkedCountAsPaid} onChange={(e) => setRules({...rules, weeklyOffWorkedCountAsPaid: e.target.checked})} className="w-4 h-4 text-indigo-600 rounded" />
                </label>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Overtime Rate (₹ / Hour) <span className="text-[10px] font-normal">(0 to disable)</span></label>
                  <input type="number" value={rules.overtimeRatePerHour} onChange={(e) => setRules({...rules, overtimeRatePerHour: Number(e.target.value)})} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white border-t flex justify-end shrink-0">
            <button onClick={handleSave} disabled={loading} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold flex items-center gap-2 transition-colors">
              <Save size={18} />
              {loading ? 'Saving...' : 'Save Rules'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
