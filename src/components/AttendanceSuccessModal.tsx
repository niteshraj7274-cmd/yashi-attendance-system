import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  details?: {
    date: string;
    time: string;
    center: string;
    staffName: string;
  };
  onOk: () => void;
  buttonText?: string;
}

export default function AttendanceSuccessModal({ isOpen, title, message, details, onOk, buttonText = "✔ OK" }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100]">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl w-full max-w-sm p-6 text-center shadow-xl"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-2 whitespace-pre-line">{title}</h2>
            
            {message && <p className="text-sm text-slate-600 mb-6 whitespace-pre-line">{message}</p>}
            
            {details && (
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-left mb-6 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Date</span>
                  <span className="text-sm text-slate-800 font-bold">{details.date}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Time</span>
                  <span className="text-sm text-slate-800 font-bold">{details.time}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Center</span>
                  <span className="text-sm text-slate-800 font-bold">{details.center}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Staff Name</span>
                  <span className="text-sm text-slate-800 font-bold">{details.staffName}</span>
                </div>
              </div>
            )}
            
            <button
              onClick={onOk}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-indigo-700 transition-colors"
            >
              {buttonText}
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
