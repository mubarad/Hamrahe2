import { useState, useEffect } from "react";
import { Avatar } from "../ui/Avatar";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  currentUser, profileSkills, profileExperience, profileRecommendations, users, IMAGES,
} from "../../data/mock-data";
import {
  MapPin, Users, ChevronDown, ChevronUp, Star, Briefcase, GraduationCap,
  Award, Eye, Edit3, Share2, Download, Plus, ExternalLink, CheckCircle2, AlertCircle,
  Mail, Zap, Globe, FileText, Settings, Crown, Shield, Clock, MessageCircle,
  TrendingUp, Target, Lightbulb, Building2, ArrowRight, Check, X, Copy, Puzzle,
  Layers, BarChart3, Rocket, ArrowUpRight, Bookmark, Hash, Quote, UserPlus, MoreHorizontal,
  UserCheck, Flag, EyeOff, Link2, UserMinus, Send, Brain, Lock,
} from "lucide-react";
import {
  ASSESSMENT_CENTER_ITEMS, USER_ATTEMPTS, ASSESSMENT_CENTER_RESULTS,
} from "../../data/assessment-center-data";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { useApp } from "../../context/AppContext";
import { toast } from "sonner";

type ProfileState = "loading" | "active";
type WorkStatusType = "fulltime" | "project" | "consulting" | "hiring";
type ResumeLanguage = "en" | "fa";
type ResumeTemplate = "modern" | "classic" | "minimal";

const WORK_STATUS_LABELS: Record<WorkStatusType, { label: string; color: string; bgColor: string; icon: any }> = {
  fulltime: { label: "Open to Full-Time", color: "text-emerald-700", bgColor: "bg-emerald-50 border-emerald-200", icon: Briefcase },
  project: { label: "Open to Projects", color: "text-violet-700", bgColor: "bg-violet-50 border-violet-200", icon: Puzzle },
  consulting: { label: "Open to Consulting", color: "text-amber-700", bgColor: "bg-amber-50 border-amber-200", icon: Lightbulb },
  hiring: { label: "Hiring", color: "text-pink-700", bgColor: "bg-pink-50 border-pink-200", icon: Users },
};

const aboutStructured = {
  summary: "Passionate product designer with 7+ years of experience building user-centered digital products. I specialize in designing complex systems that feel simple and intuitive.",
  specialization: ["Product Design", "Design Systems", "E-commerce UX"],
  industries: ["E-commerce", "Ride-hailing", "App Marketplaces"],
  valueProposition: "I turn complex business problems into elegant, data-driven user experiences that move metrics.",
  collaboration: "Open to consulting, speaking opportunities, and cross-functional product design partnerships.",
};

const portfolioItems = [
  { image: IMAGES.posts.office, title: "Digikala Design System", type: "Design System", year: "2023", impact: "Used by 12 teams" },
  { image: IMAGES.posts.startup, title: "Snapp Booking Redesign", type: "Product Design", year: "2021", impact: "-35% drop-off rate" },
  { image: IMAGES.posts.conference, title: "UX Conference Talk", type: "Speaking", year: "2024", impact: "800+ attendees" },
  { image: IMAGES.posts.building, title: "Cafe Bazaar Dev Tools", type: "UI Design", year: "2019", impact: "10K+ developers" },
];

