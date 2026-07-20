import re

with open('src/components/AdminErrorLogsScreen.tsx', 'r') as f:
    content = f.read()

# Add deleteDoc and doc to imports
content = content.replace("getDocs } from", "getDocs, deleteDoc, doc } from")

# Add Trash2 to lucide imports
content = content.replace("AlertOctagon }", "AlertOctagon, Trash2 }")

# Add clearLogs function
clear_logs_func = """
  const clearLogs = async () => {
    if (window.confirm('Are you sure you want to clear all error logs?')) {
      setLoading(true);
      try {
        for (const log of logs) {
          await deleteDoc(doc(db, 'error_logs', log.id));
        }
        setLogs([]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };
"""

content = content.replace("  const fetchLogs = async () => {", clear_logs_func + "\n  const fetchLogs = async () => {")

# Add Clear Logs button to header
header_btn = """        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">System Error Logs</h1>
        </div>
        {logs.length > 0 && (
          <button onClick={clearLogs} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">
            <Trash2 size={16} />
            CLEAR ALL
          </button>
        )}
"""
content = content.replace("""        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">System Error Logs</h1>
        </div>""", header_btn)

with open('src/components/AdminErrorLogsScreen.tsx', 'w') as f:
    f.write(content)
