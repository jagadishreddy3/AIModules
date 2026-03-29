import { useNavigate, useLocation } from "react-router-dom";
import { 
  PlusCircle, 
  Settings as SettingsIcon, 
  LayoutDashboard, 
  History as HistoryIcon,
  Trash2,
  ChevronRight
} from "lucide-react";
import { useHistory } from "../context/HistoryContext";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { history, clearHistory, removeEntry } = useHistory();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: SettingsIcon, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-80 h-full border-r border-slate-200/60 bg-white flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30">
      {/* Brand */}
      <div className="p-8 pb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 rotate-3">
          <HistoryIcon className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600 tracking-tight">
          TestCaseGen
        </h1>
      </div>

      <div className="px-5 mb-8">
        <button 
          onClick={() => navigate('/', { state: { reset: true } })}
          className="w-full flex items-center gap-2 px-4 py-3.5 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 transition-all shadow-md shadow-slate-200 active:scale-95 group font-medium"
        >
          <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>New Generation</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-5 custom-scrollbar">
        <div className="space-y-1 mb-8">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Menu</p>
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                location.pathname === item.path
                  ? "bg-indigo-50 text-indigo-700 font-semibold"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${location.pathname === item.path ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                <span className="text-sm">{item.label}</span>
              </div>
              {location.pathname === item.path && (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              )}
            </button>
          ))}
        </div>

        {/* History Section */}
        <div className="space-y-3 pb-8">
          <div className="flex items-center justify-between px-4 mb-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">History</p>
            {history.length > 0 && (
              <button 
                onClick={() => { if(confirm('Clear all history?')) clearHistory(); }}
                className="text-[10px] font-bold text-rose-400 hover:text-rose-600 transition-colors uppercase tracking-wider"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            {history.length === 0 ? (
              <div className="px-4 py-8 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-xs text-slate-400 font-medium">No recent generations</p>
              </div>
            ) : (
              history.map((entry) => (
                <div
                  key={entry.id}
                  className="group relative"
                >
                  <button
                    onClick={() => navigate('/', { state: { entry } })}
                    className="w-full flex flex-col gap-1 px-4 py-3.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700 truncate pr-4">{entry.title}</span>
                      <ChevronRight className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(entry.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                      <div className="w-1 h-1 rounded-full bg-slate-200" />
                      <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">{entry.provider}</span>
                    </div>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeEntry(entry.id); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-rose-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </nav>

      {/* Footer / Status */}
      <div className="p-6 border-t border-slate-100 bg-slate-50/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">System Status</p>
            <p className="text-xs font-semibold text-slate-700">All Systems Normal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
