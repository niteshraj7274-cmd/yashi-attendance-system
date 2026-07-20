import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, Clock, MapPin, Wifi, Smartphone, CheckCircle, AlertTriangle, Info, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function CentreAttendanceGuideScreen() {
  const navigate = useNavigate();
  const { centerId } = useParams();
  const [loading, setLoading] = useState(true);
  const [guideData, setGuideData] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'attendance_guide'), (snap) => {
      if (snap.exists()) {
        setGuideData(snap.data());
      }
      setLoading(false);
    }, (err) => {
      console.error(err);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const renderRuleSection = (title: string, icon: any, rules: string[] = [], iconColor: string) => (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-4 overflow-hidden relative">
      <div className={`absolute top-0 left-0 w-1.5 h-full ${iconColor}`}></div>
      <div className="flex items-center gap-3 mb-4 pl-2">
        <div className={`p-2 rounded-lg bg-slate-50 ${iconColor.replace('bg-', 'text-')}`}>
          {icon}
        </div>
        <h2 className="font-bold text-slate-800 text-base">{title}</h2>
      </div>
      <ul className="space-y-3 pl-2">
        {rules.map((rule, idx) => (
          <li key={idx} className="flex gap-3 text-sm text-slate-600">
            <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${iconColor}`}></span>
            <span>{rule}</span>
          </li>
        ))}
        {rules.length === 0 && <p className="text-xs text-slate-400 italic">No specific rules defined.</p>}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <div className="bg-blue-900 text-white h-20 flex items-center px-6 shadow-md gap-4 shrink-0 z-10 sticky top-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase flex items-center gap-2">
             Attendance Guide
          </h1>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">Rules & Instructions</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : guideData ? (
          <div className="max-w-md mx-auto space-y-2 pb-10">
            
            {guideData.notices && guideData.notices.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-2">Important Notices</h2>
                <div className="space-y-3">
                  {guideData.notices.map((notice: any, idx: number) => (
                    <div key={idx} className="bg-amber-50 border border-amber-200 p-4 rounded-xl shadow-sm">
                      <div className="flex gap-2 items-start mb-2">
                        <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                        <h3 className="font-bold text-amber-900 text-sm">{notice.title}</h3>
                      </div>
                      <p className="text-sm text-amber-800 mb-3 pl-6">{notice.message}</p>
                      <div className="flex justify-between items-center text-[10px] font-bold text-amber-600 uppercase tracking-wider pl-6 pt-2 border-t border-amber-200/50">
                        <span className="flex items-center gap-1"><Calendar size={12}/> {notice.date}</span>
                        <span>By: {notice.publishedBy}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-2 mt-6">Attendance Process</h2>
            {renderRuleSection('How to Mark Attendance', <CheckCircle size={20} />, guideData.howToMark, 'bg-emerald-500')}
            {renderRuleSection('Timing Rules', <Clock size={20} />, guideData.timingRules, 'bg-blue-500')}
            
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-2 mt-6">Location & Device</h2>
            {renderRuleSection('Geofence Rules', <MapPin size={20} />, guideData.geofenceRules, 'bg-purple-500')}
            {renderRuleSection('GPS & Location', <MapPin size={20} />, guideData.gpsRules, 'bg-rose-500')}
            {renderRuleSection('Internet Connectivity', <Wifi size={20} />, guideData.internetRules, 'bg-cyan-500')}
            {renderRuleSection('Device Registration', <Smartphone size={20} />, guideData.deviceRules, 'bg-indigo-500')}

            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-2 mt-6">Status Codes</h2>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 mb-4 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-500"></div>
              <div className="flex items-center gap-3 mb-4 pl-2">
                <div className="p-2 rounded-lg bg-slate-50 text-slate-600">
                  <Info size={20} />
                </div>
                <h2 className="font-bold text-slate-800 text-base">Status Explanations</h2>
              </div>
              <div className="space-y-4 pl-2">
                {guideData.statusExplanation?.map((item: any, idx: number) => (
                  <div key={idx}>
                    <h3 className="text-xs font-bold text-slate-800 uppercase">{item.status}</h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
                {!guideData.statusExplanation && <p className="text-xs text-slate-400 italic">No explanations defined.</p>}
              </div>
            </div>

            {guideData.faqs && guideData.faqs.length > 0 && (
              <>
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pl-2 mt-6">Frequently Asked Questions</h2>
                {renderRuleSection('FAQs', <Info size={20} />, guideData.faqs, 'bg-amber-500')}
              </>
            )}

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-red-100 mb-4 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
              <div className="flex items-center gap-3 mb-4 pl-2">
                <div className="p-2 rounded-lg bg-red-50 text-red-600">
                  <AlertTriangle size={20} />
                </div>
                <h2 className="font-bold text-slate-800 text-base">Common Rejection Reasons</h2>
              </div>
              <ul className="space-y-2 pl-2">
                <li className="text-sm text-slate-600 flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Outside Geofence</li>
                <li className="text-sm text-slate-600 flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> GPS Disabled</li>
                <li className="text-sm text-slate-600 flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Device Not Registered</li>
                <li className="text-sm text-slate-600 flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Duplicate Attempt</li>
                <li className="text-sm text-slate-600 flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Network Error</li>
                <li className="text-sm text-slate-600 flex gap-2 items-center"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Permission Denied</li>
              </ul>
            </div>
            
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
            <p>No Guide Information Available</p>
          </div>
        )}
      </div>
    </div>
  );
}
