import re

with open('src/components/AdminSettingsScreen.tsx', 'r') as f:
    content = f.read()

# Add titleTaps state
content = content.replace("const [savingSupport, setSavingSupport] = useState(false);", "const [savingSupport, setSavingSupport] = useState(false);\n  const [titleTaps, setTitleTaps] = useState(0);")

# Add handleTitleTap
handler = """
  const handleTitleTap = () => {
    const newTaps = titleTaps + 1;
    setTitleTaps(newTaps);
    if (newTaps >= 7) {
      navigate('/developer-login');
      setTitleTaps(0);
    }
    setTimeout(() => {
      setTitleTaps(0);
    }, 3000);
  };
"""
content = content.replace("useEffect(() => {", handler + "\n  useEffect(() => {")

# Add onClick to title
content = content.replace('<h1 className="text-xl font-bold tracking-tight uppercase">Settings</h1>', '<h1 className="text-xl font-bold tracking-tight uppercase" onClick={handleTitleTap}>Settings</h1>')

# Remove Web Developer Settings card
web_dev_card = """        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors"
          onClick={() => navigate('/developer-settings')}
        >
          <div className="flex flex-col">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Wrench size={18} /> Web Developer Settings
            </h2>
            <p className="text-xs text-slate-400 mt-1">Maintenance mode, AI tools, diagnostics.</p>
          </div>
          <div className="p-2 bg-slate-800 rounded text-slate-400">
            <ArrowLeft size={16} className="rotate-180" />
          </div>
        </motion.div>"""
content = content.replace(web_dev_card, "")

with open('src/components/AdminSettingsScreen.tsx', 'w') as f:
    f.write(content)
