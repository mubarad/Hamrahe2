import { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { currentUser } from "../../data/mock-data";
import {
  User,
  Shield,
  Eye,
  Bell,
  Mail,
  Globe,
  Smartphone,
  Key,
  LogOut,
  ChevronRight,
  Languages,
  CreditCard,
  HelpCircle,
  FileText,
  Trash2,
  Download,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

type SettingsSection = "account" | "privacy" | "visibility" | "communications" | "data" | "help";

interface ToggleSetting {
  label: string;
  description: string;
  enabled: boolean;
  key: string;
}

function DeleteAccountModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const [confirmText, setConfirmText] = useState("");
  const canDelete = confirmText === "DELETE";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-lg cursor-pointer transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <h3 className="text-foreground mb-1" style={{ fontWeight: 600 }}>Delete your account?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This will permanently delete your account, profile, connections, messages, and all associated data.
              <strong className="text-foreground"> This action cannot be undone.</strong>
            </p>
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-5 space-y-1.5">
              {[
                "All your connections will be removed",
                "Your posts and comments will be deleted",
                "Active job applications will be cancelled",
                "Premium subscription will not be refunded",
              ].map(item => (
                <div key={item} className="flex items-start gap-2 text-xs text-red-700">
                  <X className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mb-5">
              <p className="text-sm text-foreground mb-2">
                Type <strong>DELETE</strong> to confirm
              </p>
              <input
                value={confirmText}
                onChange={e => setConfirmText(e.target.value.toUpperCase())}
                placeholder="Type DELETE here"
                className="w-full border border-border/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" size="md" className="flex-1" onClick={onClose}>Cancel</Button>
              <button
                onClick={canDelete ? onConfirm : undefined}
                disabled={!canDelete}
                className={`flex-1 py-2 rounded-xl text-sm transition-all ${
                  canDelete
                    ? "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                    : "bg-red-100 text-red-300 cursor-not-allowed"
                }`}
              >
                Delete account
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("account");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useApp();

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    twoFactor: true,
    loginAlerts: true,
    profilePublic: true,
    showEmail: false,
    showPhone: false,
    showLastName: true,
    searchEngineVisible: true,
    emailNotifs: true,
    pushNotifs: true,
    jobAlerts: true,
    connectionReqs: true,
    endorsements: true,
    mentions: true,
    messageNotifs: true,
    darkMode: false,
    readReceipts: true,
    activeStatus: true,
    profileViewing: true,
  });

  const toggle = (key: string) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    { id: "account" as const, icon: User, label: "Account preferences" },
    { id: "privacy" as const, icon: Shield, label: "Sign in & security" },
    { id: "visibility" as const, icon: Eye, label: "Visibility" },
    { id: "communications" as const, icon: Bell, label: "Communications" },
    { id: "data" as const, icon: Download, label: "Data privacy" },
    { id: "help" as const, icon: HelpCircle, label: "Help & support" },
  ];

  const ToggleRow = ({ label, description, toggleKey }: { label: string; description: string; toggleKey: string }) => (
    <div className="flex items-center justify-between py-3.5 border-b border-border/15 last:border-0">
      <div className="flex-1 pr-4">
        <p className="text-sm text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <button onClick={() => toggle(toggleKey)} className="cursor-pointer shrink-0">
        {toggles[toggleKey] ? (
          <ToggleRight className="w-8 h-8 text-primary" />
        ) : (
          <ToggleLeft className="w-8 h-8 text-muted-foreground/40" />
        )}
      </button>
    </div>
  );

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* Left navigation */}
      <aside>
        <div className="sticky top-[76px]">
          <Card padding={false}>
            <div className="p-4 border-b border-border/20">
              <h2 className="text-foreground text-sm">Settings</h2>
            </div>
            <div className="p-2">
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-all ${
                    activeSection === s.id
                      ? "bg-primary/5 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <s.icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1 text-left">{s.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                </button>
              ))}
            </div>
            <div className="p-3 border-t border-border/20">
              <button
                onClick={() => navigate("/premium")}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-amber-600 hover:bg-amber-50 cursor-pointer transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>Premium plans</span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 cursor-pointer transition-all">
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </div>
          </Card>
        </div>
      </aside>

      {/* Content */}
      <div className="space-y-4 min-w-0">
        {activeSection === "account" && (
          <>
            <Card>
              <h3 className="text-sm text-foreground mb-4">Profile information</h3>
              <div className="space-y-4">
                {[
                  { label: "Name", value: currentUser.name },
                  { label: "Headline", value: currentUser.title },
                  { label: "Current position", value: `${currentUser.title} at ${currentUser.company}` },
                  { label: "Location", value: currentUser.location },
                  { label: "Industry", value: "Design" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-border/15 last:border-0">
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm text-foreground">{item.value}</p>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm text-foreground mb-4">Display</h3>
              <ToggleRow label="Dark mode" description="Switch to dark theme" toggleKey="darkMode" />
              <div className="flex items-center justify-between py-3.5">
                <div>
                  <p className="text-sm text-foreground">Language</p>
                  <p className="text-xs text-muted-foreground">Interface language preference</p>
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">English</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm text-foreground mb-4">Contact info</h3>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: "Email", value: "ahmad.parvizi@email.com", verified: true },
                  { icon: Smartphone, label: "Phone", value: "+98 912 *** **34", verified: true },
                  { icon: Globe, label: "Website", value: "ahmadparvizi.design", verified: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-border/15 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.verified && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      )}
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {activeSection === "privacy" && (
          <>
            <Card>
              <h3 className="text-sm text-foreground mb-4">Account access</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-border/15">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground">Email address</p>
                      <p className="text-xs text-muted-foreground">ahmad.parvizi@email.com</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Change</Button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border/15">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                      <Key className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground">Password</p>
                      <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Change</Button>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm text-foreground mb-4">Two-step verification</h3>
              <ToggleRow label="Two-factor authentication" description="Add extra security with SMS or authenticator app" toggleKey="twoFactor" />
              <ToggleRow label="Login alerts" description="Get notified when someone logs into your account" toggleKey="loginAlerts" />
            </Card>

            <Card>
              <h3 className="text-sm text-foreground mb-4">Active sessions</h3>
              <div className="space-y-3">
                {[
                  { device: "MacBook Pro — Chrome", location: "Tehran, Iran", current: true },
                  { device: "iPhone 15 — Hamrahe App", location: "Tehran, Iran", current: false },
                ].map(s => (
                  <div key={s.device} className="flex items-center justify-between py-2.5 border-b border-border/15 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">{s.device}</p>
                        <p className="text-xs text-muted-foreground">{s.location} {s.current && "· Current"}</p>
                      </div>
                    </div>
                    {!s.current && (
                      <Button variant="ghost" size="sm" className="!text-red-500">End</Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {activeSection === "visibility" && (
          <>
            <Card>
              <h3 className="text-sm text-foreground mb-4">Profile viewing options</h3>
              <ToggleRow label="Public profile" description="Allow your profile to be visible to everyone" toggleKey="profilePublic" />
              <ToggleRow label="Show email" description="Display your email on your profile" toggleKey="showEmail" />
              <ToggleRow label="Show phone number" description="Display your phone on your profile" toggleKey="showPhone" />
              <ToggleRow label="Show last name" description="Display your full last name" toggleKey="showLastName" />
              <ToggleRow label="Search engine visibility" description="Allow search engines to index your profile" toggleKey="searchEngineVisible" />
            </Card>

            <Card>
              <h3 className="text-sm text-foreground mb-4">Activity</h3>
              <ToggleRow label="Profile viewing mode" description="Show others when you view their profile" toggleKey="profileViewing" />
              <ToggleRow label="Active status" description="Show when you're online" toggleKey="activeStatus" />
              <ToggleRow label="Read receipts" description="Let others know when you've read their messages" toggleKey="readReceipts" />
            </Card>
          </>
        )}

        {activeSection === "communications" && (
          <>
            <Card>
              <h3 className="text-sm text-foreground mb-4">Notification channels</h3>
              <ToggleRow label="Email notifications" description="Receive updates via email" toggleKey="emailNotifs" />
              <ToggleRow label="Push notifications" description="Receive mobile push notifications" toggleKey="pushNotifs" />
            </Card>

            <Card>
              <h3 className="text-sm text-foreground mb-4">Notification types</h3>
              <ToggleRow label="Job alerts" description="Get notified about new job matches" toggleKey="jobAlerts" />
              <ToggleRow label="Connection requests" description="When someone wants to connect" toggleKey="connectionReqs" />
              <ToggleRow label="Endorsements" description="When someone endorses your skills" toggleKey="endorsements" />
              <ToggleRow label="Mentions" description="When someone mentions you in a post" toggleKey="mentions" />
              <ToggleRow label="Messages" description="New message notifications" toggleKey="messageNotifs" />
            </Card>
          </>
        )}

        {activeSection === "data" && (
          <>
            <Card>
              <h3 className="text-sm text-foreground mb-4">Your data</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between py-3 border-b border-border/15 cursor-pointer hover:bg-muted/20 -mx-1 px-1 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <Download className="w-4 h-4 text-muted-foreground" />
                    <div className="text-left">
                      <p className="text-sm text-foreground">Download your data</p>
                      <p className="text-xs text-muted-foreground">Get a copy of all your Hamrahe data</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="w-full flex items-center justify-between py-3 border-b border-border/15 cursor-pointer hover:bg-muted/20 -mx-1 px-1 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div className="text-left">
                      <p className="text-sm text-foreground">Privacy policy</p>
                      <p className="text-xs text-muted-foreground">Review our privacy practices</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </Card>

            <Card className="border-red-100">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm text-red-600">Delete account</h3>
                  <p className="text-xs text-muted-foreground mt-1">Permanently delete your account and all your data. This action cannot be undone.</p>
                  <Button variant="destructive" size="sm" className="mt-3" onClick={() => setShowDeleteModal(true)}>
                    <Trash2 className="w-3.5 h-3.5" /> Delete my account
                  </Button>
                </div>
              </div>
            </Card>
          </>
        )}

        {activeSection === "help" && (
          <>
            <Card>
              <h3 className="text-sm text-foreground mb-4">Help Center</h3>
              <div className="space-y-2">
                {[
                  { title: "Getting started with Hamrahe", desc: "Learn the basics of the platform" },
                  { title: "Profile optimization tips", desc: "Make your profile stand out" },
                  { title: "Job search guide", desc: "Find the right opportunities" },
                  { title: "Privacy & safety", desc: "Keep your account secure" },
                  { title: "Account troubleshooting", desc: "Fix common account issues" },
                ].map(a => (
                  <button key={a.title} className="w-full text-left flex items-center justify-between py-3 border-b border-border/15 cursor-pointer hover:bg-muted/20 -mx-1 px-1 rounded-lg transition-colors last:border-0">
                    <div>
                      <p className="text-sm text-foreground">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </button>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm text-foreground mb-3">Contact us</h3>
              <p className="text-sm text-muted-foreground">Need help? Our support team is available 24/7.</p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" size="sm"><Mail className="w-3.5 h-3.5" /> Email support</Button>
                <Button variant="outline" size="sm"><HelpCircle className="w-3.5 h-3.5" /> FAQ</Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>

    {showDeleteModal && (
      <DeleteAccountModal
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          setShowDeleteModal(false);
          toast.error("Account deleted. Redirecting...");
          setTimeout(() => {
            logout();
            navigate("/auth");
          }, 1500);
        }}
      />
    )}
    </>
  );
}
