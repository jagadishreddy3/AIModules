import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-md group">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder="Filter by company or role..."
        className="block w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-800 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none dark:text-slate-100 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
