import re

with open('src/components/HomeScreen.tsx', 'r') as f:
    content = f.read()

# Remove the header buttons
header_buttons = """        {/* Visible Developer Icon for authorized users */}
        {isAuthorized && (
          <button 
            onClick={() => navigate('/developer-settings')}
            className="absolute top-0 right-0 w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors"
          >
            <Settings size={20} className="text-emerald-400" />
          </button>
        )}
        
        {/* Hidden Developer Icon - Appears faintly after 3 taps */}
        {!isAuthorized && (
          <div 
            onClick={handleDevTap}
            className={`absolute top-0 right-0 w-16 h-16 flex items-center justify-center cursor-pointer ${tapCount >= 3 ? 'opacity-20' : 'opacity-0'}`}
          >
            <Code size={20} className="text-white" />
          </div>
        )}"""

content = content.replace(header_buttons, "")

with open('src/components/HomeScreen.tsx', 'w') as f:
    f.write(content)
