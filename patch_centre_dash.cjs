const fs = require('fs');
let code = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

if (!code.includes('BookOpen')) {
  code = code.replace("import { ArrowLeft, LogOut, Calendar, Clock, MapPin, Users, Settings, Filter, ShieldCheck, Download, Search, FileText, CheckCircle, Bell, X, Headset, Trash2, CheckCircle2, RefreshCw } from 'lucide-react';", "import { ArrowLeft, LogOut, Calendar, Clock, MapPin, Users, Settings, Filter, ShieldCheck, Download, Search, FileText, CheckCircle, Bell, X, Headset, Trash2, CheckCircle2, RefreshCw, BookOpen } from 'lucide-react';");
  
  const targetCode = `{appSettings.odModuleEnabled !== false && (<button`;
  const insertion = `<button 
          onClick={() => navigate(\`/centre/\${centerId}/attendance-guide\`)}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-lg shadow-sm transition-all text-sm uppercase tracking-wider mb-6 flex justify-center items-center gap-2"
        >
          <BookOpen size={18} /> Attendance Guide / Rules
        </button>\n        `;
        
  code = code.replace(targetCode, insertion + targetCode);
  fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', code);
}
