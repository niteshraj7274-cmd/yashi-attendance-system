import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Calendar, MapPin } from 'lucide-react';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdminNotificationsScreen() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifs = async () => {
      const list: any[] = [];
      
      // Leave Requests
      const leaveSnap = await getDocs(query(collection(db, 'leave_requests'), orderBy('timestamp', 'desc'), limit(20)));
      leaveSnap.forEach(doc => {
        const d = doc.data();
        list.push({
          id: doc.id,
          type: 'Leave',
          title: `Leave ${d['Status'] === 'Pending Approval' ? 'Submitted' : d['Status']}`,
          desc: `${d['Staff Name']} (${d['Center Code']}) - ${d['Leave Type']}`,
          time: d.timestamp?.toMillis() || Date.now(),
          icon: Calendar,
          color: d['Status'] === 'Approved' ? 'text-emerald-600 bg-emerald-100' : d['Status'] === 'Rejected' ? 'text-red-600 bg-red-100' : 'text-amber-600 bg-amber-100'
        });
      });

      // Official Duty
      const odSnap = await getDocs(query(collection(db, 'official_duty_requests'), orderBy('timestamp', 'desc'), limit(20)));
      odSnap.forEach(doc => {
        const d = doc.data();
        list.push({
          id: doc.id,
          type: 'OD',
          title: `Official Duty ${d['Status'] === 'Pending Approval' ? 'Submitted' : d['Status']}`,
          desc: `${d['Staff Name']} (${d['Center Code']}) - ${d['Duty Type']}`,
          time: d.timestamp?.toMillis() || Date.now(),
          icon: MapPin,
          color: d['Status'] === 'Approved' ? 'text-emerald-600 bg-emerald-100' : d['Status'] === 'Rejected' ? 'text-red-600 bg-red-100' : 'text-indigo-600 bg-indigo-100'
        });
      });

      // For "Attendance Missed" it's harder without a cron job. We can mock a few or skip. Let's just sort these for now.
      list.sort((a, b) => b.time - a.time);
      setNotifications(list);
      setLoading(false);
    };

    fetchNotifs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-emerald-700 text-white p-4 shadow-md flex items-center gap-4">
        <button onClick={() => navigate('/admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-lg font-bold tracking-tight uppercase">Notifications</h1>
          <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Recent Activity</p>
        </div>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-10"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="flex flex-col gap-3">
            {notifications.length === 0 ? (
               <div className="text-center text-slate-500 text-sm mt-10">No notifications</div>
            ) : (
              notifications.map((n, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${n.color}`}>
                    <n.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800">{n.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{n.desc}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2">{new Date(n.time).toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