export function ProfilePage() {
  const { userId } = useParams();
  const isOwnProfile = !userId || userId === "me";
  const otherUser = !isOwnProfile ? users.find(u => String(u.id) === userId) ?? users[0] : null;

  const [state, setState] = useState<ProfileState>("loading");
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showRecommendationRequest, setShowRecommendationRequest] = useState(false);
  const [showWorkStatusEditor, setShowWorkStatusEditor] = useState(false);
  const [showAboutEditor, setShowAboutEditor] = useState(false);
  const [showExperienceEditor, setShowExperienceEditor] = useState(false);
  const [showEducationEditor, setShowEducationEditor] = useState(false);
  const [showSkillEditor, setShowSkillEditor] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [resumeLang, setResumeLang] = useState<ResumeLanguage>("en");
  const [resumeTemplate, setResumeTemplate] = useState<ResumeTemplate>("modern");
  const [endorsedSkills, setEndorsedSkills] = useState<Set<string>>(new Set());
  const [activeSkillCategory, setActiveSkillCategory] = useState<"all" | "verified" | "top">("all");
  const [isConnected, setIsConnected] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showConnectNote, setShowConnectNote] = useState(false);
  const [connectNote, setConnectNote] = useState("");
  const navigate = useNavigate();
  const { currentUser: appUser, setCurrentUser } = useApp();

  const [workStatus, setWorkStatus] = useState<WorkStatusType | null>(() => {
    const ws = appUser?.workStatus;
    const validKeys = Object.keys(WORK_STATUS_LABELS) as WorkStatusType[];
    if (typeof ws === "string" && validKeys.includes(ws as WorkStatusType)) return ws as WorkStatusType;
    return null;
  });

  const [aboutText, setAboutText] = useState("Passionate product designer with 7+ years of experience building user-centered digital products. I specialize in designing complex systems that feel simple and intuitive. Previously at Snapp and Cafe Bazaar, I've had the privilege of shaping products used by millions of people across Iran. I'm deeply interested in the intersection of design, data, and human behavior. Currently leading design at Digikala, where I'm building the next generation of e-commerce experiences for the Iranian market. Open to consulting and speaking opportunities.");

  useEffect(() => {
    setState("loading");
    const t = setTimeout(() => setState("active"), 1000);
    return () => clearTimeout(t);
  }, [userId]);

  // Close more menu on outside click
  useEffect(() => {
    if (!showMoreMenu) return;
    const handler = () => setShowMoreMenu(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showMoreMenu]);

  const handleWorkStatusChange = (status: WorkStatusType) => {
    const newStatus = workStatus === status ? null : status;
    setWorkStatus(newStatus);
    if (appUser) setCurrentUser({ ...appUser, workStatus: newStatus });
  };

  const handleConnect = () => {
    if (isConnected) {
      setIsConnected(false);
      toast("Connection removed");
      return;
    }
    setShowConnectNote(true);
  };

  const handleSendConnect = () => {
    setConnectLoading(true);
    setShowConnectNote(false);
    setTimeout(() => {
      setConnectLoading(false);
      setIsConnected(true);
      toast.success(`Connection request sent to ${otherUser?.name.split(" ")[0]}!`);
      setConnectNote("");
    }, 800);
  };

  const handleMessage = () => {
    navigate("/messages");
    toast("Opening conversation...");
  };

  if (state === "loading") {
    return (
      <div className="max-w-[850px] mx-auto space-y-4">
        <Skeleton className="h-52 w-full rounded-2xl" />
        <div className="flex items-end gap-4 -mt-12 px-6">
          <Skeleton className="w-32 h-32 rounded-full" />
          <div className="space-y-2 flex-1 pb-2"><Skeleton className="h-6 w-48" /><Skeleton className="h-4 w-64" /></div>
        </div>
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    );
  }

  const profileUser = otherUser ?? currentUser;
  const completionItems = [
    { label: "Profile photo", done: true, impact: "Profiles with photos get 14x more views" },
    { label: "Headline", done: true, impact: "Helps recruiters find you in search" },
    { label: "About section", done: true, impact: "Tells your professional story" },
    { label: "Work experience", done: true, impact: "Core of your professional identity" },
    { label: "Skills (5+)", done: true, impact: "Enables skill-based matching" },
    { label: "Education", done: false, impact: "Adds credibility — recruiters check this" },
    { label: "Portfolio (2+)", done: false, impact: "Proof of work increases trust by 40%" },
    { label: "Recommendations (2+)", done: true, impact: "Social proof from colleagues" },
  ];
  const completionPercent = Math.round((completionItems.filter((i) => i.done).length / completionItems.length) * 100);
  const trustScore = Math.round((profileExperience.filter(e => e.verified).length / profileExperience.length) * 100);

  const sortedSkills = [...profileSkills].sort((a, b) => b.endorsements - a.endorsements);
  const filteredSkills = activeSkillCategory === "verified"
    ? sortedSkills.filter(s => s.verified)
    : activeSkillCategory === "top"
    ? sortedSkills.slice(0, 3)
    : sortedSkills;
  const displayedSkills = showAllSkills ? filteredSkills : filteredSkills.slice(0, 5);

  // Connection degree for other user
  const connectionDegree = otherUser
    ? (Number(otherUser.id) <= 2 ? "1st" : Number(otherUser.id) <= 4 ? "2nd" : "3rd")
    : null;

  const mutualCount = otherUser ? [12, 8, 15, 3, 6][Number(otherUser.id) - 1] ?? 4 : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <div className="space-y-4 min-w-0">
        {/* ===== HEADER ===== */}
        <Card padding={false} className="overflow-hidden">
          <div className="h-48 relative" style={{ background: "linear-gradient(135deg, #0066FF 0%, #7c3aed 40%, #ec4899 70%, #FF9800 100%)" }}>
            <div className="absolute inset-0 opacity-40" style={{ background: "radial-gradient(circle at 30% 70%, #00C853 0%, transparent 40%), radial-gradient(circle at 80% 30%, #0066FF 0%, transparent 40%)" }} />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
            {isOwnProfile && (
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm rounded-xl">
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="px-6 pb-6 relative">
            {/* Avatar + Actions Row */}
            <div className="-mt-14 flex items-end justify-between">
              <div className="p-1 bg-white rounded-full shadow-lg relative">
                <Avatar
                  src={profileUser.avatar}
                  name={profileUser.name}
                  size="xl"
                  verified={(profileUser as any).verified}
                  openToWork={isOwnProfile ? workStatus !== null : !!(profileUser as any).workStatus}
                />
              </div>

              {/* Action buttons — own vs other */}
              {isOwnProfile ? (
                <div className="flex gap-2 pt-2">
                  <Button variant="ghost" size="icon" onClick={() => navigator.clipboard?.writeText(`https://hamrahe.com/in/${appUser?.customUrl || "profile"}`)}>
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setShowResumeBuilder(true)}>
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 pt-2">
                  {/* Connect button */}
                  <Button
                    variant={isConnected ? "outline" : "gradient"}
                    size="sm"
                    onClick={handleConnect}
                    disabled={connectLoading}
                    className="flex items-center gap-1.5"
                  >
                    {connectLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : isConnected ? (
                      <><UserCheck className="w-4 h-4" /> Connected</>
                    ) : (
                      <><UserPlus className="w-4 h-4" /> Connect</>
                    )}
                  </Button>

                  {/* Message button */}
                  <Button variant="outline" size="sm" onClick={handleMessage} className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" /> Message
                  </Button>

                  {/* Follow */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsFollowing(f => !f);
                      toast(isFollowing ? "Unfollowed" : `Following ${profileUser.name.split(" ")[0]}`);
                    }}
                    className="hidden sm:flex items-center gap-1.5"
                  >
                    {isFollowing ? <><Check className="w-4 h-4" /> Following</> : <><Plus className="w-4 h-4" /> Follow</>}
                  </Button>

                  {/* More menu */}
                  <div className="relative">
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setShowMoreMenu(m => !m); }}>
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                    <AnimatePresence>
                      {showMoreMenu && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -4 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -4 }}
                          transition={{ duration: 0.12 }}
                          className="absolute right-0 top-full mt-1 w-52 bg-card border border-border/20 rounded-2xl shadow-xl z-20 overflow-hidden"
                          onClick={e => e.stopPropagation()}
                        >
                          {[
                            { icon: Link2, label: "Copy profile link", action: () => { navigator.clipboard?.writeText(`https://hamrahe.com/profile/${userId}`); toast.success("Link copied!"); setShowMoreMenu(false); } },
                            { icon: Share2, label: "Share profile", action: () => { toast("Profile shared!"); setShowMoreMenu(false); } },
                            { icon: EyeOff, label: "Hide from feed", action: () => { toast("Hidden from feed"); setShowMoreMenu(false); } },
                            { icon: Flag, label: "Report", action: () => { toast("Report submitted"); setShowMoreMenu(false); } },
                            { icon: UserMinus, label: "Block", action: () => { toast(`${profileUser.name.split(" ")[0]} blocked`); navigate("/"); } },
                          ].map(item => (
                            <button key={item.label} onClick={item.action} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors hover:bg-muted/40 ${item.label === "Block" ? "text-red-500" : "text-foreground/80"}`}>
                              <item.icon className="w-4 h-4 shrink-0" />
                              {item.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>

            {/* Identity Block */}
            <div className="mt-4">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-foreground">{profileUser.name}</h2>
                {/* Connection degree badge for other users */}
                {!isOwnProfile && connectionDegree && (
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-[11px] rounded-full border border-primary/20" style={{ fontWeight: 600 }}>
                    {connectionDegree}
                  </span>
                )}
                {appUser?.isPremium && isOwnProfile && (
                  <div className="w-5 h-5 rounded bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center" title="Premium Member">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                )}
                {(profileUser as any).verified && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20">
                    <Shield className="w-3 h-3" />
                    <span className="text-[10px]" style={{ fontWeight: 600 }}>Verified</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-foreground/80 mt-0.5">{profileUser.title} at <span style={{ fontWeight: 600 }}>{profileUser.company}</span></p>

              <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{profileUser.location}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{profileUser.connectionCount} connections</span>
                {!isOwnProfile && mutualCount > 0 && (
                  <span className="flex items-center gap-1 text-primary cursor-pointer hover:underline">
                    <Users className="w-3.5 h-3.5" />{mutualCount} mutual connections
                  </span>
                )}
                {isOwnProfile && (
                  <button className="flex items-center gap-1 text-primary cursor-pointer hover:underline" onClick={() => setShowContactInfo(true)}>
                    <Mail className="w-3.5 h-3.5" />Contact info
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3 mt-3 flex-wrap">
                {(profileUser as any).responseRate >= 90 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] rounded-lg border border-emerald-200" style={{ fontWeight: 500 }}>
                    <Zap className="w-3 h-3" /> Fast Responder · {(profileUser as any).responseRate}%
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted/40 text-muted-foreground text-[11px] rounded-lg">
                  <Clock className="w-3 h-3" /> Replies {(profileUser as any).responseTime}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted/40 text-muted-foreground text-[11px] rounded-lg">
                  <Shield className="w-3 h-3" /> Trust {trustScore}%
                </span>
              </div>
            </div>

            {/* Work Status */}
            <div className="mt-4 pt-4 border-t border-border/20 flex items-center gap-2 flex-wrap">
              {workStatus && isOwnProfile && WORK_STATUS_LABELS[workStatus] && (() => {
                const StatusIcon = WORK_STATUS_LABELS[workStatus].icon;
                return (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border ${WORK_STATUS_LABELS[workStatus].bgColor} ${WORK_STATUS_LABELS[workStatus].color}`} style={{ fontWeight: 500 }}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {WORK_STATUS_LABELS[workStatus].label}
                  </span>
                );
              })()}
              {!isOwnProfile && (profileUser as any).workStatus && WORK_STATUS_LABELS[(profileUser as any).workStatus as WorkStatusType] && (() => {
                const ws = (profileUser as any).workStatus as WorkStatusType;
                const StatusIcon = WORK_STATUS_LABELS[ws].icon;
                return (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs border ${WORK_STATUS_LABELS[ws].bgColor} ${WORK_STATUS_LABELS[ws].color}`} style={{ fontWeight: 500 }}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {WORK_STATUS_LABELS[ws].label}
                  </span>
                );
              })()}
              {isOwnProfile && (
                <button onClick={() => setShowWorkStatusEditor(true)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs border border-dashed border-border/50 text-muted-foreground hover:bg-muted/30 cursor-pointer transition-colors">
                  <Edit3 className="w-3 h-3" /> {workStatus ? "Edit Status" : "Set Availability"}
                </button>
              )}
            </div>
          </div>
        </Card>

        {/* ===== HOW YOU'RE CONNECTED — only for other profiles ===== */}
        {!isOwnProfile && (
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-sm text-foreground">How you're connected</h3>
            </div>
            <div className="space-y-3">
              {connectionDegree === "1st" ? (
                <div className="flex items-center gap-3 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground" style={{ fontWeight: 500 }}>You are connected</p>
                    <p className="text-xs text-muted-foreground">Connected since Jan 2024</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl">
                  <div className="w-9 h-9 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground" style={{ fontWeight: 500 }}>{connectionDegree} degree connection</p>
                    <p className="text-xs text-muted-foreground">Connect to see more</p>
                  </div>
                </div>
              )}

              {mutualCount > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">{mutualCount} mutual connections</p>
                  <div className="flex items-center gap-2">
                    {users.slice(0, 3).map(u => (
                      <div key={u.id} className="flex items-center gap-1.5 cursor-pointer" onClick={() => navigate(`/profile/${u.id}`)}>
                        <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover border-2 border-white" title={u.name} />
                      </div>
                    ))}
                    {mutualCount > 3 && (
                      <span className="text-xs text-primary cursor-pointer hover:underline">+{mutualCount - 3} more</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* ===== ABOUT ===== */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/10 to-blue-100 flex items-center justify-center"><Quote className="w-4 h-4 text-primary" /></div>
              <h3 className="text-sm text-foreground">About</h3>
            </div>
            {isOwnProfile && (
              <Button variant="ghost" size="icon" onClick={() => setShowAboutEditor(true)}>
                <Edit3 className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="px-4 py-3 bg-primary/5 rounded-xl border-l-3 border-primary/40 mb-4">
            <p className="text-sm text-foreground/90 leading-relaxed" style={{ fontWeight: 500 }}>{aboutStructured.valueProposition}</p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {aboutExpanded ? aboutText : aboutText.slice(0, 180) + "..."}
          </p>
          <button onClick={() => setAboutExpanded(!aboutExpanded)} className="text-sm text-primary flex items-center gap-1 mt-2 cursor-pointer hover:underline">
            {aboutExpanded ? "Show less" : "Show more"}
            {aboutExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <div className="mt-4 pt-4 border-t border-border/15 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-1.5">Specialization</p>
              <div className="flex flex-wrap gap-1">
                {aboutStructured.specialization.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-primary/8 text-primary text-[11px] rounded-md">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-1.5">Industries</p>
              <div className="flex flex-wrap gap-1">
                {aboutStructured.industries.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-violet-50 text-violet-600 text-[11px] rounded-md">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-1.5">Collaboration</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{aboutStructured.collaboration}</p>
            </div>
          </div>
        </Card>

        {/* ===== EXPERIENCE ===== */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/10 to-violet-100 flex items-center justify-center"><Briefcase className="w-4 h-4 text-primary" /></div>
              <h3 className="text-sm text-foreground">Experience</h3>
              <span className="text-[10px] text-muted-foreground/60 bg-muted/40 px-2 py-0.5 rounded-md">{profileExperience.length} roles · {profileExperience.filter(e => e.verified).length} verified</span>
            </div>
            {isOwnProfile && (
              <Button variant="ghost" size="icon" onClick={() => setShowExperienceEditor(true)}><Plus className="w-4 h-4" /></Button>
            )}
          </div>
          <div className="space-y-0">
            {profileExperience.map((exp, idx) => (
              <div key={exp.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full shrink-0 ${idx === 0 ? "bg-primary shadow-md shadow-primary/30" : "bg-muted-foreground/30"}`} />
                  {idx < profileExperience.length - 1 && <div className="w-px flex-1 bg-border/50 my-1" />}
                </div>
                <div className={`flex-1 min-w-0 ${idx < profileExperience.length - 1 ? "pb-6" : "pb-0"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm text-foreground">{exp.role}</h4>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-xs text-muted-foreground/60 mt-0.5">{exp.startDate} – {exp.endDate}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {exp.verifiedByCompany && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] rounded-md border border-emerald-200" title="Verified by company">
                          <Building2 className="w-2.5 h-2.5" /> Company
                        </span>
                      )}
                      {exp.colleagueCount && exp.colleagueCount > 0 && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary/5 text-primary text-[9px] rounded-md border border-primary/15">
                          <Users className="w-2.5 h-2.5" /> {exp.colleagueCount}
                        </span>
                      )}
                      {!exp.verified && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[9px] rounded-md border border-amber-200">
                          <AlertCircle className="w-2.5 h-2.5" /> Unverified
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{exp.description}</p>
                  {idx === 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] rounded-md">
                        <TrendingUp className="w-3 h-3" /> +23% checkout conversion
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/5 text-primary text-[10px] rounded-md">
                        <Layers className="w-3 h-3" /> Design system for 12 teams
                      </span>
                    </div>
                  )}
                  {idx === 1 && (
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] rounded-md">
                        <TrendingUp className="w-3 h-3" /> -35% drop-off rate
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-violet-50 text-violet-600 text-[10px] rounded-md">
                        <Users className="w-3 h-3" /> Mentored 3 designers
                      </span>
                    </div>
                  )}
                  {exp.verifiedByColleague && (
                    <p className="text-[10px] text-emerald-600 mt-1.5 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Verified by {exp.verifiedByColleague}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ===== EDUCATION ===== */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-100 to-cyan-100 flex items-center justify-center"><GraduationCap className="w-4 h-4 text-emerald-600" /></div>
              <h3 className="text-sm text-foreground">Education</h3>
            </div>
            {isOwnProfile && (
              <Button variant="ghost" size="icon" onClick={() => setShowEducationEditor(true)}><Plus className="w-4 h-4" /></Button>
            )}
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center shrink-0"><GraduationCap className="w-6 h-6 text-muted-foreground" /></div>
            <div>
              <h4 className="text-sm text-foreground">BSc in Computer Science</h4>
              <p className="text-sm text-muted-foreground">University of Tehran</p>
              <p className="text-xs text-muted-foreground/60">2013 – 2017</p>
            </div>
          </div>
        </Card>

        {/* ===== SKILLS ===== */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center"><Star className="w-4 h-4 text-amber-600" /></div>
              <h3 className="text-sm text-foreground">Skills & Endorsements</h3>
            </div>
            {isOwnProfile && (
              <Button variant="ghost" size="icon" onClick={() => setShowSkillEditor(true)}><Plus className="w-4 h-4" /></Button>
            )}
          </div>

          <div className="flex gap-1 bg-muted/30 rounded-xl p-1 mb-4">
            {([
              { key: "all" as const, label: `All (${profileSkills.length})` },
              { key: "verified" as const, label: `Verified (${profileSkills.filter(s => s.verified).length})` },
              { key: "top" as const, label: "Top 3" },
            ]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveSkillCategory(tab.key)}
                className={`flex-1 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all ${
                  activeSkillCategory === tab.key
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-3.5">
            {displayedSkills.map((skill, idx) => (
              <div key={skill.name} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {activeSkillCategory === "top" && (
                      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-[9px] text-white" style={{ fontWeight: 700 }}>
                        {idx + 1}
                      </span>
                    )}
                    <span className="text-sm text-foreground">{skill.name}</span>
                    {skill.verifiedBy === "test" && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] rounded-md border border-emerald-200">
                        <CheckCircle2 className="w-2.5 h-2.5" /> {skill.testScore}%
                      </span>
                    )}
                    {skill.verifiedBy === "project" && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-violet-50 text-violet-700 text-[9px] rounded-md border border-violet-200">
                        <Puzzle className="w-2.5 h-2.5" /> Project
                      </span>
                    )}
                    {skill.verifiedBy === "peer" && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-primary/5 text-primary text-[9px] rounded-md border border-primary/15">
                        <Users className="w-2.5 h-2.5" /> Peer
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{skill.endorsements + (endorsedSkills.has(skill.name) ? 1 : 0)} endorsements</span>
                    {/* Endorse button shows on OTHER user's profile only */}
                    {!isOwnProfile && (
                      <button
                        onClick={() => {
                          setEndorsedSkills(prev => {
                            const next = new Set(prev);
                            if (next.has(skill.name)) {
                              next.delete(skill.name);
                            } else {
                              next.add(skill.name);
                              toast.success(`Endorsed ${skill.name}!`);
                            }
                            return next;
                          });
                        }}
                        className={`px-2 py-0.5 rounded-md text-[10px] cursor-pointer transition-all border ${
                          endorsedSkills.has(skill.name)
                            ? "bg-primary text-white border-primary"
                            : "border-border/40 text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {endorsedSkills.has(skill.name) ? "✓ Endorsed" : "+ Endorse"}
                      </button>
                    )}
                  </div>
                </div>
                <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((skill.endorsements / 50) * 100, 100)}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`h-full rounded-full ${
                      skill.verified
                        ? "bg-gradient-to-r from-primary to-violet-500"
                        : "bg-gradient-to-r from-gray-300 to-gray-400"
                    }`}
                  />
                </div>
                {skill.topEndorsers && (
                  <p className="text-[10px] text-muted-foreground/50 mt-1">Endorsed by {skill.topEndorsers.join(", ")}</p>
                )}
              </div>
            ))}
          </div>
          {filteredSkills.length > 5 && (
            <button onClick={() => setShowAllSkills(!showAllSkills)} className="text-sm text-primary mt-4 flex items-center gap-1 cursor-pointer hover:underline">
              {showAllSkills ? "Show less" : `Show all ${filteredSkills.length} skills`}
              {showAllSkills ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </Card>

        {/* ===== RECOMMENDATIONS ===== */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center"><Award className="w-4 h-4 text-pink-600" /></div>
              <h3 className="text-sm text-foreground">Recommendations</h3>
              <span className="text-[10px] text-muted-foreground/60 bg-muted/40 px-2 py-0.5 rounded-md">{profileRecommendations.length} received</span>
            </div>
            {isOwnProfile ? (
              <Button variant="outline" size="sm" onClick={() => setShowRecommendationRequest(true)}>
                <Plus className="w-3.5 h-3.5" /> Request
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => { toast.success("Recommendation request sent!"); }}>
                <Send className="w-3.5 h-3.5" /> Recommend
              </Button>
            )}
          </div>
          <div className="space-y-0">
            {profileRecommendations.map((rec, idx) => (
              <div key={rec.id} className={`${idx > 0 ? "pt-5 mt-5 border-t border-border/15" : ""}`}>
                <div className="flex items-start gap-3">
                  <Avatar src={rec.author.avatar} name={rec.author.name} size="md" verified={rec.author.verified} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm text-foreground">{rec.author.name}</h4>
                      {rec.weight === "high" && (
                        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[9px] rounded-md border border-amber-200" style={{ fontWeight: 600 }}>
                          <Star className="w-2.5 h-2.5 fill-amber-500" /> Senior recommendation
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{rec.author.title} at {rec.author.company}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">{rec.relationship} · {rec.date}</p>
                    <div className="mt-2.5 p-4 bg-muted/20 rounded-xl border-l-2 border-primary/30 relative">
                      <Quote className="w-4 h-4 text-primary/15 absolute top-2 right-3" />
                      <p className="text-sm text-muted-foreground leading-relaxed italic">"{rec.text}"</p>
                    </div>
                    {rec.skills && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {rec.skills.map(s => (
                          <span key={s} className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] rounded-md">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ===== ASSESSMENT & REPORTS ===== */}
        <AssessmentReportsSection isOwnProfile={isOwnProfile} navigate={navigate} />

        {/* ===== FEATURED WORK ===== */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center"><Globe className="w-4 h-4 text-violet-600" /></div>
              <h3 className="text-sm text-foreground">Featured Work</h3>
              <span className="text-[10px] text-muted-foreground/60 bg-muted/40 px-2 py-0.5 rounded-md">{portfolioItems.length} projects</span>
            </div>
            {isOwnProfile && (
              <Button variant="ghost" size="icon"><Plus className="w-4 h-4" /></Button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {portfolioItems.map((item, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden group cursor-pointer border border-border/10">
                <ImageWithFallback src={item.image} alt={item.title} className="w-full h-36 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <p className="text-white text-xs" style={{ fontWeight: 600 }}>{item.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/70 text-[10px]">{item.type} · {item.year}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white text-[9px] rounded-md">
                  {item.impact}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ===== RIGHT SIDEBAR ===== */}
      <aside className="hidden lg:block">
        <div className="sticky top-[76px] space-y-4">
          {isOwnProfile ? (
            <>
              {/* Professional Score */}
              <div className="rounded-2xl p-5 text-white shadow-lg overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0066FF 0%, #7c3aed 100%)" }}>
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/10 rounded-full" />
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white/90">Professional Score</span>
                    <span className="text-2xl" style={{ fontWeight: 700 }}>{currentUser.professionalScore}</span>
                  </div>
                  <p className="text-[10px] text-white/50 mb-4">How ready you are for opportunities</p>
                  <div className="space-y-3">
                    {[
                      { label: "Credibility", value: trustScore, desc: "Verified experiences & skills", color: "bg-emerald-400" },
                      { label: "Visibility", value: 90, desc: "Profile completeness & reach", color: "bg-blue-300" },
                      { label: "Skills", value: 85, desc: "Endorsements & verification", color: "bg-amber-400" },
                      { label: "Responsiveness", value: currentUser.responseRate || 0, desc: "Reply rate & speed", color: "bg-cyan-400" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <span className="text-[11px] text-white/80">{item.label}</span>
                            <span className="text-[9px] text-white/40 ml-1.5">{item.desc}</span>
                          </div>
                          <span className="text-[11px] text-white/90" style={{ fontWeight: 600 }}>{item.value}%</span>
                        </div>
                        <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${item.color} rounded-full`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Profile Improvement */}
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">Improve Profile</span>
                  </div>
                  <span className="text-xs text-primary" style={{ fontWeight: 600 }}>{completionPercent}%</span>
                </div>
                <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden mb-4">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${completionPercent}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500" />
                </div>
                <div className="space-y-2">
                  {completionItems.filter(i => !i.done).map((item) => (
                    <div key={item.label} className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-100/50">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="text-xs text-foreground flex-1">{item.label}</span>
                        <button className="text-[10px] text-primary cursor-pointer hover:underline" style={{ fontWeight: 600 }}>Add →</button>
                      </div>
                      <p className="text-[10px] text-muted-foreground/60 mt-1 ml-5.5">{item.impact}</p>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[11px] text-muted-foreground">{completionItems.filter(i => i.done).length} items completed</span>
                  </div>
                </div>
              </Card>

              {/* Suggestions */}
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-foreground">Suggestions</span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { text: "Verify \"Interaction Design\" with a skill test", type: "skill" as const, action: "Take test", icon: Star },
                    { text: "Cafe Bazaar experience is unverified", type: "trust" as const, action: "Request verification", icon: Shield },
                    { text: "UX Researcher at Cafe Bazaar — 85% match", type: "job" as const, action: "View job", icon: Briefcase },
                    { text: "Add a portfolio piece for design systems", type: "profile" as const, action: "Add work", icon: Globe },
                  ].map((s, i) => {
                    const SIcon = s.icon;
                    return (
                      <div key={i} className="flex items-start gap-2.5 p-2.5 bg-muted/20 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer group">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                          s.type === "skill" ? "bg-amber-50 text-amber-500" :
                          s.type === "trust" ? "bg-emerald-50 text-emerald-500" :
                          s.type === "job" ? "bg-primary/10 text-primary" :
                          "bg-violet-50 text-violet-500"
                        }`}>
                          <SIcon className="w-3 h-3" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
                          <button className="text-[11px] text-primary cursor-pointer hover:underline mt-0.5 flex items-center gap-0.5 group-hover:gap-1 transition-all">
                            {s.action} <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* Visibility */}
              <Card>
                <div className="flex items-center gap-2 mb-4"><Eye className="w-4 h-4 text-primary" /><span className="text-sm text-foreground">Visibility</span></div>
                <div className="space-y-3">
                  {[
                    { label: "Profile views", value: "234", change: "+12%", color: "from-primary to-violet-500" },
                    { label: "Search appearances", value: "1.2K", change: "+8%", color: "from-emerald-500 to-teal-500" },
                    { label: "Post impressions", value: "5.6K", change: "+23%", color: "from-amber-500 to-orange-500" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5"><div className={`w-1.5 h-6 rounded-full bg-gradient-to-b ${stat.color}`} /><span className="text-xs text-muted-foreground">{stat.label}</span></div>
                      <div className="flex items-center gap-2"><span className="text-sm text-foreground" style={{ fontWeight: 600 }}>{stat.value}</span><span className="text-[10px] text-emerald-600">{stat.change}</span></div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick links */}
              <Card padding={false}>
                <div className="p-2">
                  <button onClick={() => navigate("/analytics")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-primary hover:bg-primary/5 cursor-pointer transition-all"><BarChart3 className="w-4 h-4" /><span>View Analytics</span></button>
                  <button onClick={() => navigate("/settings")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 cursor-pointer transition-all"><Settings className="w-4 h-4" /><span>Settings</span></button>
                  <button onClick={() => navigate("/premium")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-amber-600 hover:bg-amber-50 cursor-pointer transition-all"><Crown className="w-4 h-4" /><span>Try Premium</span></button>
                  <button onClick={() => setShowResumeBuilder(true)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 cursor-pointer transition-all"><FileText className="w-4 h-4" /><span>Build Resume</span></button>
                  <button onClick={() => navigate("/projects")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-violet-600 hover:bg-violet-50 cursor-pointer transition-all"><Puzzle className="w-4 h-4" /><span>Project Market</span></button>
                </div>
              </Card>
            </>
          ) : (
            <>
              {/* Other user's professional score (read-only) */}
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground">Professional Score</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl shrink-0" style={{ background: "linear-gradient(135deg, #0066FF 0%, #7c3aed 100%)", fontWeight: 700 }}>
                    {profileUser.professionalScore}
                  </div>
                  <div>
                    <p className="text-sm text-foreground" style={{ fontWeight: 500 }}>Strong Profile</p>
                    <p className="text-xs text-muted-foreground">Top 15% in Product Design</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: "Credibility", value: trustScore },
                    { label: "Visibility", value: 90 },
                    { label: "Skills", value: 85 },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-20">{item.label}</span>
                      <div className="flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-primary to-violet-500"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* People Also Viewed */}
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">People Also Viewed</span>
                </div>
                <div className="space-y-3">
                  {users.filter(u => String(u.id) !== userId).slice(0, 4).map(u => (
                    <button
                      key={u.id}
                      onClick={() => navigate(`/profile/${u.id}`)}
                      className="w-full flex items-center gap-3 hover:bg-muted/30 rounded-xl p-1.5 -mx-1.5 cursor-pointer transition-colors text-left group"
                    >
                      <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate group-hover:text-primary transition-colors">{u.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{u.title}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                    </button>
                  ))}
                </div>
              </Card>

              {/* Similar profiles */}
              <Card>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Similar Profiles</span>
                </div>
                <div className="space-y-2.5">
                  {["Lead Product Designer at Snapp", "UX Director at Digikala", "Design Lead at Cafe Bazaar"].map((title, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-muted/20 rounded-xl">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-violet-200 flex items-center justify-center shrink-0 text-xs text-primary" style={{ fontWeight: 600 }}>
                        {["KR", "MH", "AF"][i]}
                      </div>
                      <p className="text-xs text-muted-foreground flex-1 leading-relaxed">{title}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Report profile */}
              <Card padding={false}>
                <div className="p-2">
                  <button onClick={() => { toast("Report submitted. Thank you."); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted/30 cursor-pointer transition-all">
                    <Flag className="w-4 h-4" /><span>Report this profile</span>
                  </button>
                  <button onClick={() => { navigate("/"); toast(`${profileUser.name.split(" ")[0]} blocked`); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 cursor-pointer transition-all">
                    <UserMinus className="w-4 h-4" /><span>Block</span>
                  </button>
                </div>
              </Card>
            </>
          )}
        </div>
      </aside>

      {/* === MODALS (own profile only) === */}
      {isOwnProfile && (
        <>
          {/* Work Status Editor */}
          <AnimatePresence>
            {showWorkStatusEditor && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowWorkStatusEditor(false)}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  onClick={e => e.stopPropagation()} className="bg-card rounded-2xl w-full max-w-md mx-4 p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-foreground">Work Availability</h3>
                    <button onClick={() => setShowWorkStatusEditor(false)} className="p-1 hover:bg-muted rounded-lg cursor-pointer"><X className="w-5 h-5 text-muted-foreground" /></button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">Let recruiters and clients know what kind of work you're open to.</p>
                  <div className="space-y-2">
                    {(Object.keys(WORK_STATUS_LABELS) as WorkStatusType[]).map(ws => {
                      const info = WORK_STATUS_LABELS[ws];
                      const Icon = info.icon;
                      const active = workStatus === ws;
                      return (
                        <button key={ws} onClick={() => handleWorkStatusChange(ws)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${active ? `${info.bgColor} ${info.color}` : "border-border/30 text-muted-foreground hover:bg-muted/20"}`}>
                          <Icon className="w-4 h-4" />
                          <span className="flex-1 text-left text-sm">{info.label}</span>
                          {active && <Check className="w-4 h-4" />}
                        </button>
                      );
                    })}
                  </div>
                  <Button variant="gradient" className="w-full mt-4" onClick={() => { setShowWorkStatusEditor(false); toast.success("Work status updated!"); }}>Save</Button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* About Editor */}
          <AnimatePresence>
            {showAboutEditor && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowAboutEditor(false)}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  onClick={e => e.stopPropagation()} className="bg-card rounded-2xl w-full max-w-2xl mx-4 p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-foreground">Edit About</h3>
                    <button onClick={() => setShowAboutEditor(false)} className="p-1 hover:bg-muted rounded-lg cursor-pointer"><X className="w-5 h-5 text-muted-foreground" /></button>
                  </div>
                  <textarea value={aboutText} onChange={(e) => setAboutText(e.target.value)}
                    className="w-full h-48 px-4 py-3 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Tell us about yourself..." />
                  <div className="flex gap-2 mt-4">
                    <Button variant="gradient" className="flex-1" onClick={() => { setShowAboutEditor(false); toast.success("About section updated!"); }}>Save</Button>
                    <Button variant="outline" onClick={() => setShowAboutEditor(false)}>Cancel</Button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Experience Editor */}
          <AnimatePresence>
            {showExperienceEditor && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowExperienceEditor(false)}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  onClick={e => e.stopPropagation()} className="bg-card rounded-2xl w-full max-w-2xl mx-4 p-6 shadow-xl max-h-[85vh] overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-foreground">Add Experience</h3>
                    <button onClick={() => setShowExperienceEditor(false)} className="p-1 hover:bg-muted rounded-lg cursor-pointer"><X className="w-5 h-5 text-muted-foreground" /></button>
                  </div>
                  <div className="space-y-4">
                    <div><label className="text-xs text-muted-foreground mb-1 block">Title</label><input type="text" placeholder="e.g. Senior Product Designer" className="w-full px-4 py-2.5 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                    <div><label className="text-xs text-muted-foreground mb-1 block">Company</label><input type="text" placeholder="e.g. Digikala" className="w-full px-4 py-2.5 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-xs text-muted-foreground mb-1 block">Start Date</label><input type="month" className="w-full px-4 py-2.5 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                      <div><label className="text-xs text-muted-foreground mb-1 block">End Date</label><input type="month" className="w-full px-4 py-2.5 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                    </div>
                    <div><label className="text-xs text-muted-foreground mb-1 block">Description & Achievements</label><textarea className="w-full h-32 px-4 py-3 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Describe your role, key responsibilities, and measurable achievements..." /></div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button variant="gradient" className="flex-1" onClick={() => { setShowExperienceEditor(false); toast.success("Experience saved!"); }}>Save</Button>
                    <Button variant="outline" onClick={() => setShowExperienceEditor(false)}>Cancel</Button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Education Editor */}
          <AnimatePresence>
            {showEducationEditor && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowEducationEditor(false)}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  onClick={e => e.stopPropagation()} className="bg-card rounded-2xl w-full max-w-2xl mx-4 p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-foreground">Add Education</h3>
                    <button onClick={() => setShowEducationEditor(false)} className="p-1 hover:bg-muted rounded-lg cursor-pointer"><X className="w-5 h-5 text-muted-foreground" /></button>
                  </div>
                  <div className="space-y-4">
                    <div><label className="text-xs text-muted-foreground mb-1 block">School/University</label><input type="text" placeholder="e.g. University of Tehran" className="w-full px-4 py-2.5 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                    <div><label className="text-xs text-muted-foreground mb-1 block">Degree</label><input type="text" placeholder="e.g. BSc in Computer Science" className="w-full px-4 py-2.5 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><label className="text-xs text-muted-foreground mb-1 block">Start Year</label><input type="number" placeholder="2013" className="w-full px-4 py-2.5 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                      <div><label className="text-xs text-muted-foreground mb-1 block">End Year</label><input type="number" placeholder="2017" className="w-full px-4 py-2.5 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button variant="gradient" className="flex-1" onClick={() => { setShowEducationEditor(false); toast.success("Education saved!"); }}>Save</Button>
                    <Button variant="outline" onClick={() => setShowEducationEditor(false)}>Cancel</Button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Skill Editor */}
          <AnimatePresence>
            {showSkillEditor && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowSkillEditor(false)}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  onClick={e => e.stopPropagation()} className="bg-card rounded-2xl w-full max-w-md mx-4 p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-foreground">Add Skill</h3>
                    <button onClick={() => setShowSkillEditor(false)} className="p-1 hover:bg-muted rounded-lg cursor-pointer"><X className="w-5 h-5 text-muted-foreground" /></button>
                  </div>
                  <div className="space-y-4">
                    <div><label className="text-xs text-muted-foreground mb-1 block">Skill Name</label><input type="text" placeholder="e.g. UX Design" className="w-full px-4 py-2.5 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                    <p className="text-xs text-muted-foreground">Skills can be endorsed by connections or verified through tests and projects.</p>
                  </div>
                  <div className="flex gap-2 mt-6">
                    <Button variant="gradient" className="flex-1" onClick={() => { setShowSkillEditor(false); toast.success("Skill added!"); }}>Add Skill</Button>
                    <Button variant="outline" onClick={() => setShowSkillEditor(false)}>Cancel</Button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Recommendation Request */}
          <AnimatePresence>
            {showRecommendationRequest && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowRecommendationRequest(false)}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  onClick={e => e.stopPropagation()} className="bg-card rounded-2xl w-full max-w-lg mx-4 p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-foreground">Request Recommendation</h3>
                    <button onClick={() => setShowRecommendationRequest(false)} className="p-1 hover:bg-muted rounded-lg cursor-pointer"><X className="w-5 h-5 text-muted-foreground" /></button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">A strong recommendation from a senior colleague or manager significantly boosts your credibility.</p>
                  <label className="text-xs text-muted-foreground">Send to</label>
                  <div className="flex gap-2 mt-1 mb-4 overflow-x-auto">
                    {users.map(u => (
                      <button key={u.id} className="flex items-center gap-2 px-3 py-2 border border-border/30 rounded-xl text-sm shrink-0 hover:border-primary/30 cursor-pointer transition-colors">
                        <img src={u.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-xs">{u.name.split(" ")[0]}</span>
                      </button>
                    ))}
                  </div>
                  <label className="text-xs text-muted-foreground">Template</label>
                  <div className="grid grid-cols-2 gap-2 mt-1 mb-4">
                    {["We worked together at...", "You managed me at...", "We collaborated on...", "Custom message"].map(t => (
                      <button key={t} className="p-2.5 border border-border/30 rounded-xl text-xs text-muted-foreground hover:border-primary/30 hover:text-primary cursor-pointer transition-colors text-left">{t}</button>
                    ))}
                  </div>
                  <label className="text-xs text-muted-foreground">Skills to highlight</label>
                  <div className="flex flex-wrap gap-1.5 mt-1 mb-4">
                    {profileSkills.slice(0, 6).map(s => (
                      <button key={s.name} className="px-2.5 py-1 border border-border/30 rounded-lg text-xs text-muted-foreground hover:border-primary/30 hover:text-primary cursor-pointer">{s.name}</button>
                    ))}
                  </div>
                  <Button variant="gradient" className="w-full" onClick={() => { setShowRecommendationRequest(false); toast.success("Recommendation request sent!"); }}>Send Request</Button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Contact Info */}
          <AnimatePresence>
            {showContactInfo && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowContactInfo(false)}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  onClick={e => e.stopPropagation()} className="bg-card rounded-2xl w-full max-w-md mx-4 p-6 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-foreground">Contact Info</h3>
                    <button onClick={() => setShowContactInfo(false)} className="p-1 hover:bg-muted rounded-lg cursor-pointer"><X className="w-5 h-5 text-muted-foreground" /></button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { icon: Mail, label: "Email", value: "ahmad.parvizi@email.com", link: "mailto:ahmad.parvizi@email.com" },
                      { icon: Globe, label: "Website", value: "ahmadparvizi.design", link: "https://ahmadparvizi.design" },
                      { icon: MapPin, label: "Location", value: "Tehran, Iran", link: undefined },
                    ].map(item => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={item.label} className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center shrink-0"><ItemIcon className="w-5 h-5 text-muted-foreground" /></div>
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground">{item.label}</p>
                            {item.link ? <a href={item.link} className="text-sm text-primary hover:underline">{item.value}</a> : <p className="text-sm text-foreground">{item.value}</p>}
                          </div>
                          <button onClick={() => navigator.clipboard?.writeText(item.value)} className="p-1.5 hover:bg-muted rounded-lg cursor-pointer"><Copy className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Resume Builder */}
          <AnimatePresence>
            {showResumeBuilder && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowResumeBuilder(false)}>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  onClick={e => e.stopPropagation()} className="bg-card rounded-2xl w-full max-w-2xl mx-4 max-h-[85vh] overflow-y-auto shadow-xl">
                  <div className="sticky top-0 bg-card border-b border-border/20 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/10 to-violet-100 flex items-center justify-center"><FileText className="w-4 h-4 text-primary" /></div>
                      <h3 className="text-foreground">Resume Builder</h3>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="gradient" size="sm"><Download className="w-3.5 h-3.5" /> Download PDF</Button>
                      <button onClick={() => setShowResumeBuilder(false)} className="p-1.5 hover:bg-muted rounded-lg cursor-pointer"><X className="w-5 h-5 text-muted-foreground" /></button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex gap-1 bg-muted/50 rounded-xl p-1">
                        {(["en", "fa"] as const).map(l => (
                          <button key={l} onClick={() => setResumeLang(l)} className={`px-3.5 py-1.5 rounded-lg text-xs cursor-pointer transition-all ${resumeLang === l ? "bg-white text-primary shadow-sm" : "text-muted-foreground"}`}>
                            {l === "en" ? "English" : "فارسی"}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-1 bg-muted/50 rounded-xl p-1">
                        {(["modern", "classic", "minimal"] as const).map(t => (
                          <button key={t} onClick={() => setResumeTemplate(t)} className={`px-3.5 py-1.5 rounded-lg text-xs cursor-pointer transition-all capitalize ${resumeTemplate === t ? "bg-white text-primary shadow-sm" : "text-muted-foreground"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className={`border border-border/30 rounded-xl bg-white shadow-sm overflow-hidden ${resumeLang === "fa" ? "text-right" : "text-left"}`} dir={resumeLang === "fa" ? "rtl" : "ltr"}>
                      {resumeTemplate === "modern" && (
                        <div className="p-1.5">
                          <div className="rounded-lg p-5 text-white" style={{ background: "linear-gradient(135deg, #0066FF 0%, #7c3aed 100%)" }}>
                            <div className="flex items-center gap-4">
                              <img src={currentUser.avatar} alt="" className="w-14 h-14 rounded-full object-cover ring-2 ring-white/30" />
                              <div>
                                <h2 className="text-lg">{resumeLang === "fa" ? "سارا احمدی" : currentUser.name}</h2>
                                <p className="text-sm text-white/80">{resumeLang === "fa" ? "طراح ارشد محصول" : currentUser.title}</p>
                                <p className="text-xs text-white/60">{resumeLang === "fa" ? "تهران، ایران · ahmad.parvizi@email.com" : "Tehran, Iran · ahmad.parvizi@email.com"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {resumeTemplate !== "modern" && (
                        <div className={`p-5 ${resumeTemplate === "classic" ? "border-b-4 border-foreground" : "border-b border-border/20"}`}>
                          <h2 className="text-foreground text-lg">{resumeLang === "fa" ? "سارا احمدی" : currentUser.name}</h2>
                          <p className="text-sm text-muted-foreground">{resumeLang === "fa" ? "طراح ارشد محصول" : currentUser.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{resumeLang === "fa" ? "تهران، ایران" : "Tehran, Iran"} · ahmad.parvizi@email.com</p>
                        </div>
                      )}
                      <div className="p-5 space-y-4">
                        <div>
                          <h3 className="text-sm text-foreground mb-1.5" style={{ fontWeight: 600 }}>{resumeLang === "fa" ? "خلاصه" : "Summary"}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {resumeLang === "fa"
                              ? "طراح محصول با بیش از ۷ سال تجربه در ساخت محصولات دیجیتال کاربرمحور."
                              : "Passionate product designer with 7+ years of experience. Specialized in designing complex systems that feel simple and intuitive."}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm text-foreground mb-2" style={{ fontWeight: 600 }}>{resumeLang === "fa" ? "تجربه کاری" : "Experience"}</h3>
                          <div className="space-y-3 text-xs">
                            {profileExperience.slice(0, 3).map(exp => (
                              <div key={exp.id}>
                                <div className="text-foreground" style={{ fontWeight: 600 }}>{resumeLang === "fa" ? "طراح ارشد" : exp.role}</div>
                                <div className="text-muted-foreground">{exp.company} · {exp.startDate} - {exp.endDate}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm text-foreground mb-2" style={{ fontWeight: 600 }}>{resumeLang === "fa" ? "مهارت‌ها" : "Skills"}</h3>
                          <div className="flex flex-wrap gap-1.5">
                            {profileSkills.slice(0, 8).map(skill => (
                              <span key={skill.name} className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] rounded-md">{skill.name}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Connect with note modal (other user) */}
      <AnimatePresence>
        {showConnectNote && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowConnectNote(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()} className="bg-card rounded-2xl w-full max-w-md mx-4 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-foreground">Connect with {otherUser?.name.split(" ")[0]}</h3>
                <button onClick={() => setShowConnectNote(false)} className="p-1 hover:bg-muted rounded-lg cursor-pointer"><X className="w-5 h-5 text-muted-foreground" /></button>
              </div>
              <div className="flex items-center gap-3 mb-4 p-3 bg-muted/20 rounded-xl">
                <img src={otherUser?.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="text-sm text-foreground" style={{ fontWeight: 500 }}>{otherUser?.name}</p>
                  <p className="text-xs text-muted-foreground">{otherUser?.title} at {otherUser?.company}</p>
                </div>
              </div>
              <label className="text-xs text-muted-foreground block mb-1.5">Add a personal note (optional)</label>
              <textarea
                value={connectNote}
                onChange={e => setConnectNote(e.target.value)}
                maxLength={300}
                placeholder={`Hi ${otherUser?.name.split(" ")[0]}, I'd love to connect...`}
                className="w-full h-28 px-4 py-3 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
              <div className="flex items-center justify-between mt-1 mb-4">
                <p className="text-xs text-muted-foreground">Personalized invitations are more likely to be accepted.</p>
                <span className="text-xs text-muted-foreground">{connectNote.length}/300</span>
              </div>
              <div className="flex gap-2">
                <Button variant="gradient" className="flex-1" onClick={handleSendConnect}>Send Invitation</Button>
                <Button variant="outline" onClick={() => setShowConnectNote(false)}>Cancel</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Assessment & Reports Profile Section ────────────────────────────────────

function AssessmentReportsSection({ isOwnProfile, navigate }: { isOwnProfile: boolean; navigate: (path: string) => void }) {
  const completedAttempts = USER_ATTEMPTS.filter((a) => a.status === "Completed");
  const companyRequests = USER_ATTEMPTS.filter((a) => a.status === "Requested by Company");

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-100 to-primary/20 flex items-center justify-center">
            <Brain className="w-4 h-4 text-violet-600" />
          </div>
          <h3 className="text-sm text-foreground">Assessment & Reports</h3>
          {completedAttempts.length > 0 && (
            <span className="text-[10px] text-muted-foreground/60 bg-muted/40 px-2 py-0.5 rounded-md">
              {completedAttempts.length} completed
            </span>
          )}
        </div>
        {isOwnProfile && (
          <button
            onClick={() => navigate("/assessment-center")}
            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            style={{ fontWeight: 600 }}
          >
            Manage
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {completedAttempts.length === 0 ? (
        <div className="text-center py-8">
          <Brain className="w-10 h-10 mx-auto mb-2 text-muted-foreground/25" />
          <p className="text-xs text-muted-foreground leading-relaxed mb-4 max-w-sm mx-auto">
            You have not completed any assessments yet. Start with standardized assessments to better understand your personality, work style, communication style, and professional readiness.
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 mb-4">
            {["MBTI", "DISC", "Work Style", "Communication Style", "AI Readiness"].map((name) => (
              <span key={name} className="text-[11px] px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 border border-violet-200" style={{ fontWeight: 600 }}>
                {name}
              </span>
            ))}
          </div>
          {isOwnProfile && (
            <button
              onClick={() => navigate("/assessment-center")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs hover:bg-primary/90 transition-colors"
              style={{ fontWeight: 700 }}
            >
              <Brain className="w-3.5 h-3.5" />
              Start First Assessment
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {/* Company requests banner */}
          {isOwnProfile && companyRequests.length > 0 && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <div className="flex-1">
                <span className="text-xs text-amber-900" style={{ fontWeight: 600 }}>
                  {companyRequests.length} company assessment request{companyRequests.length > 1 ? "s" : ""} pending
                </span>
              </div>
              <button
                onClick={() => navigate("/assessment-center")}
                className="text-xs text-amber-700 hover:underline"
                style={{ fontWeight: 600 }}
              >
                View →
              </button>
            </div>
          )}

          {/* Completed assessments */}
          <div className="grid sm:grid-cols-2 gap-2">
            {completedAttempts.map((attempt) => {
              const item = ASSESSMENT_CENTER_ITEMS.find((a) => a.id === attempt.assessmentId);
              const result = ASSESSMENT_CENTER_RESULTS[attempt.assessmentId];
              if (!item) return null;

              return (
                <button
                  key={attempt.id}
                  onClick={() => navigate(`/assessment-center/${item.id}`)}
                  className="flex items-start gap-3 p-3 rounded-xl border border-border/40 bg-white hover:border-primary/30 hover:bg-primary/[0.02] transition-all text-left group"
                >
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0`}>
                    <span className="text-white text-[10px]" style={{ fontWeight: 800 }}>{item.iconLabel}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-foreground line-clamp-1 mb-0.5" style={{ fontWeight: 700 }}>{item.displayName}</div>
                    {result ? (
                      <div className="text-[11px] text-emerald-600 mb-0.5" style={{ fontWeight: 600 }}>
                        {result.overallProfile} · {result.overallLabel}
                      </div>
                    ) : (
                      <div className="text-[10px] text-muted-foreground mb-0.5">{item.familyShort}</div>
                    )}
                    {attempt.submittedAt && (
                      <div className="text-[10px] text-muted-foreground">
                        Last taken {new Date(attempt.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </div>
                    )}
                  </div>
                  {result && (
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        {result.visibility === "Only Me" ? (
                          <Lock className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3 text-primary" />
                        )}
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-violet-50 text-violet-700 border border-violet-200" style={{ fontWeight: 600 }}>
                        Retake
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Export note */}
          {isOwnProfile && completedAttempts.length >= 2 && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[11px] text-muted-foreground">
                    Verified reports available for resume &amp; export
                  </span>
                </div>
                <button
                  onClick={() => navigate("/assessment-center")}
                  className="text-[11px] text-primary hover:underline"
                  style={{ fontWeight: 600 }}
                >
                  Manage sharing →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
