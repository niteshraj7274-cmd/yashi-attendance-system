import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Phone, Mail, Ticket, HelpCircle, CheckCircle2, Paperclip, Send, XCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { motion } from 'motion/react';
import { compressImage, dataUrlToFile } from '../utils/imageCompression';

const issueOptions = [
  { id: 'login', icon: '🔐', title: 'Login Problem', solutions: ['Check User ID', 'Check Password/PIN', 'Check Internet', 'Try Again'] },
  { id: 'attendance', icon: '📍', title: 'Attendance Issue', solutions: ['Turn ON GPS', 'Turn ON Internet', 'Stay inside Center Radius', 'Refresh the App'] },
  { id: 'camera', icon: '📷', title: 'Selfie / Camera Issue', solutions: ['Allow Camera Permission', 'Close and reopen the camera', 'Check Internet', 'Refresh the App', 'Restart the phone'] },
  { id: 'gps', icon: '📡', title: 'GPS / Location Issue', solutions: ['Enable Location', 'Select High Accuracy', 'Open Google Maps once', 'Return to App'] },
  { id: 'salary', icon: '💰', title: 'Salary Issue', solutions: ['Refresh Salary', 'Check Current Month', 'Contact Center Admin'] },
  { id: 'report', icon: '📄', title: 'Report Issue', solutions: ['Refresh', 'Check Date Filter', 'Generate Again'] },
  { id: 'sync', icon: '🔄', title: 'Sync Issue', solutions: ['Check Internet', 'Press Sync', 'Wait 1 minute'] },
  { id: 'staff_account', icon: '👤', title: 'Staff Account Issue', solutions: ['Verify Staff ID', 'Contact Center Admin'] },
  { id: 'center', icon: '🏢', title: 'Center Issue', solutions: ['Check Active Center', 'Select Correct Center', 'Login Again'] },
  { id: 'internet', icon: '🌐', title: 'Internet Issue', solutions: ['Enable Mobile Data/Wi-Fi', 'Restart Network', 'Try Again'] },
  { id: 'settings', icon: '⚙️', title: 'App Settings Issue', solutions: ['Restart App', 'Contact Admin'] },
  { id: 'app_not_opening', icon: '📱', title: 'App Not Opening', solutions: ['Restart App', 'Check Internet', 'Update App'] },
  { id: 'other', icon: '❓', title: 'Other Problem', solutions: ['Restart App', 'Check Internet', 'Describe issue in ticket'] },
];

