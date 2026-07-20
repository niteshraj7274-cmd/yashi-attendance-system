import re

with open('src/components/AdminErrorLogsScreen.tsx', 'r') as f:
    content = f.read()

bad_clear = """  const clearLogs = async () => {
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
  };"""

good_clear = """  const clearLogs = async () => {
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
  };"""

content = content.replace(bad_clear, good_clear)

with open('src/components/AdminErrorLogsScreen.tsx', 'w') as f:
    f.write(content)

