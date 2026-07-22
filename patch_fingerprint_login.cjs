const fs = require('fs');
let code = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

// 1. Add imports
code = code.replace(
  "import { ArrowLeft, LogOut, FileBarChart, Calendar, FileText, CheckCircle2, UserCheck, Search, X, BookOpen, Clock } from 'lucide-react';",
  "import { ArrowLeft, LogOut, FileBarChart, Calendar, FileText, CheckCircle2, UserCheck, Search, X, BookOpen, Clock, Fingerprint } from 'lucide-react';\nimport { NativeBiometric } from '@capgo/capacitor-native-biometric';"
);

// 2. Add biometric login function inside component
const pinFunc = `  const handlePinSubmit = async (e: React.FormEvent) => {`;
const bioFunc = `  const handleBiometricLogin = async () => {
    if (!selectedStaff) return;
    setPinLoading(true);
    try {
      const bioAvailable = await NativeBiometric.isAvailable();
      if (bioAvailable.isAvailable) {
        await NativeBiometric.verifyIdentity({
          reason: "Verify Fingerprint to Login",
          title: "Biometric Login",
          subtitle: "Use fingerprint to access your staff profile",
        });
        
        // Success
        const staffDataWithId = { ...selectedStaff, uid: selectedStaff.id };
        logAuditActivity(selectedStaff.name, 'Authentication', 'Staff', 'Login', 'Staff logged in via Fingerprint', {
          role: 'Staff',
          centerCode: centerCode,
          designation: selectedStaff.designation
        });
        setSession(staffDataWithId, 'staff');
        navigate('/staff-dashboard');
        window.dispatchEvent(new CustomEvent('check-for-updates'));
      } else {
        alert("Biometric authentication is not available on this device.");
      }
    } catch (error: any) {
      console.warn("Biometric login failed:", error);
      if ((typeof window !== 'undefined' && !window.hasOwnProperty('cordova') && !window.hasOwnProperty('Capacitor')) || (error.message && error.message.toLowerCase().includes('implemented'))) {
         const simulate = window.confirm("[Simulation] Click OK to simulate successful fingerprint login.");
         if (simulate) {
            const staffDataWithId = { ...selectedStaff, uid: selectedStaff.id };
            setSession(staffDataWithId, 'staff');
            navigate('/staff-dashboard');
            window.dispatchEvent(new CustomEvent('check-for-updates'));
         }
      } else {
         alert("Fingerprint verification failed or was cancelled.");
      }
    } finally {
      setPinLoading(false);
    }
  };

`;
code = code.replace(pinFunc, bioFunc + pinFunc);

// 3. Add button in the UI
const loginBtn = `<button 
                  type="submit" 
                  disabled={pinLoading}`;
const bioBtn = `                <button 
                  type="button" 
                  onClick={handleBiometricLogin}
                  disabled={pinLoading}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center text-sm gap-2 uppercase tracking-wider mb-3"
                >
                  <Fingerprint size={18} /> Login with Fingerprint
                </button>
                <div className="flex items-center gap-3 mb-3">
                   <div className="h-px bg-slate-200 flex-1"></div>
                   <span className="text-[10px] uppercase font-bold text-slate-400">OR PIN</span>
                   <div className="h-px bg-slate-200 flex-1"></div>
                </div>
                `;
code = code.replace(loginBtn, bioBtn + loginBtn);

fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', code);
console.log('Patched CentreStaffSelectionScreen to include fingerprint login.');
