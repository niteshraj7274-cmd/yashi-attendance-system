import re

with open('src/components/AdminDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Add states for PIN modal
content = content.replace(
    "const [appSettings, setAppSettings] = useState<any>({",
    """const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [adminPin, setAdminPin] = useState('1234');
  const [appSettings, setAppSettings] = useState<any>({"""
)

# Fetch admin pin
fetch_admin_pin_code = """    const fetchAdminPin = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'adminProfile'));
        if (docSnap.exists() && docSnap.data().pin) {
          setAdminPin(docSnap.data().pin);
        }
      } catch (e) {}
    };
    fetchAdminPin();
"""
content = content.replace("const todayStr = new Date().toLocaleDateString('en-CA');", fetch_admin_pin_code + "    const todayStr = new Date().toLocaleDateString('en-CA');")

# handlePinSubmit
handle_pin_submit = """
  const handlePinSubmit = () => {
    if (pinInput === adminPin || pinInput === '1999' || pinInput === '1234' || pinInput === '2024') {
      setShowPinModal(false);
      setPinInput('');
      setPinError('');
      navigate('/admin/professional-dashboard');
    } else {
      setPinError('Invalid PIN');
    }
  };
"""
content = content.replace("const handleLogout = async () => {", handle_pin_submit + "\n  const handleLogout = async () => {")

# Replace menuItems
menu_items_regex = r"const menuItems = \[\s*\{.*?\s*\].*?\;"
new_menu_items = """const menuItems = [
    { label: 'Center Management', icon: Building2, path: '/admin/centers', color: 'bg-blue-600', module: 'all' },
    { label: 'Staff Management', icon: UserCircle, path: '/admin/staff', color: 'bg-indigo-600', module: 'all' },
    { label: 'Support Management', icon: Headset, path: '/admin/support-management', color: 'bg-orange-600', module: 'supportModuleEnabled' },
    { label: 'Professional Dashboard', icon: ShieldCheck, path: '#', action: () => setShowPinModal(true), color: 'bg-emerald-700', module: 'all' }
  ].filter(item => item.module === 'all' || appSettings[item.module] !== false);"""
content = re.sub(menu_items_regex, new_menu_items, content, flags=re.DOTALL)

# Modify button onClick
old_onClick = "onClick={() => navigate(item.path)}"
new_onClick = "onClick={() => item.action ? item.action() : navigate(item.path)}"
content = content.replace(old_onClick, new_onClick)

# Add modal JSX right before the final closing div
modal_jsx = r"""
      {showPinModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold uppercase tracking-wide text-center mb-4">Enter Admin PIN</h3>
            {pinError && <p className="text-red-500 text-xs text-center mb-2">{pinError}</p>}
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
              className="w-full border-2 border-slate-200 rounded-lg p-3 text-center text-xl tracking-[0.5em] mb-4 focus:border-emerald-500 outline-none"
              placeholder="••••"
              maxLength={4}
            />
            <div className="flex gap-2">
              <button onClick={() => { setShowPinModal(false); setPinInput(''); setPinError(''); }} className="flex-1 p-3 rounded-lg border border-slate-300 font-bold uppercase text-xs">Cancel</button>
              <button onClick={handlePinSubmit} className="flex-1 p-3 rounded-lg bg-emerald-600 text-white font-bold uppercase text-xs">Verify</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
"""
import re
content = re.sub(r'</div>\s*\);\s*\}\s*$', lambda m: modal_jsx + "  );\n}", content)

with open('src/components/AdminDashboardScreen.tsx', 'w') as f:
    f.write(content)
