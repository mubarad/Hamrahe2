import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Users, Building2 } from "lucide-react";
import { mockUserEntities, mockOrgEntities } from "../../data/adminMockData";

export function EntitiesView() {
  const { userId, organizationId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"users" | "orgs">("users");

  const selectedUser = mockUserEntities.find((u) => u.id === userId) || mockUserEntities[0];
  const selectedOrg = mockOrgEntities.find((o) => o.id === organizationId) || mockOrgEntities[0];

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">Platform Entity 360</h1>
          <p className="text-xs text-slate-400 mt-1">
            360° assessment of identity, history, risk, subscriptions, and activity logs for users and organizations
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-950 p-1 border border-slate-800 rounded-xl shrink-0">
          {(["users", "orgs"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab === "users" ? "Users" : "Organizations"}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "users" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">Users</h2>
            <div className="space-y-2">
              {mockUserEntities.map((u) => (
                <div
                  key={u.id}
                  onClick={() => navigate(`/command/entities/users/${u.id}`)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-3 ${
                    u.id === selectedUser.id
                      ? "bg-blue-600/20 border-blue-500/60"
                      : "bg-slate-950/60 border-slate-800 hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  <img src={u.avatar} alt={u.fullName} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-white truncate">{u.fullName}</p>
                    <p className="text-[10px] text-slate-400 truncate">{u.headline}</p>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                    u.accountStatus === "Active"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {u.accountStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 gap-4">
              <div className="flex items-center gap-4">
                <img src={selectedUser.avatar} alt={selectedUser.fullName} className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/30" />
                <div>
                  <h2 className="text-base font-bold text-white">{selectedUser.fullName}</h2>
                  <p className="text-xs text-slate-300">{selectedUser.headline}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">{selectedUser.email} · Joined {selectedUser.joinedDate}</p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                selectedUser.accountStatus === "Active" ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
              }`}>
                {selectedUser.accountStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { label: "Trust Score", value: `${selectedUser.trustScore}/100`, color: "text-emerald-400" },
                { label: "Risk Score", value: `${selectedUser.riskScore}/100`, color: "text-amber-400" },
                { label: "Reports Received", value: selectedUser.reportsReceived, color: "text-slate-200" },
                { label: "Strikes", value: selectedUser.strikeCount, color: "text-red-400" },
              ].map(({ label, value, color }) => (
                <div key={label} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 block">{label}</span>
                  <p className={`text-lg font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { label: "Verification", value: selectedUser.verificationStatus },
                { label: "Account Type", value: selectedUser.accountType },
                { label: "Country", value: selectedUser.country },
                { label: "Active Cases", value: `${selectedUser.activeCasesCount} open` },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <span className="text-slate-400">{label}</span>
                  <span className="font-semibold text-slate-200">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "orgs" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-800">Organizations</h2>
            <div className="space-y-2">
              {mockOrgEntities.map((o) => (
                <div
                  key={o.id}
                  onClick={() => navigate(`/command/entities/organizations/${o.id}`)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center gap-3 ${
                    o.id === selectedOrg.id
                      ? "bg-blue-600/20 border-blue-500/60"
                      : "bg-slate-950/60 border-slate-800 hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  <img src={o.logo} alt={o.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-white truncate">{o.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{o.industry}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 gap-4">
              <div className="flex items-center gap-4">
                <img src={selectedOrg.logo} alt={selectedOrg.name} className="w-16 h-16 rounded-xl object-cover ring-2 ring-blue-500/30" />
                <div>
                  <h2 className="text-base font-bold text-white">{selectedOrg.name}</h2>
                  <p className="text-xs text-slate-300">{selectedOrg.legalName}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">ID: {selectedOrg.id}</p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                selectedOrg.status === "Active" ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"
              }`}>
                {selectedOrg.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { label: "Trust Score", value: `${selectedOrg.trustScore}/100`, color: "text-emerald-400" },
                { label: "Risk Score", value: `${selectedOrg.riskScore}/100`, color: "text-amber-400" },
                { label: "Open Jobs", value: selectedOrg.openJobsCount, color: "text-blue-400" },
                { label: "Active Recruiters", value: selectedOrg.activeRecruiters, color: "text-slate-200" },
              ].map(({ label, value, color }) => (
                <div key={label} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 block">{label}</span>
                  <p className={`text-lg font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { label: "Verification", value: selectedOrg.verificationStatus },
                { label: "Subscription Plan", value: selectedOrg.subscriptionPlan },
                { label: "Industry", value: selectedOrg.industry },
                { label: "MRR", value: selectedOrg.mrr },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <span className="text-slate-400">{label}</span>
                  <span className="font-semibold text-slate-200 truncate ml-2 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
