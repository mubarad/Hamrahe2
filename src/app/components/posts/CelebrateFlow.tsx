import { useState } from "react";
import { StructuredPostData } from "../../types/post-types";
import {
  Award, Briefcase, Building2, Check, X, Bell, BellOff,
  TrendingUp, Calendar, Rocket, GraduationCap, BookOpen,
  Mic2, Trophy, Star, Globe,
} from "lucide-react";
import { toast } from "sonner";

interface CelebrateFlowProps {
  onSave: (data: StructuredPostData) => void;
  onClose: () => void;
}

const MILESTONES = [
  { id: "new_position",   label: "New Position",       icon: Briefcase,      color: "text-amber-500",   bg: "bg-amber-500/10",   border: "border-amber-500/40" },
  { id: "promotion",      label: "Promotion",          icon: TrendingUp,     color: "text-violet-500",  bg: "bg-violet-500/10",  border: "border-violet-500/40" },
  { id: "anniversary",    label: "Work Anniversary",   icon: Calendar,       color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/40" },
  { id: "founding",       label: "Started a Company",  icon: Building2,      color: "text-primary",     bg: "bg-primary/10",     border: "border-primary/40" },
  { id: "project_launch", label: "Project Launch",     icon: Rocket,         color: "text-pink-500",    bg: "bg-pink-500/10",    border: "border-pink-500/40" },
  { id: "certification",  label: "New Certification",  icon: Award,          color: "text-indigo-500",  bg: "bg-indigo-500/10",  border: "border-indigo-500/40" },
  { id: "education",      label: "Education",          icon: BookOpen,       color: "text-sky-500",     bg: "bg-sky-500/10",     border: "border-sky-500/40" },
  { id: "graduation",     label: "Graduation",         icon: GraduationCap,  color: "text-teal-500",    bg: "bg-teal-500/10",    border: "border-teal-500/40" },
  { id: "award",          label: "Award / Honor",      icon: Trophy,         color: "text-yellow-500",  bg: "bg-yellow-500/10",  border: "border-yellow-500/40" },
  { id: "publication",    label: "Publication",        icon: Globe,          color: "text-orange-500",  bg: "bg-orange-500/10",  border: "border-orange-500/40" },
  { id: "speaking",       label: "Speaking",           icon: Mic2,           color: "text-rose-500",    bg: "bg-rose-500/10",    border: "border-rose-500/40" },
  { id: "product_launch", label: "Product Launch",     icon: Star,           color: "text-cyan-500",    bg: "bg-cyan-500/10",    border: "border-cyan-500/40" },
];

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"] as const;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-foreground block mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground/50"
    />
  );
}

function DateInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground"
    />
  );
}

