import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function GlobalWelcomeScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenWelcomeScreen');
    if (!hasSeen) {
      setShow(true);
      sessionStorage.setItem('hasSeenWelcomeScreen', 'true');
      
      const timer = setTimeout(() => {
        setShow(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-blue-700 text-white p-6 font-sans"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center max-w-md w-full bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-2xl text-center"
          >
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-xl overflow-hidden">
              <img src="/logo.svg" alt="Yashi Skills Logo" className="w-20 h-20 object-contain drop-shadow-md" />
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
              🙏💐 Welcome to All Team Members 💐🙏
            </h1>
            
            <h2 className="text-lg md:text-xl font-bold text-blue-200 mb-1">
              Yashi Skills Project Pvt. Ltd.
            </h2>
            <p className="text-sm text-blue-100 font-medium mb-6 uppercase tracking-wider">
              Patna, Bihar
            </p>
            
            <div className="bg-white/10 p-5 rounded-2xl border border-white/10 italic text-sm md:text-base mb-8 shadow-inner">
              "Welcome to the official Staff Attendance Management System.<br/>
              Have a productive and successful day."
            </div>
            
            <button
              onClick={() => setShow(false)}
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold py-3 px-10 rounded-full shadow-lg transition-all active:scale-95 uppercase tracking-wider text-sm"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
