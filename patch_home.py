import re

with open('src/components/HomeScreen.tsx', 'r') as f:
    content = f.read()

# Add X, Sparkles to imports
if 'X,' not in content:
    content = content.replace("import { Building2", "import { X, Sparkles, Building2")

# Add state and effect
state_str = """
  const [showWelcome, setShowWelcome] = useState(() => {
    return !sessionStorage.getItem('welcomeShown');
  });

  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        sessionStorage.setItem('welcomeShown', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    sessionStorage.setItem('welcomeShown', 'true');
  };
"""

if 'const [showWelcome, setShowWelcome]' not in content:
    content = content.replace("const [maintenance, setMaintenance] = useState<any>(null);", 
                              "const [maintenance, setMaintenance] = useState<any>(null);\n" + state_str)

banner_jsx = """
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="px-4 md:px-6 pt-6 z-10 shrink-0"
          >
            <div className="max-w-3xl mx-auto w-full relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-[20px] shadow-lg overflow-hidden p-[2px]">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-[20px]"></div>
              <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-[18px] p-5 md:p-6 shadow-inner flex flex-col items-center text-center">
                <button 
                  onClick={handleCloseWelcome}
                  className="absolute top-3 right-3 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full transition-colors z-20"
                >
                  <X size={16} />
                </button>
                <div className="absolute top-4 left-4 text-blue-400 opacity-50 animate-pulse">
                  <Sparkles size={24} />
                </div>
                <div className="absolute bottom-4 right-4 text-blue-400 opacity-50 animate-pulse delay-75">
                  <Sparkles size={20} />
                </div>
                
                <h2 className="text-[22px] font-bold text-slate-800 flex items-center justify-center gap-2 mb-3">
                  <span className="text-xl">🙏</span> 
                  Welcome Dear All Team Members 
                  <span className="text-xl">🙏</span>
                </h2>
                
                <div className="flex flex-col items-center justify-center gap-1 mb-4">
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Welcome to</p>
                  <h3 className="text-[20px] font-bold text-blue-900 leading-tight">
                    YASHI SKILL PROJECT PVT. LTD.
                  </h3>
                  <p className="text-[16px] font-medium text-slate-500 mt-0.5">
                    Patna, Bihar
                  </p>
                </div>

                <div className="bg-green-50 px-4 py-2 rounded-full border border-green-100">
                  <p className="text-[15px] italic font-medium text-green-700">
                    "We wish you a productive and successful day."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
"""

if 'showWelcome &&' not in content:
    content = content.replace('<div className="flex-1 p-4 md:p-6 overflow-y-auto">', banner_jsx + '\n      <div className="flex-1 p-4 md:p-6 overflow-y-auto">')


with open('src/components/HomeScreen.tsx', 'w') as f:
    f.write(content)