export default function SupportScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'MAIN' | 'SELECT' | 'SOLUTIONS' | 'SOLVED' | 'TICKET_FORM' | 'SUCCESS'>('MAIN');
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const supportNumber = "917070972806";
  const supportEmail = "support@yashiskillproject.com";

  const handleWhatsAppSupport = () => {
    const waMessage = "Hello YASHI SKILL PROJECT PVT. LTD. Support Team,\n\nI need technical support.\n\nPlease help.";
    window.open(`https://wa.me/${supportNumber}?text=${encodeURIComponent(waMessage)}`, '_blank');
    setStep('SELECT');
  };

  const handleIssueSelect = (issue: any) => {
    setSelectedIssue(issue);
    setStep('SOLUTIONS');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files) as File[];
      const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
      if (totalSize > 30 * 1024 * 1024) {
        alert("Maximum 30 MB allowed.");
        return;
      }
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getUserDetails = () => {
    const sessionStr = localStorage.getItem('userSession');
    const details = { name: 'Unknown', id: 'N/A', role: 'Unknown', centerName: 'N/A', centerCode: 'N/A', phone: 'N/A' };
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        details.role = session.role || session.designation || 'Unknown';
        details.name = session.name || session.coordinatorName || 'Unknown';
        details.id = session.staffId || session.uid || 'N/A';
        details.centerCode = session.centerCode || 'N/A';
        details.centerName = session.centerName || 'N/A';
        details.phone = session.phone || 'N/A';
      } catch (e) {}
    }
    return details;
  };

  const handleSubmitTicket = async () => {
    if (!description.trim()) {
      alert("Please describe your problem.");
      return;
    }
    
    setLoading(true);
    try {
      const uDetails = getUserDetails();
      const generatedTicketId = `YSP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000).toString().padStart(6, '0')}`;
      setTicketId(generatedTicketId);
      
      const fileUrls: string[] = [];
      
      for (const file of files) {
        try {
          console.log("Firebase config bucket:", storage.app.options.storageBucket);
          let finalFile = file;
          if (file.type.startsWith('image/')) {
            const compressedDataUrl = await compressImage(file, 20, 30, 0.6, 800);
            finalFile = dataUrlToFile(compressedDataUrl, file.name);
          }
          const fileRef = ref(storage, `support_attachments/${generatedTicketId}/${finalFile.name}`);
          console.log("Attempting to upload Support attachment to Storage path:", fileRef.fullPath);
          await uploadBytes(fileRef, finalFile);
          const url = await getDownloadURL(fileRef);
          console.log("Storage upload successful. URL:", url);
          fileUrls.push(url);
        } catch (e: any) {
          console.error("Storage upload failed in support ticket. Error details:", e);
          console.error("Error code:", e?.code);
          console.error("Error message:", e?.message);
          console.log("Falling back to save base64 to Firestore");
          
          if (file.size > 800 * 1024) {
             alert(`File ${file.name} is too large and Storage upload failed. Max 800KB allowed.`);
             setLoading(false);
             return;
          }
          const url = await new Promise<string>((resolve, reject) => {
             const reader = new FileReader();
             reader.onloadend = () => resolve(reader.result as string);
             reader.onerror = reject;
             reader.readAsDataURL(file);
          });
          fileUrls.push(url);
        }
      }
      
      const appVersion = "1.0.0";
      const androidVersion = /Android \d+/.exec(navigator.userAgent)?.[0] || 'Unknown';
      const now = new Date();
      
      const ticketData = {
        ticketId: generatedTicketId,
        issueCategory: selectedIssue?.title || 'General Support',
        description,
        attachments: fileUrls,
        staffName: uDetails.name,
        staffId: uDetails.id,
        role: uDetails.role,
        centerName: uDetails.centerName,
        centerCode: uDetails.centerCode,
        mobileNumber: uDetails.phone,
        appVersion,
        androidVersion,
        dateTime: now.toISOString(),
        status: 'OPEN',
        createdAt: serverTimestamp()
      };
      
      await addDoc(collection(db, 'support_tickets'), ticketData);
      
      setStep('SUCCESS');
    } catch (error) {
      console.error(error);
      alert("Failed to submit ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-amber-600 text-white h-20 flex items-center px-6 shadow-md gap-4 z-10 shrink-0">
        <button onClick={() => {
          if (step === 'MAIN') navigate(-1);
          else if (step === 'SUCCESS' || step === 'SOLVED') setStep('MAIN');
          else if (step === 'SELECT') setStep('MAIN');
          else if (step === 'SOLUTIONS') setStep('SELECT');
          else if (step === 'TICKET_FORM') setStep('SOLUTIONS');
        }} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Support & Help</h1>
          <p className="text-[10px] text-amber-200 uppercase tracking-widest mt-0.5">YASHI SKILL PROJECT PVT. LTD.</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        
        {step === 'MAIN' && (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="flex flex-col gap-4">
            
            <button 
              onClick={handleWhatsAppSupport}
              className="bg-white p-5 rounded-xl shadow-sm border border-emerald-200 flex items-center gap-4 hover:bg-emerald-50 transition-colors active:scale-[0.98]"
            >
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                <MessageCircle size={24} />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-slate-800 text-base uppercase tracking-wide">WhatsApp Support</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Interactive Self-Help & Chat</p>
              </div>
            </button>

            <a 
              href={`tel:+${supportNumber}`}
              className="bg-white p-5 rounded-xl shadow-sm border border-blue-200 flex items-center gap-4 hover:bg-blue-50 transition-colors active:scale-[0.98]"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-slate-800 text-base uppercase tracking-wide">Call Support</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">+91 7070972806</p>
              </div>
            </a>

            <a 
              href={`mailto:${supportEmail}`}
              className="bg-white p-5 rounded-xl shadow-sm border border-purple-200 flex items-center gap-4 hover:bg-purple-50 transition-colors active:scale-[0.98]"
            >
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-slate-800 text-base uppercase tracking-wide">Email Support</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{supportEmail}</p>
              </div>
            </a>

            <button 
              onClick={() => { setSelectedIssue(null); setStep('TICKET_FORM'); }}
              className="bg-white p-5 rounded-xl shadow-sm border border-amber-200 flex items-center gap-4 hover:bg-amber-50 transition-colors active:scale-[0.98]"
            >
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                <Ticket size={24} />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-slate-800 text-base uppercase tracking-wide">Raise Support Ticket</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Submit an issue directly</p>
              </div>
            </button>

            <button 
              onClick={() => alert("FAQ coming soon!")}
              className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4 hover:bg-slate-50 transition-colors active:scale-[0.98]"
            >
              <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center shrink-0">
                <HelpCircle size={24} />
              </div>
              <div className="text-left flex-1">
                <h3 className="font-bold text-slate-800 text-base uppercase tracking-wide">FAQ / Help Center</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Frequently Asked Questions</p>
              </div>
            </button>

          </motion.div>
        )}

        {step === 'SELECT' && (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="flex flex-col gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 text-center">
              <h2 className="text-base font-bold text-amber-600 uppercase tracking-wide mb-1">Interactive Support</h2>
              <p className="text-sm font-medium text-slate-700">Please select your problem.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {issueOptions.map(issue => (
                <button
                  key={issue.id}
                  onClick={() => handleIssueSelect(issue)}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center gap-2 hover:bg-amber-50 hover:border-amber-200 transition-all active:scale-[0.98]"
                >
                  <span className="text-2xl">{issue.icon}</span>
                  <span className="text-xs font-bold text-slate-700 text-center uppercase tracking-wide leading-tight">{issue.title}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'SOLUTIONS' && selectedIssue && (
          <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="flex flex-col gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center">
              <div className="text-4xl mb-3">{selectedIssue.icon}</div>
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide mb-6 border-b-2 border-amber-500 pb-2 text-center w-full">
                {selectedIssue.title.toUpperCase()}
              </h2>
              
              <div className="w-full flex flex-col gap-3 mb-8">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Possible Solutions:</p>
                {selectedIssue.solutions.map((sol: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    <span className="text-sm font-bold text-slate-700">{sol}</span>
                  </div>
                ))}
              </div>
              
              <div className="w-full bg-slate-100 h-[1px] mb-6"></div>
              
              <h3 className="text-base font-bold text-slate-800 mb-4">Did your problem get solved?</h3>
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setStep('SOLVED')}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 uppercase tracking-wide transition-colors"
                >
                  ✔ YES
                </button>
                <button 
                  onClick={() => setStep('TICKET_FORM')}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 uppercase tracking-wide transition-colors"
                >
                  ❌ NO
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'SOLVED' && (
          <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="flex flex-col items-center justify-center py-12 px-6 bg-white rounded-xl shadow-sm border border-emerald-200">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2 text-center uppercase tracking-wide">Great!</h2>
            <p className="text-sm text-slate-500 text-center font-medium leading-relaxed">
              We are happy your issue has been resolved.<br/><br/>
              Thank you for using<br/>
              <span className="font-bold text-slate-700">YASHI SKILL PROJECT PVT. LTD.</span>
            </p>
            <button 
              onClick={() => setStep('MAIN')}
              className="mt-8 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-8 rounded-lg uppercase tracking-wide transition-colors"
            >
              Back to Home
            </button>
          </motion.div>
        )}

        {step === 'TICKET_FORM' && (
          <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="flex flex-col gap-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-base font-bold text-slate-800 mb-4 uppercase tracking-wide">Please describe your problem</h2>
              
              <div className="flex flex-col gap-4">
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Type your issue details here..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none font-medium text-sm"
                />
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-2">
                    <Paperclip size={14} />
                    Attach Files
                  </label>
                  <div className="relative">
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*,application/pdf,.txt,.log"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors">
                      <p className="text-xs font-bold text-slate-500 mb-1">Click to attach Images, PDF, or Log File</p>
                      <p className="text-[10px] text-slate-400 font-medium">(Maximum 30 MB)</p>
                    </div>
                  </div>
                  
                  {files.length > 0 && (
                    <div className="flex flex-col gap-2 mt-2">
                      {files.map((f, i) => (
                        <div key={i} className="flex items-center justify-between bg-amber-50 border border-amber-100 rounded-lg p-2 px-3">
                          <span className="text-xs font-bold text-amber-900 truncate max-w-[200px]">{f.name}</span>
                          <button onClick={() => removeFile(i)} className="text-red-500 p-1 hover:bg-red-50 rounded">
                            <XCircle size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-2">
                  <p className="text-[10px] font-bold text-blue-800 uppercase tracking-wider mb-2">Automatically Included Details:</p>
                  <ul className="text-xs font-medium text-blue-700 grid grid-cols-2 gap-y-1 gap-x-2">
                    <li>• Staff Name</li>
                    <li>• Staff ID</li>
                    <li>• Role</li>
                    <li>• Center Name</li>
                    <li>• Center Code</li>
                    <li>• Mobile Number</li>
                    <li>• App Version</li>
                    <li>• Android Version</li>
                    <li>• Date & Time</li>
                  </ul>
                </div>

                <button 
                  onClick={handleSubmitTicket}
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wide transition-all shadow-md mt-2 disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <><Send size={18} /> Submit Ticket</>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'SUCCESS' && (
          <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="flex flex-col items-center justify-center py-10 px-5 bg-white rounded-xl shadow-sm border border-emerald-200">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-1 text-center">Support Request Submitted Successfully.</h2>
            
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 my-6 flex flex-col items-center">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Ticket ID</p>
              <p className="text-lg font-bold text-amber-600 mb-4">{ticketId}</p>
              
              <div className="w-full grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                <div className="flex flex-col items-center text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Ticket Status</p>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full uppercase">OPEN</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Response Time</p>
                  <span className="text-xs font-bold text-slate-700">Within Working Hours</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setStep('MAIN')}
              className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 w-full rounded-xl uppercase tracking-wide transition-colors"
            >
              Done
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
