import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';
import { openWhatsApp } from '../utils/whatsappHelper';

export default function WhatsAppButton() {
  const [whatsapp, setWhatsapp] = useState('+91 7070972806');

  useEffect(() => {
    const fetchSupport = async () => {
      try {
        const docRef = doc(db, 'settings', 'support');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.whatsapp) setWhatsapp(data.whatsapp);
        }
      } catch (error) {
        console.error("Error fetching support info:", error);
      }
    };
    fetchSupport();
  }, []);

  const getWhatsAppMessage = () => {
    const sessionStr = localStorage.getItem('userSession');
    let message = "Hello YASHI SKILL PROJECT PVT. LTD. Support Team,\n\nI need technical support.\n\nProblem:\n\nPlease help.";
    
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session.role === 'admin') {
          message = `Hello YASHI SKILL PROJECT PVT. LTD. Support Team,\n\nI am the Super Admin.\n\nI need technical support.\n\nName: ${session.name || 'Admin'}\nMobile: ${session.phone || ''}\nProblem:\n\nPlease help.`;
        } else if (session.role === 'center') {
          message = `Hello YASHI SKILL PROJECT PVT. LTD. Support Team,\n\nI am a Center User.\n\nCenter Code: ${session.centerCode || ''}\nCenter Name: ${session.centerName || ''}\nCenter Coordinator: ${session.name || session.coordinatorName || ''}\nMobile Number: ${session.phone || ''}\n\nProblem:\n\nPlease help.`;
        } else if (session.role === 'staff') {
          message = `Hello YASHI SKILL PROJECT PVT. LTD. Support Team,\n\nI am a Staff Member.\n\nStaff Name: ${session.name || ''}\nStaff ID: ${session.staffId || ''}\nAssigned Center: ${session.centerCode || ''}\nRole: ${session.designation || ''}\nMobile Number: ${session.phone || ''}\n\nProblem:\n\nPlease help.`;
        }
      } catch (e) {}
    }
    return encodeURIComponent(message);
  };

  const handleClick = () => {
    openWhatsApp(whatsapp, getWhatsAppMessage());
  };

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      onClick={handleClick}
      className="absolute bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:bg-green-600 transition-all z-[100] focus:outline-none"
    >
      <MessageCircle size={28} />
    </motion.button>
  );
}
