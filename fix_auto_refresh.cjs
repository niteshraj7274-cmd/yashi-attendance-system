const fs = require('fs');
let content = fs.readFileSync('src/components/AdminAttendanceDashboardScreen.tsx', 'utf8');

// Add import for RefreshCw or Toggle
if (!content.includes('RefreshCw')) {
  content = content.replace("from 'lucide-react';", "RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';");
}

// Add state
const stateReplacement = `  const [staffList, setStaffList] = useState<any[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(() => {
        window.location.reload();
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);
`;

content = content.replace("  const [staffList, setStaffList] = useState<any[]>([]);", stateReplacement);

// Add toggle switch
const toggleReplacement = `        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Attendance Dashboard</h1>
          <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Real-time GPS Tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">Auto Refresh</span>
          <button onClick={() => setAutoRefresh(!autoRefresh)} className="text-white hover:text-emerald-200 transition-colors">
            {autoRefresh ? <ToggleRight size={32} className="text-emerald-300" /> : <ToggleLeft size={32} className="text-emerald-500" />}
          </button>
        </div>`;

content = content.replace(`        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Attendance Dashboard</h1>
          <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Real-time GPS Tracking</p>
        </div>`, toggleReplacement);

fs.writeFileSync('src/components/AdminAttendanceDashboardScreen.tsx', content);
