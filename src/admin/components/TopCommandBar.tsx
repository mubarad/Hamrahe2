import { useState } from "react";
import { Search, ShieldAlert, Bell, Command, Globe, Flame, SlidersHorizontal } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

export function TopCommandBar({
  onOpenCommandPalette,
  onOpenEmergency,
}: {
  onOpenCommandPalette: () => void;
  onOpenEmergency: () => void;
}) {
  const { adminUser } = useAdminAuth();
  const [environment, setEnvironment] = useState<string>("prod");
  const [timeRange, setTimeRange] = useState<string>("today");

  return (
    <header className="h-[64px] bg-[#0f172a] text-slate-100 border-b border-slate-800 px-6 flex items-center justify-between gap-4 z-20">
      {/* Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-3 bg-slate-900/90 hover:bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-slate-400 hover:text-slate-200 transition-all flex-1 cursor-pointer"
        >
          <Search className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="flex-1 text-left">Search users, orgs, cases, IPs, logs...</span>
          <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-[10px] text-slate-400 font-mono shrink-0">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </button>

        <div className="hidden lg:flex items-center gap-1.5 bg-blue-950/60 border border-blue-800/60 text-blue-300 text-[11px] font-mono px-3 py-1.5 rounded-xl shrink-0">
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <span>command.hamrahe.com</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Environment */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs"
          >
            <option value="prod" className="bg-slate-900">Production (Live)</option>
            <option value="staging" className="bg-slate-900">Staging</option>
          </select>
        </div>

        {/* Time Range */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-transparent text-slate-200 focus:outline-none cursor-pointer text-xs"
          >
            <option value="today" className="bg-slate-900">Today (Live)</option>
            <option value="24h" className="bg-slate-900">Last 24h</option>
            <option value="7d" className="bg-slate-900">Last 7 days</option>
            <option value="30d" className="bg-slate-900">Last 30 days</option>
          </select>
        </div>

        {/* Declare Incident */}
        <button
          onClick={onOpenEmergency}
          className="flex items-center gap-1.5 bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
          title="Declare emergency or log SEV-1 incident"
        >
          <Flame className="w-4 h-4 text-red-400" />
          <span className="hidden sm:inline">Declare Incident</span>
        </button>

        {/* Notifications */}
        <button className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 relative transition-all cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
            3
          </span>
        </button>

        {/* Admin user badge */}
        <div className="flex items-center gap-2.5 pl-3 pr-2 py-1 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="relative">
            <img
              src={adminUser?.avatar}
              alt={adminUser?.name}
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-blue-500/40"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
          </div>

          <div className="hidden xl:block">
            <p className="text-xs font-bold text-slate-100 leading-none">{adminUser?.name}</p>
            <p className="text-[10px] text-blue-400 font-mono mt-0.5">
              {adminUser?.clearanceLevel} · {adminUser?.internalRoles[0]}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
