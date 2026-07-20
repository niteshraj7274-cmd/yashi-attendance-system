import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar as CalendarIcon, Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useActiveCenters } from '../hooks/useActiveCenters';

export default function AdminSalaryHolidayScreen() {
  const navigate = useNavigate();
  const { centers } = useActiveCenters();
  
  const [holidays, setHolidays] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 1-12
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    date: '',
    type: 'paid',
    reason: '',
    centerId: 'all'
  });

  const fetchHolidays = async () => {
    try {
      const q = query(collection(db, 'salary_holidays'), orderBy('date', 'desc'));
      const snap = await getDocs(q);
      setHolidays(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const handleDateClick = (day: number) => {
    const monthStr = String(selectedMonth).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${selectedYear}-${monthStr}-${dayStr}`;
    
    setFormData({
      date: dateStr,
      type: 'paid',
      reason: '',
      centerId: 'all'
    });
    setEditingId(null);
    setShowModal(true);
  };

  const handleEdit = (holiday: any) => {
    setFormData({
      date: holiday.date,
      type: holiday.type || 'paid',
      reason: holiday.reason || '',
      centerId: holiday.centerId || 'all'
    });
    setEditingId(holiday.id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this holiday?')) {
      await deleteDoc(doc(db, 'salary_holidays', id));
      fetchHolidays();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.reason) return;
    
    const adminStr = localStorage.getItem('userSession');
    let adminName = 'Admin';
    if (adminStr) {
      try { adminName = JSON.parse(adminStr).name || 'Admin'; } catch(e){}
    }

    const centerObj = centers.find(c => c.id === formData.centerId);
    
    const dObj = new Date(formData.date);
    // fixing timezone issue for week day
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(dObj);

    const dataToSave = {
      date: formData.date,
      type: formData.type,
      reason: formData.reason,
      centerId: formData.centerId,
      centerCode: centerObj?.code || 'all',
      centerName: centerObj?.name || 'All Centers',
      day: weekday,
      createdBy: adminName,
      updatedAt: serverTimestamp()
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'salary_holidays', editingId), dataToSave);
      } else {
        await addDoc(collection(db, 'salary_holidays'), { ...dataToSave, createdAt: serverTimestamp() });
      }
      setShowModal(false);
      fetchHolidays();
    } catch (e) {
      console.error(e);
      alert('Error saving holiday');
    }
  };

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay(); // 0 = Sun
  
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const getHolidayForDay = (day: number) => {
    const monthStr = String(selectedMonth).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${selectedYear}-${monthStr}-${dayStr}`;
    return holidays.find(h => h.date === dateStr);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <div className="bg-indigo-700 text-white h-20 flex items-center px-6 shadow-md gap-4 shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Salary Holiday Calendar</h1>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Year</label>
                <select value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))} className="p-2 border border-slate-300 rounded outline-none font-bold">
                  {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Month</label>
                <select value={selectedMonth} onChange={e => setSelectedMonth(parseInt(e.target.value))} className="p-2 border border-slate-300 rounded outline-none font-bold">
                  {Array.from({length: 12}).map((_, i) => (
                    <option key={i+1} value={i+1}>{new Date(2000, i, 1).toLocaleString('default', { month: 'long' })}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button 
              onClick={() => {
                setFormData({ date: '', type: 'paid', reason: '', centerId: 'all' });
                setEditingId(null);
                setShowModal(true);
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
            >
              <Plus size={16} /> Add Holiday
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-500 uppercase">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, idx) => {
              if (day === null) return <div key={`empty-${idx}`} className="p-4 border border-transparent"></div>;
              
              const h = getHolidayForDay(day);
              let bgClass = "bg-slate-50 hover:bg-indigo-50 border-slate-200 cursor-pointer";
              if (h) {
                bgClass = h.type === 'paid' ? 'bg-emerald-100 border-emerald-300 hover:bg-emerald-200 cursor-pointer' : 'bg-rose-100 border-rose-300 hover:bg-rose-200 cursor-pointer';
              }

              return (
                <div 
                  key={day} 
                  onClick={() => handleDateClick(day)}
                  className={`p-2 min-h-[80px] rounded-lg border transition-colors flex flex-col ${bgClass}`}
                >
                  <span className="font-bold text-slate-700">{day}</span>
                  {h && (
                    <div className="mt-1 text-[9px] leading-tight font-medium text-slate-800 line-clamp-2">
                      <span className={h.type === 'paid' ? 'text-emerald-700 font-bold block' : 'text-rose-700 font-bold block'}>
                        {h.type === 'paid' ? 'Paid' : 'Non-Payable'}
                      </span>
                      {h.reason}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="flex gap-4 mt-6 text-xs font-bold text-slate-600">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-100 border border-emerald-300 rounded"></div> Paid Holiday</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-rose-100 border border-rose-300 rounded"></div> Non-Payable Holiday</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4 flex items-center gap-2">
            <CalendarIcon size={16} className="text-indigo-600" /> Holiday List
          </h2>
          {loading ? (
            <p className="text-center text-slate-500 text-sm">YASHI SKILL PROJECT is loading...</p>
          ) : holidays.length === 0 ? (
            <p className="text-center text-slate-500 text-sm py-4">No holidays recorded.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase">Date / Day</th>
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase">Type</th>
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase">Reason</th>
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase">Center</th>
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase">Created By</th>
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {holidays.map(h => (
                    <tr key={h.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-3">
                        <div className="font-bold text-slate-800 text-sm">{h.date}</div>
                        <div className="text-[10px] text-slate-500 uppercase">{h.day}</div>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${h.type === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {h.type === 'paid' ? 'Paid Holiday' : 'Non-Payable'}
                        </span>
                      </td>
                      <td className="p-3 text-sm text-slate-700">{h.reason}</td>
                      <td className="p-3 text-xs font-bold text-slate-600">{h.centerName || 'All Centers'}</td>
                      <td className="p-3">
                        <div className="text-xs text-slate-800">{h.createdBy}</div>
                        {h.createdAt && <div className="text-[10px] text-slate-500">{new Date(h.createdAt.toMillis ? h.createdAt.toMillis() : h.createdAt).toLocaleString()}</div>}
                      </td>
                      <td className="p-3 text-right flex justify-end gap-2">
                        <button onClick={() => handleEdit(h)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => handleDelete(h.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex justify-between items-center">
              <h2 className="font-bold text-indigo-900 uppercase tracking-wide">{editingId ? 'Edit Holiday' : 'Add Holiday'}</h2>
              <button onClick={() => setShowModal(false)} className="text-indigo-400 hover:text-indigo-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Date *</label>
                <input 
                  type="date" 
                  required 
                  value={formData.date} 
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Holiday Type *</label>
                <select 
                  value={formData.type} 
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:border-indigo-500"
                >
                  <option value="paid">Paid Holiday (Salary Payable)</option>
                  <option value="non-payable">Non-Payable Holiday (Attendance Allowed)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Applicable Center *</label>
                <select 
                  value={formData.centerId} 
                  onChange={e => setFormData({...formData, centerId: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:border-indigo-500 bg-white"
                >
                  <option value="all">All Centers</option>
                  {centers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Reason / Description *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Diwali, Independence Day, Local Strike..."
                  value={formData.reason} 
                  onChange={e => setFormData({...formData, reason: e.target.value})}
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:border-indigo-500"
                />
              </div>
              
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
