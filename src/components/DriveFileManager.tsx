import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import GoogleDriveAuth from './GoogleDriveAuth';
import { uploadFileToDrive, deleteDriveFile, FOLDERS } from '../utils/driveUtils';
import { ArrowLeft, Upload, Trash2, ExternalLink, Download, FileText, Search, Filter, Loader2, Replace } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DriveFileManager() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadFolder, setUploadFolder] = useState(FOLDERS[0]);

  // Determine role from local storage
  let role = 'guest';
  let userId = '';
  let userCenter = '';
  let userName = '';

  const adminSession = localStorage.getItem('userSession');
  const centreSession = localStorage.getItem('centreSession');
  const staffSession = localStorage.getItem('staffSession');

  if (adminSession) {
    const s = JSON.parse(adminSession);
    role = s.role === 'hr' ? 'hr' : 'admin';
    userId = 'admin';
  } else if (centreSession) {
    const s = JSON.parse(centreSession);
    role = 'center';
    userCenter = s.centerId;
    userId = s.centerId;
    userName = s.centerName;
  } else if (staffSession) {
    const s = JSON.parse(staffSession);
    role = 'staff';
    userId = s.uid;
    userCenter = s.centerId;
    userName = s.name || s.uid;
  }

  useEffect(() => {
    if (!isAuthenticated) return;

    let q = query(collection(db, 'drive_files'), orderBy('timestamp', 'desc'));
    
    if (role === 'center') {
      q = query(collection(db, 'drive_files'), where('center', '==', userCenter), orderBy('timestamp', 'desc'));
    } else if (role === 'staff') {
      q = query(collection(db, 'drive_files'), where('uploaderId', '==', userId), orderBy('timestamp', 'desc'));
    }

    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFiles(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated, role, userCenter, userId]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    try {
      await uploadFileToDrive(file, uploadFolder, userCenter || 'admin-center', userId || 'unknown', userName || 'Admin', (prog) => setUploadProgress(prog));
      alert('File Uploaded Successfully.');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (e.target) e.target.value = '';
    }
  };

  

  const handlePreview = async (file: any) => {
    try {
      await addDoc(collection(db, 'drive_activity_logs'), {
        action: 'preview/download',
        fileId: file.driveFileId,
        fileName: file.name,
        userId: userId,
        timestamp: serverTimestamp()
      });
    } catch(e) {}
    window.open(file.shareableLink, '_blank');
  };

  const handleDelete = async (file: any) => {
    if (!window.confirm(`Are you sure you want to delete ${file.name}?`)) return;
    try {
      await deleteDriveFile(file.driveFileId, file.id);
      alert('File deleted');
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    }
  };

  const filteredFiles = files.filter(f => {
    const matchFolder = selectedFolder === 'All' || f.folderName === selectedFolder;
    const matchSearch = (f.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchFolder && matchSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      <div className="bg-blue-900 text-white h-16 flex items-center px-4 shadow-md shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors mr-2">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold tracking-wide">Drive File Manager</h1>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest">Secure Cloud Storage</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        {!isAuthenticated ? (
          <div className="flex items-center justify-center h-full">
            <GoogleDriveAuth onAuthSuccess={() => setIsAuthenticated(true)} />
          </div>
        ) : (
          <div className="flex flex-col h-full gap-4 max-w-6xl mx-auto w-full">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center shrink-0">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <select 
                    value={selectedFolder}
                    onChange={e => setSelectedFolder(e.target.value)}
                    className="pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Folders</option>
                    {FOLDERS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <select 
                  value={uploadFolder}
                  onChange={e => setUploadFolder(e.target.value)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {FOLDERS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
                <div className="relative">
                  <input 
                    type="file" 
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <button disabled={uploading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    {uploading ? `${uploadProgress}%` : 'Upload File'}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              {loading ? (
                <div className="flex-1 flex items-center justify-center">
                  <Loader2 size={32} className="text-blue-500 animate-spin" />
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                  <FileText size={48} className="text-slate-300 mb-4" />
                  <p className="font-medium">No files found</p>
                </div>
              ) : (
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3">File Name</th>
                        <th className="px-4 py-3">Folder</th>
                        <th className="px-4 py-3">Size</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Uploader</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredFiles.map(file => (
                        <tr key={file.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-slate-800">
                            <div className="flex items-center gap-2">
                              <FileText size={16} className="text-blue-500 shrink-0" />
                              <span className="truncate max-w-[200px]" title={file.name}>{file.name || 'Unnamed File'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-600"><span className="bg-slate-100 px-2 py-1 rounded text-xs">{file.folderName}</span></td>
                          <td className="px-4 py-3 text-slate-600">{(file.fileSize / 1024 / 1024).toFixed(2)} MB</td>
                          <td className="px-4 py-3 text-slate-600">{file.date} {file.time}</td>
                          <td className="px-4 py-3 text-slate-600 truncate max-w-[150px]">{file.uploaderName}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={(e) => { e.preventDefault(); handlePreview(file); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Preview">
                                <ExternalLink size={16} />
                              </button>
                              {/* Replace would be similar to upload but updates existing doc. For now omit for brevity, user can delete and upload */}
                              {(role === 'admin' || role === 'hr' || (role === 'staff' && file.uploaderId === userId)) && (
                                <button onClick={() => handleDelete(file)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
