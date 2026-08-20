import { useState } from "react";
import { Outlet } from "react-router";
import { CommandSidebar } from "./components/CommandSidebar";
import { TopCommandBar } from "./components/TopCommandBar";
import { GlobalCommandPalette } from "./components/GlobalCommandPalette";
import { SensitiveActionDialog } from "./components/SensitiveActionDialog";

export function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-row font-sans antialiased select-none">
      <CommandSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopCommandBar
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenEmergency={() => setEmergencyOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6 space-y-6 max-w-[1920px] mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <GlobalCommandPalette
        open={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      <SensitiveActionDialog
        open={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
        title="Declare Platform Emergency or SEV-1 Incident"
        impactDescription="Activates the incident response protocol, pages on-call infrastructure team, and creates a critical audit log entry."
        onConfirm={(reason, caseId) => {
          console.log("Emergency declared:", { reason, caseId });
        }}
      />
    </div>
  );
}
