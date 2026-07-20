import re

with open('src/components/AdminDeviceManagementScreen.tsx', 'r') as f:
    content = f.read()

# Add a state for activeTab
content = content.replace("  const [saving, setSaving] = useState(false);", "  const [saving, setSaving] = useState(false);\n  const [activeTab, setActiveTab] = useState<'center' | 'staff'>('staff');\n  const [staffDevices, setStaffDevices] = useState<any[]>([]);")

# In fetchDevices, fetch both
fetch_devices_old = """  const fetchDevices = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'registered_devices')); // Removed orderBy to prevent any index errors
      const snap = await getDocs(q);
      setDevices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };"""

fetch_devices_new = """  const fetchDevices = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'registered_devices'));
      const snap = await getDocs(q);
      setDevices(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const qStaff = query(collection(db, 'staff_devices'));
      const snapStaff = await getDocs(qStaff);
      setStaffDevices(snapStaff.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };"""
content = content.replace(fetch_devices_old, fetch_devices_new)

# Add handler for staff device actions
handlers_insertion = """  const removeStaffDevice = async (staffUid: string) => {
    if (!window.confirm('Remove this device binding for staff?')) return;
    try {
      const { deleteDoc } = await import('firebase/firestore');
      await deleteDoc(doc(db, 'staff_devices', staffUid));
      fetchDevices();
    } catch (err) {
      console.error(err);
      alert('Error removing device');
    }
  };
  
  const toggleStaffDeviceStatus = async (staffUid: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Blocked' : 'Active';
      await updateDoc(doc(db, 'staff_devices', staffUid), { status: newStatus });
      fetchDevices();
    } catch (err) {
      console.error(err);
    }
  };
"""
content = content.replace("  const fetchDevices = async () => {", handlers_insertion + "  const fetchDevices = async () => {")

# In JSX, add tabs and render staff devices
tabs_jsx = """      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="flex gap-4 border-b border-slate-200">
          <button onClick={() => setActiveTab('staff')} className={`py-3 px-4 font-bold border-b-2 transition-colors ${activeTab === 'staff' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Staff Devices</button>
          <button onClick={() => setActiveTab('center')} className={`py-3 px-4 font-bold border-b-2 transition-colors ${activeTab === 'center' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Center Devices</button>
        </div>
"""
content = content.replace('      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">', tabs_jsx)

# Modify filtering and rendering based on activeTab
table_render_old = """          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 border-b border-slate-200">Device Name</th>
                  <th className="p-4 border-b border-slate-200">Device ID</th>
                  <th className="p-4 border-b border-slate-200">Center</th>
                  <th className="p-4 border-b border-slate-200">Status</th>
                  <th className="p-4 border-b border-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredDevices.map((d: any) => (
                  <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800">{d.name}</td>
                    <td className="p-4 text-slate-500 font-mono text-xs">{d.deviceId}</td>
                    <td className="p-4 text-slate-600">{d.centerName || 'Unassigned'}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${d.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {d.status === 'Active' ? <CheckCircle size={12}/> : <ShieldAlert size={12}/>}
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleStatus(d.id, d.status)} className="text-slate-400 hover:text-indigo-600 transition-colors" title="Toggle Status">
                          <MonitorSmartphone size={18} />
                        </button>
                        <button onClick={() => handleDelete(d.id)} className="text-slate-400 hover:text-red-600 transition-colors" title="Remove Device">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredDevices.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">No devices found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>"""

table_render_new = """          <div className="overflow-x-auto">
            {activeTab === 'center' ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 border-b border-slate-200">Device Name</th>
                  <th className="p-4 border-b border-slate-200">Device ID</th>
                  <th className="p-4 border-b border-slate-200">Center</th>
                  <th className="p-4 border-b border-slate-200">Status</th>
                  <th className="p-4 border-b border-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredDevices.map((d: any) => (
                  <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800">{d.name}</td>
                    <td className="p-4 text-slate-500 font-mono text-xs">{d.deviceId}</td>
                    <td className="p-4 text-slate-600">{d.centerName || 'Unassigned'}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${d.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {d.status === 'Active' ? <CheckCircle size={12}/> : <ShieldAlert size={12}/>}
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleStatus(d.id, d.status)} className="text-slate-400 hover:text-indigo-600 transition-colors" title="Toggle Status">
                          <MonitorSmartphone size={18} />
                        </button>
                        <button onClick={() => handleDelete(d.id)} className="text-slate-400 hover:text-red-600 transition-colors" title="Remove Device">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredDevices.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-500">No center devices found.</td>
                  </tr>
                )}
              </tbody>
            </table>
            ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 border-b border-slate-200">Staff Info</th>
                  <th className="p-4 border-b border-slate-200">Device OS/Browser</th>
                  <th className="p-4 border-b border-slate-200">Device ID</th>
                  <th className="p-4 border-b border-slate-200">Bind Date</th>
                  <th className="p-4 border-b border-slate-200">Status</th>
                  <th className="p-4 border-b border-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {staffDevices.filter(d => !searchTerm || (d.staffName || '').toLowerCase().includes(searchTerm.toLowerCase()) || (d.staffId || '').toLowerCase().includes(searchTerm.toLowerCase())).map((d: any) => (
                  <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-800">
                       {d.staffName}
                       <span className="block text-[10px] text-slate-500 font-bold">{d.staffId}</span>
                    </td>
                    <td className="p-4 text-slate-600">
                       {d.osVersion} - {d.deviceName}
                    </td>
                    <td className="p-4 text-slate-500 font-mono text-xs">{d.deviceId}</td>
                    <td className="p-4 text-slate-600 text-xs">
                       {d.bindDate} {d.bindTime}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${d.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {d.status === 'Active' ? <CheckCircle size={12}/> : <ShieldAlert size={12}/>}
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleStaffDeviceStatus(d.id, d.status)} className="text-slate-400 hover:text-indigo-600 transition-colors" title="Toggle Status">
                          <MonitorSmartphone size={18} />
                        </button>
                        <button onClick={() => removeStaffDevice(d.id)} className="text-slate-400 hover:text-red-600 transition-colors" title="Remove Device">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {staffDevices.filter(d => !searchTerm || (d.staffName || '').toLowerCase().includes(searchTerm.toLowerCase()) || (d.staffId || '').toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">No staff devices found.</td>
                  </tr>
                )}
              </tbody>
            </table>
            )}
          </div>"""

content = content.replace(table_render_old, table_render_new)

with open('src/components/AdminDeviceManagementScreen.tsx', 'w') as f:
    f.write(content)

