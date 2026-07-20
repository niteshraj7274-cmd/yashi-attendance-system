import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface SearchableSelectProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  label?: string;
}

export default function SearchableSelect({ options, value, onChange, placeholder = "Select...", label }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-1.5 relative" ref={dropdownRef}>
      {label && <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>}
      <input type="hidden" value={value} required />
      <div 
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between cursor-pointer focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-sm font-medium ${value ? 'text-slate-900' : 'text-slate-400'}`}>{value || placeholder}</span>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden flex flex-col max-h-60">
          <div className="p-2 border-b border-slate-100 flex items-center gap-2">
            <Search size={14} className="text-slate-400" />
            <input 
              type="text" 
              className="w-full outline-none text-sm"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onClick={e => e.stopPropagation()}
              autoFocus
            />
          </div>
          <div className="overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(opt => (
                <div 
                  key={opt}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 ${value === opt ? 'bg-emerald-100 text-emerald-800 font-bold' : 'text-slate-700'}`}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearch("");
                  }}
                >
                  {opt}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-slate-500 text-center italic">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
