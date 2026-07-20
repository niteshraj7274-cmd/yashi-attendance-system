import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TextScreen({ title, content }: { title: string, content: string }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-blue-900 text-white h-20 flex items-center px-6 shadow-md gap-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold tracking-tight uppercase">{title}</h1>
      </div>

      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 whitespace-pre-wrap text-sm text-slate-700 leading-relaxed font-medium">
          {content}
        </div>
      </div>
    </div>
  );
}
