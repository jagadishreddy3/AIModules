import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden selection:bg-indigo-100 selection:text-indigo-900 font-sans antialiased text-slate-900 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/40 via-white to-sky-50/40">
      <Sidebar />
      <main className="flex-1 h-full overflow-hidden relative flex flex-col items-center justify-center p-6">
        {/* Subtle decorative background blur elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200/30 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-5xl h-full flex flex-col bg-white/50 backdrop-blur-3xl rounded-[2rem] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] border border-white/60 overflow-hidden z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
