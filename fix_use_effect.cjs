const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const effect = `
  const [fingerprintVerificationDone, setFingerprintVerificationDone] = useState(false);

  useEffect(() => {
    const verifyInitialFingerprint = async () => {
      if (!appSettings?.mandatoryFingerprint || !staffData?.uid || fingerprintVerificationDone) return;
      
      try {
        const staffRef = doc(db, 'staff', staffData.uid);
        const staffDoc = await getDoc(staffRef);
        
        if (staffDoc.exists() && !staffDoc.data().fingerprintActivated) {
           alert("Security verification is required. Please verify your fingerprint.");
           const bioAvailable = await NativeBiometric.isAvailable();
           if (bioAvailable.isAvailable) {
             try {
               await NativeBiometric.verifyIdentity({
                 reason: "Verify Fingerprint for Security Policy",
                 title: "Biometric Authentication",
                 subtitle: "Mandatory Fingerprint Security",
                 description: "Required for staff account"
               });
               
               await updateDoc(staffRef, { fingerprintActivated: true });
               setFingerprintVerificationDone(true);
               alert("Fingerprint Security Enabled Successfully.");
             } catch (error) {
               alert("Fingerprint verification failed or was cancelled.");
             }
           } else {
             alert("Biometric authentication is not available on this device.");
           }
        } else {
           setFingerprintVerificationDone(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    verifyInitialFingerprint();
  }, [appSettings?.mandatoryFingerprint, staffData?.uid, fingerprintVerificationDone]);
`;

code = code.replace(effect, '');

const targetStr = `const [showOfficialDuty, setShowOfficialDuty] = useState(false);`;
const index = code.indexOf(targetStr);

// Let's actually insert it after appSettings declaration.
const targetStr2 = `    supportModuleEnabled: true\n  });`;
const index2 = code.indexOf(targetStr2) + targetStr2.length;

if (index2 > targetStr2.length) {
    code = code.substring(0, index2) + "\n" + effect + code.substring(index2);
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
