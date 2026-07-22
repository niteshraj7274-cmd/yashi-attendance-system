import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, Edit2, Eye, EyeOff, MoveUp, MoveDown } from 'lucide-react';
import { doc, getDoc, setDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export default function AdminDmrSettingsScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    loadSettings();
  }, []);


  const initReportDefinition = async () => {
    try {
      const q = query(collection(db, 'report_definitions'), where('code', '==', 'DMR-001'));
      const snap = await getDocs(q);
      if (snap.empty) {
        await addDoc(collection(db, 'report_definitions'), {
          code: 'DMR-001',
          name: 'Daily Mobilization Report (DMR)',
          description: 'Daily Mobilization Report for Centers',
          fields: [],
          status: 'Active',
          createdAt: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error('Error initializing report definition', err);
    }
  };

  const loadSettings = async () => {
    try {
      await initReportDefinition();
      const docRef = doc(db, 'dmr_settings', 'config');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCategories(docSnap.data().categories || []);
      } else {
        // Initialize default
        const defaultCats = [
          {
            id: uuidv4(),
            name: "Mobilization Status",
            visible: true,
            order: 1,
            options: [
              { id: uuidv4(), name: "Allotment", visible: true, order: 1, autoFetch: false },
              { id: uuidv4(), name: "DRCC Verification", visible: true, order: 2, autoFetch: false },
              { id: uuidv4(), name: "Line-up", visible: true, order: 3, autoFetch: false },
              { id: uuidv4(), name: "Remarks", visible: true, order: 4, autoFetch: false }
            ]
          }
        ];
        setCategories(defaultCats);
        await setDoc(docRef, { categories: defaultCats });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'dmr_settings', 'config'), { categories });
      alert("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving settings.");
    } finally {
      setSaving(false);
    }
  };

  const addCategory = () => {
    const name = prompt("Enter category name:");
    if (!name) return;
    setCategories([...categories, {
      id: uuidv4(),
      name,
      visible: true,
      order: categories.length + 1,
      options: []
    }]);
  };

  const addOption = (catId: string) => {
    const name = prompt("Enter option name:");
    if (!name) return;
    setCategories(categories.map(c => {
      if (c.id === catId) {
        return {
          ...c,
          options: [...c.options, { id: uuidv4(), name, visible: true, order: c.options.length + 1, autoFetch: false }]
        };
      }
      return c;
    }));
  };

  const toggleCategoryVisibility = (catId: string) => {
    setCategories(categories.map(c => c.id === catId ? { ...c, visible: !c.visible } : c));
  };

  const toggleOptionVisibility = (catId: string, optId: string) => {
    setCategories(categories.map(c => {
      if (c.id === catId) {
        return { ...c, options: c.options.map((o: any) => o.id === optId ? { ...o, visible: !o.visible } : o) };
      }
      return c;
    }));
  };

  const deleteCategory = (catId: string) => {
    if (window.confirm("Delete this category?")) {
      setCategories(categories.filter(c => c.id !== catId));
    }
  };

  const deleteOption = (catId: string, optId: string) => {
    if (window.confirm("Delete this option?")) {
      setCategories(categories.map(c => {
        if (c.id === catId) {
          return { ...c, options: c.options.filter((o: any) => o.id !== optId) };
        }
        return c;
      }));
    }
  };

  const renameCategory = (catId: string, oldName: string) => {
    const name = prompt("Rename category:", oldName);
    if (!name) return;
    setCategories(categories.map(c => c.id === catId ? { ...c, name } : c));
  };

  const renameOption = (catId: string, optId: string, oldName: string) => {
    const name = prompt("Rename option:", oldName);
    if (!name) return;
    setCategories(categories.map(c => {
      if (c.id === catId) {
        return { ...c, options: c.options.map((o: any) => o.id === optId ? { ...o, name } : o) };
      }
      return c;
    }));
  };


  const moveCategory = (index: number, direction: 'up' | 'down') => {
    const newCategories = [...categories];
    if (direction === 'up' && index > 0) {
      [newCategories[index - 1], newCategories[index]] = [newCategories[index], newCategories[index - 1]];
    } else if (direction === 'down' && index < newCategories.length - 1) {
      [newCategories[index + 1], newCategories[index]] = [newCategories[index], newCategories[index + 1]];
    }
    // Update order values
    newCategories.forEach((c, i) => c.order = i + 1);
    setCategories(newCategories);
  };


  const moveOption = (catId: string, index: number, direction: 'up' | 'down') => {
    setCategories(categories.map(c => {
      if (c.id === catId) {
        const newOptions = [...c.options];
        if (direction === 'up' && index > 0) {
          [newOptions[index - 1], newOptions[index]] = [newOptions[index], newOptions[index - 1]];
        } else if (direction === 'down' && index < newOptions.length - 1) {
          [newOptions[index + 1], newOptions[index]] = [newOptions[index], newOptions[index + 1]];
        }
        newOptions.forEach((o, i) => o.order = i + 1);
        return { ...c, options: newOptions };
      }
      return c;
    }));
  };

  const toggleAutoFetch = (catId: string, optId: string) => {
    setCategories(categories.map(c => {
      if (c.id === catId) {
        return { ...c, options: c.options.map((o: any) => o.id === optId ? { ...o, autoFetch: !o.autoFetch } : o) };
      }
      return c;
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      <div className="bg-teal-700 text-white h-20 flex items-center px-6 shadow-md gap-4">
        <button onClick={() => navigate('/report-management/admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">DMR Settings</h1>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-bold transition-colors">
          <Save size={16} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {loading ? (
           <div className="flex justify-center p-10"><div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold uppercase tracking-widest text-slate-700">Report Layout</h2>
              <button onClick={addCategory} className="flex items-center gap-2 bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-bold uppercase hover:bg-teal-700 transition-colors">
                <Plus size={16} /> Add Category
              </button>
            </div>

            {categories.map((cat, catIdx) => (
              <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 p-4 border-b border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-800">{cat.name}</span>
                    {!cat.visible && <span className="bg-slate-200 text-slate-500 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold">Hidden</span>}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => toggleCategoryVisibility(cat.id)} className="p-1.5 text-slate-500 hover:bg-slate-200 rounded">
                      {cat.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button onClick={() => moveCategory(catIdx, 'up')} disabled={catIdx === 0} className="p-1.5 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30">
                      <MoveUp size={16} />
                    </button>
                    <button onClick={() => moveCategory(catIdx, 'down')} disabled={catIdx === categories.length - 1} className="p-1.5 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30">
                      <MoveDown size={16} />
                    </button>
                    <button onClick={() => renameCategory(cat.id, cat.name)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => deleteCategory(cat.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 space-y-2">
                  {cat.options.map((opt: any, optIdx: number) => (
                    <div key={opt.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg group">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-700">{opt.name}</span>
                        {!opt.visible && <span className="bg-slate-200 text-slate-500 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold">Hidden</span>}
                        {opt.autoFetch && <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold">Auto-Fetch</span>}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => toggleAutoFetch(cat.id, opt.id)} className="px-2 py-1 text-xs font-bold bg-blue-50 text-blue-600 rounded hover:bg-blue-100 mr-2">
                          {opt.autoFetch ? 'Make Manual' : 'Make Auto'}
                        </button>
                        <button onClick={() => toggleOptionVisibility(cat.id, opt.id)} className="p-1.5 text-slate-500 hover:bg-slate-200 rounded">
                          {opt.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                        <button onClick={() => moveOption(cat.id, optIdx, 'up')} disabled={optIdx === 0} className="p-1.5 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30">
                          <MoveUp size={14} />
                        </button>
                        <button onClick={() => moveOption(cat.id, optIdx, 'down')} disabled={optIdx === cat.options.length - 1} className="p-1.5 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-30">
                          <MoveDown size={14} />
                        </button>
                        <button onClick={() => renameOption(cat.id, opt.id, opt.name)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => deleteOption(cat.id, opt.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => addOption(cat.id)} className="w-full mt-2 py-2 border-2 border-dashed border-slate-200 text-slate-500 text-sm font-bold uppercase tracking-widest rounded-lg hover:border-teal-400 hover:text-teal-600 transition-colors">
                    + Add Option
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