function SegmentedControl<T extends string>({
  options, value, onChange,
}: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer transition-all border ${
            value === o
              ? "bg-primary text-white border-primary"
              : "bg-muted/30 border-border/20 text-muted-foreground hover:bg-muted/50"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function CelebrateFlow({ onSave, onClose }: CelebrateFlowProps) {
  const [selectedMilestone, setSelectedMilestone] = useState("new_position");
  const [notifyNetwork, setNotifyNetwork] = useState(true);
  const [connectToProfile, setConnectToProfile] = useState(true);

  // --- New Position ---
  const [npTitle, setNpTitle] = useState("");
  const [npCompany, setNpCompany] = useState("");
  const [npEmployment, setNpEmployment] = useState<typeof EMPLOYMENT_TYPES[number]>("Full-time");
  const [npStartDate, setNpStartDate] = useState("");
  const [npLocation, setNpLocation] = useState("");

  // --- Promotion ---
  const [prNewTitle, setPrNewTitle] = useState("");
  const [prPrevTitle, setPrPrevTitle] = useState("");
  const [prCompany, setPrCompany] = useState("");

  // --- Work Anniversary ---
  const [anCompany, setAnCompany] = useState("");
  const [anRole, setAnRole] = useState("");
  const [anYears, setAnYears] = useState("");

  // --- Founded Company ---
  const [fcCompany, setFcCompany] = useState("");
  const [fcRole, setFcRole] = useState("");
  const [fcIndustry, setFcIndustry] = useState("");
  const [fcDate, setFcDate] = useState("");

  // --- Project Launch ---
  const [plName, setPlName] = useState("");
  const [plCompany, setPlCompany] = useState("");
  const [plUrl, setPlUrl] = useState("");
  const [plTeam, setPlTeam] = useState("");

  // --- Product Launch ---
  const [pdName, setPdName] = useState("");
  const [pdCompany, setPdCompany] = useState("");
  const [pdUrl, setPdUrl] = useState("");

  // --- Certification ---
  const [certName, setCertName] = useState("");
  const [certOrg, setCertOrg] = useState("");
  const [certDate, setCertDate] = useState("");
  const [certId, setCertId] = useState("");
  const [certUrl, setCertUrl] = useState("");

  // --- Education ---
  const [eduInst, setEduInst] = useState("");
  const [eduDegree, setEduDegree] = useState("");
  const [eduField, setEduField] = useState("");

  // --- Graduation ---
  const [gradInst, setGradInst] = useState("");
  const [gradDegree, setGradDegree] = useState("");
  const [gradField, setGradField] = useState("");
  const [gradYear, setGradYear] = useState("");

  // --- Award ---
  const [awName, setAwName] = useState("");
  const [awOrg, setAwOrg] = useState("");
  const [awDate, setAwDate] = useState("");

  // --- Publication ---
  const [pubTitle, setPubTitle] = useState("");
  const [pubPublisher, setPubPublisher] = useState("");
  const [pubUrl, setPubUrl] = useState("");

  // --- Speaking ---
  const [spEvent, setSpEvent] = useState("");
  const [spTopic, setSpTopic] = useState("");
  const [spDate, setSpDate] = useState("");

  const handleConfirm = () => {
    const base = {
      type: "milestone" as const,
      milestoneType: selectedMilestone as any,
      notifyNetworkMilestone: notifyNetwork,
    };

    let extra: Partial<StructuredPostData> = {};

    switch (selectedMilestone) {
      case "new_position":
        extra = { milestoneTitle: npTitle, companyOrOrg: npCompany, employmentKind: npEmployment as any, startDate: npStartDate, milestoneLocation: npLocation };
        break;
      case "promotion":
        extra = { milestoneTitle: prNewTitle, previousTitle: prPrevTitle, companyOrOrg: prCompany };
        break;
      case "anniversary":
        extra = { companyOrOrg: anCompany, currentRole: anRole, yearsCount: parseInt(anYears) || undefined };
        break;
      case "founding":
        extra = { companyOrOrg: fcCompany, founderRole: fcRole, foundingIndustry: fcIndustry, startDate: fcDate };
        break;
      case "project_launch":
        extra = { milestoneTitle: plName, companyOrOrg: plCompany, projectUrl: plUrl, projectTeam: plTeam };
        break;
      case "product_launch":
        extra = { milestoneTitle: pdName, companyOrOrg: pdCompany, projectUrl: pdUrl };
        break;
      case "certification":
        extra = { milestoneTitle: certName, certIssuingOrg: certOrg, certIssueDate: certDate, credentialId: certId, certUrl };
        break;
      case "education":
        extra = { eduInstitution: eduInst, eduDegree, eduField };
        break;
      case "graduation":
        extra = { eduInstitution: gradInst, eduDegree: gradDegree, eduField: gradField, graduationYear: gradYear };
        break;
      case "award":
        extra = { awardName: awName, awardOrg: awOrg, startDate: awDate };
        break;
      case "publication":
        extra = { pubTitle, pubPublisher, pubUrl };
        break;
      case "speaking":
        extra = { speakingEvent: spEvent, speakingTopic: spTopic, startDate: spDate };
        break;
    }

    onSave({ ...base, ...extra });
    toast.success("Milestone configured!");
    onClose();
  };

  const renderFields = () => {
    switch (selectedMilestone) {
      case "new_position":
        return (
          <div className="space-y-3">
            <Field label="Title / Role">
              <TextInput value={npTitle} onChange={setNpTitle} placeholder="e.g. Lead UX Designer" />
            </Field>
            <Field label="Company / Organization">
              <TextInput value={npCompany} onChange={setNpCompany} placeholder="e.g. Digikala" />
            </Field>
            <Field label="Employment Type">
              <SegmentedControl options={EMPLOYMENT_TYPES} value={npEmployment} onChange={setNpEmployment} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Start Date">
                <DateInput value={npStartDate} onChange={setNpStartDate} />
              </Field>
              <Field label="Location">
                <TextInput value={npLocation} onChange={setNpLocation} placeholder="City, Country" />
              </Field>
            </div>
          </div>
        );

      case "promotion":
        return (
          <div className="space-y-3">
            <Field label="New Title / Role">
              <TextInput value={prNewTitle} onChange={setPrNewTitle} placeholder="e.g. Senior Product Manager" />
            </Field>
            <Field label="Previous Title">
              <TextInput value={prPrevTitle} onChange={setPrPrevTitle} placeholder="e.g. Product Manager" />
            </Field>
            <Field label="Company / Organization">
              <TextInput value={prCompany} onChange={setPrCompany} placeholder="e.g. Snapp" />
            </Field>
          </div>
        );

      case "anniversary":
        return (
          <div className="space-y-3">
            <Field label="Company / Organization">
              <TextInput value={anCompany} onChange={setAnCompany} placeholder="e.g. Cafe Bazaar" />
            </Field>
            <Field label="Current Role">
              <TextInput value={anRole} onChange={setAnRole} placeholder="e.g. Engineering Manager" />
            </Field>
            <Field label="Years of Service">
              <TextInput value={anYears} onChange={setAnYears} placeholder="e.g. 5" />
            </Field>
          </div>
        );

      case "founding":
        return (
          <div className="space-y-3">
            <Field label="Company Name">
              <TextInput value={fcCompany} onChange={setFcCompany} placeholder="e.g. MyStartup Inc." />
            </Field>
            <Field label="Your Role / Title">
              <TextInput value={fcRole} onChange={setFcRole} placeholder="e.g. Co-Founder & CEO" />
            </Field>
            <Field label="Industry">
              <TextInput value={fcIndustry} onChange={setFcIndustry} placeholder="e.g. FinTech, HealthTech..." />
            </Field>
            <Field label="Founded Date">
              <DateInput value={fcDate} onChange={setFcDate} />
            </Field>
          </div>
        );

      case "project_launch":
        return (
          <div className="space-y-3">
            <Field label="Project Name">
              <TextInput value={plName} onChange={setPlName} placeholder="e.g. Redesign of Checkout Flow" />
            </Field>
            <Field label="Company / Team">
              <TextInput value={plCompany} onChange={setPlCompany} placeholder="e.g. Digikala Design Team" />
            </Field>
            <Field label="Project URL (optional)">
              <TextInput value={plUrl} onChange={setPlUrl} placeholder="https://..." />
            </Field>
            <Field label="Team Members (optional)">
              <TextInput value={plTeam} onChange={setPlTeam} placeholder="e.g. Ali, Mina, Reza" />
            </Field>
          </div>
        );

      case "product_launch":
        return (
          <div className="space-y-3">
            <Field label="Product Name">
              <TextInput value={pdName} onChange={setPdName} placeholder="e.g. Hamrahcard v2.0" />
            </Field>
            <Field label="Company / Organization">
              <TextInput value={pdCompany} onChange={setPdCompany} placeholder="e.g. Hamrah Aval" />
            </Field>
            <Field label="Product URL (optional)">
              <TextInput value={pdUrl} onChange={setPdUrl} placeholder="https://..." />
            </Field>
          </div>
        );

      case "certification":
        return (
          <div className="space-y-3">
            <Field label="Certification Name">
              <TextInput value={certName} onChange={setCertName} placeholder="e.g. AWS Solutions Architect" />
            </Field>
            <Field label="Issuing Organization">
              <TextInput value={certOrg} onChange={setCertOrg} placeholder="e.g. Amazon Web Services" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Issue Date">
                <DateInput value={certDate} onChange={setCertDate} />
              </Field>
              <Field label="Credential ID (optional)">
                <TextInput value={certId} onChange={setCertId} placeholder="ABC-12345" />
              </Field>
            </div>
            <Field label="Credential URL (optional)">
              <TextInput value={certUrl} onChange={setCertUrl} placeholder="https://..." />
            </Field>
          </div>
        );

      case "education":
        return (
          <div className="space-y-3">
            <Field label="Institution">
              <TextInput value={eduInst} onChange={setEduInst} placeholder="e.g. University of Tehran" />
            </Field>
            <Field label="Degree">
              <TextInput value={eduDegree} onChange={setEduDegree} placeholder="e.g. Bachelor of Science" />
            </Field>
            <Field label="Field of Study">
              <TextInput value={eduField} onChange={setEduField} placeholder="e.g. Computer Engineering" />
            </Field>
          </div>
        );

      case "graduation":
        return (
          <div className="space-y-3">
            <Field label="Institution">
              <TextInput value={gradInst} onChange={setGradInst} placeholder="e.g. Sharif University of Technology" />
            </Field>
            <Field label="Degree">
              <TextInput value={gradDegree} onChange={setGradDegree} placeholder="e.g. Master of Science" />
            </Field>
            <Field label="Field of Study">
              <TextInput value={gradField} onChange={setGradField} placeholder="e.g. Electrical Engineering" />
            </Field>
            <Field label="Graduation Year">
              <TextInput value={gradYear} onChange={setGradYear} placeholder="e.g. 2024" />
            </Field>
          </div>
        );

      case "award":
        return (
          <div className="space-y-3">
            <Field label="Award / Honor Name">
              <TextInput value={awName} onChange={setAwName} placeholder="e.g. Best UX Design Award" />
            </Field>
            <Field label="Issuing Organization">
              <TextInput value={awOrg} onChange={setAwOrg} placeholder="e.g. IranHR 2024" />
            </Field>
            <Field label="Date Received">
              <DateInput value={awDate} onChange={setAwDate} />
            </Field>
          </div>
        );

      case "publication":
        return (
          <div className="space-y-3">
            <Field label="Publication Title">
              <TextInput value={pubTitle} onChange={setPubTitle} placeholder="e.g. Designing for Scale" />
            </Field>
            <Field label="Publisher / Platform">
              <TextInput value={pubPublisher} onChange={setPubPublisher} placeholder="e.g. Virgool, Medium, ACM..." />
            </Field>
            <Field label="Publication URL (optional)">
              <TextInput value={pubUrl} onChange={setPubUrl} placeholder="https://..." />
            </Field>
          </div>
        );

      case "speaking":
        return (
          <div className="space-y-3">
            <Field label="Event / Conference Name">
              <TextInput value={spEvent} onChange={setSpEvent} placeholder="e.g. TEDx Tehran 2024" />
            </Field>
            <Field label="Talk Topic">
              <TextInput value={spTopic} onChange={setSpTopic} placeholder="e.g. The Future of AI in Design" />
            </Field>
            <Field label="Event Date">
              <DateInput value={spDate} onChange={setSpDate} />
            </Field>
          </div>
        );

      default:
        return null;
    }
  };

  const activeMilestone = MILESTONES.find((m) => m.id === selectedMilestone)!;
  const ActiveIcon = activeMilestone.icon;

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-foreground">Celebrate / Professional Milestone</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-4 space-y-4 overflow-y-auto pr-1 flex-1">
        {/* Milestone Type Selector */}
        <div>
          <label className="text-xs font-medium text-foreground block mb-2">Select Milestone Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {MILESTONES.map((m) => {
              const Icon = m.icon;
              const active = selectedMilestone === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMilestone(m.id)}
                  className={`p-2 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-1.5 ${
                    active
                      ? `${m.bg} ${m.border} text-foreground font-medium`
                      : "bg-muted/20 border-border/20 text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? m.color : ""}`} />
                  <span className="text-[11px] leading-tight">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider with active label */}
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${activeMilestone.bg}`}>
            <ActiveIcon className={`w-3.5 h-3.5 ${activeMilestone.color}`} />
          </div>
          <span className="text-xs font-semibold text-foreground">{activeMilestone.label} Details</span>
          <div className="flex-1 h-px bg-border/20" />
        </div>

        {/* Dynamic fields per milestone */}
        {renderFields()}

        {/* Connect to profile */}
        <div className="p-3 bg-muted/20 border border-border/20 rounded-xl space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">Update Profile Experience Record</span>
            <button
              onClick={() => setConnectToProfile(!connectToProfile)}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                connectToProfile ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground"
              }`}
            >
              {connectToProfile ? "Yes" : "Post Only"}
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground/70">
            Checks existing profile records for duplicates before adding.
          </p>
        </div>

        {/* Notify network */}
        <div className="flex items-center justify-between p-3 bg-muted/20 border border-border/20 rounded-xl">
          <div className="flex items-center gap-2">
            {notifyNetwork
              ? <Bell className="w-4 h-4 text-primary" />
              : <BellOff className="w-4 h-4 text-muted-foreground" />}
            <div>
              <p className="text-xs font-medium text-foreground">Notify Network About Milestone</p>
              <p className="text-[10px] text-muted-foreground">Generates a special milestone notification</p>
            </div>
          </div>
          <button
            onClick={() => setNotifyNetwork(!notifyNetwork)}
            className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              notifyNetwork ? "bg-primary text-white" : "bg-muted/50 text-muted-foreground"
            }`}
          >
            {notifyNetwork ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/20 mt-4">
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 rounded-xl cursor-pointer transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className={`px-4 py-1.5 text-white rounded-xl text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${activeMilestone.bg.replace("/10", "")} bg-amber-500 hover:bg-amber-600`}
        >
          <Check className="w-3.5 h-3.5" />
          Confirm Milestone
        </button>
      </div>
    </div>
  );
}
