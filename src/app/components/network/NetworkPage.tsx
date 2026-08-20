import { useState } from "react";
import { useNavigate } from "react-router";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { users, currentUser, IMAGES } from "../../data/mock-data";
import {
  UserPlus, UserCheck, UserX, Search, X, Users,
  Building2, GraduationCap, Clock, Check, Loader2,
  Filter, ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface ConnectionRequest {
  id: string;
  user: typeof users[0];
  mutualConnections: number;
  timeAgo: string;
  message?: string;
}

const pendingRequests: ConnectionRequest[] = [
  { id: "cr1", user: users[1], mutualConnections: 12, timeAgo: "2d", message: "Hi Ahmad, I loved your recent article on design systems!" },
  { id: "cr2", user: users[3], mutualConnections: 5, timeAgo: "5d" },
  { id: "cr3", user: { id: "6", name: "Parisa Tehrani", title: "Product Manager", company: "Snapp", avatar: IMAGES.avatars.designer, verified: false }, mutualConnections: 8, timeAgo: "1w", message: "We met at Tehran Tech Conference!" },
];

const suggestedPeople = [
  { id: "s1", name: "Mehdi Akbari", title: "Senior Backend Engineer", company: "Digikala", avatar: IMAGES.avatars.ali, mutual: 23, reason: "Works at your company" },
  { id: "s2", name: "Fatemeh Noori", title: "Product Designer", company: "Snapp", avatar: IMAGES.avatars.mina, mutual: 15, reason: "Similar role" },
  { id: "s3", name: "Hossein Moradi", title: "DevOps Engineer", company: "Tapsi", avatar: IMAGES.avatars.reza, mutual: 9, reason: "From your school" },
  { id: "s4", name: "Leila Pakdel", title: "UX Writer", company: "Cafe Bazaar", avatar: IMAGES.avatars.designer, mutual: 7, reason: "In your field" },
  { id: "s5", name: "Babak Salehi", title: "CTO", company: "Torob", avatar: IMAGES.avatars.developer, mutual: 18, reason: "Viewed your profile" },
  { id: "s6", name: "Niloofar Azizi", title: "Data Analyst", company: "Divar", avatar: IMAGES.avatars.ahmad, mutual: 4, reason: "Connected to Ali Mohammadi" },
];

const companiestoFollow = [
  { id: "co1", name: "Snapp", industry: "Technology", followers: "125K", logo: "S" },
  { id: "co2", name: "Digikala", industry: "E-commerce", followers: "230K", logo: "D" },
  { id: "co3", name: "Tapsi", industry: "Transportation", followers: "89K", logo: "T" },
  { id: "co4", name: "Cafe Bazaar", industry: "App Store", followers: "67K", logo: "C" },
];

const FILTER_OPTIONS = ["All", "Same company", "Same field", "From school", "Viewed your profile"];

export function NetworkPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState(pendingRequests);
  const [accepted, setAccepted] = useState<Set<string>>(new Set());
  const [ignored, setIgnored] = useState<Set<string>>(new Set());
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const [followed, setFollowed] = useState<Set<string>>(new Set());
  const [loadingConnect, setLoadingConnect] = useState<Set<string>>(new Set());
  const [loadingFollow, setLoadingFollow] = useState<Set<string>>(new Set());
  const [loadingAccept, setLoadingAccept] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const handleAccept = (id: string) => {
    setLoadingAccept(prev => new Set(prev).add(id));
    setTimeout(() => {
      setLoadingAccept(prev => { const n = new Set(prev); n.delete(id); return n; });
      setAccepted(prev => new Set(prev).add(id));
      toast.success("Connection accepted!");
    }, 800);
  };

  const handleIgnore = (id: string) => {
    setIgnored(prev => new Set(prev).add(id));
    toast("Request ignored");
  };

  const handleConnect = (id: string) => {
    if (connected.has(id)) {
      setConnected(prev => { const n = new Set(prev); n.delete(id); return n; });
      toast("Connection request withdrawn");
      return;
    }
    setLoadingConnect(prev => new Set(prev).add(id));
    setTimeout(() => {
      setLoadingConnect(prev => { const n = new Set(prev); n.delete(id); return n; });
      setConnected(prev => new Set(prev).add(id));
      toast.success("Connection request sent!");
    }, 700);
  };

  const handleFollow = (id: string) => {
    if (followed.has(id)) {
      setFollowed(prev => { const n = new Set(prev); n.delete(id); return n; });
      toast("Unfollowed");
      return;
    }
    setLoadingFollow(prev => new Set(prev).add(id));
    setTimeout(() => {
      setLoadingFollow(prev => { const n = new Set(prev); n.delete(id); return n; });
      setFollowed(prev => new Set(prev).add(id));
      toast.success("Now following!");
    }, 600);
  };

  const visibleRequests = requests.filter(r => !ignored.has(r.id));

  const filteredSuggestions = suggestedPeople.filter(p => {
    const matchesSearch = !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === "All" ||
      (activeFilter === "Same company" && p.reason === "Works at your company") ||
      (activeFilter === "Same field" && (p.reason === "Similar role" || p.reason === "In your field")) ||
      (activeFilter === "From school" && p.reason === "From your school") ||
      (activeFilter === "Viewed your profile" && p.reason === "Viewed your profile");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
      {/* Left sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-[76px] space-y-3">
          <Card>
            <h3 className="text-sm text-foreground mb-3">Manage my network</h3>
            <div className="space-y-1">
              {[
                { icon: Users, label: "Connections", count: currentUser.connectionCount },
                { icon: UserPlus, label: "Invitations", count: visibleRequests.length },
                { icon: Building2, label: "Companies", count: 14 },
                { icon: GraduationCap, label: "Groups", count: 4 },
                { icon: Clock, label: "Pending", count: connected.size },
              ].map(item => (
                <button key={item.label} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-xs text-primary" style={{ fontWeight: 600 }}>{item.count}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </aside>

      {/* Main content */}
      <div className="space-y-5 min-w-0">
        {/* Search + Filter bar */}
        <div className="flex gap-2">
          <div className="flex items-center gap-3 flex-1 bg-card border border-border/30 rounded-2xl px-5 py-3 shadow-sm">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search your network..."
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="cursor-pointer">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm cursor-pointer transition-all ${
              activeFilter !== "All" || showFilters
                ? "border-primary/30 bg-primary/5 text-primary"
                : "border-border/30 bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
            {activeFilter !== "All" && <span className="w-2 h-2 bg-primary rounded-full" />}
          </button>
        </div>

        {/* Filter chips */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2 overflow-hidden"
            >
              {FILTER_OPTIONS.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all ${
                    activeFilter === f
                      ? "bg-primary text-white"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pending Invitations */}
        {visibleRequests.length > 0 && !searchQuery && activeFilter === "All" && (
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-foreground">Invitations ({visibleRequests.length})</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {visibleRequests.map(req => (
                <motion.div
                  key={req.id}
                  layout
                  className="border border-border/30 rounded-2xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col items-center text-center">
                    <button onClick={() => navigate(`/profile/${req.user.id}`)} className="cursor-pointer">
                      <Avatar src={req.user.avatar} name={req.user.name} size="lg" verified={req.user.verified} />
                    </button>
                    <button
                      onClick={() => navigate(`/profile/${req.user.id}`)}
                      className="text-sm text-foreground mt-3 hover:text-primary hover:underline transition-colors cursor-pointer"
                    >
                      {req.user.name}
                    </button>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate w-full">{req.user.title}</p>
                    <p className="text-[11px] text-muted-foreground/70">{req.user.company}</p>
                    <div className="flex items-center justify-center gap-1 mt-1.5 text-[11px] text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{req.mutualConnections} mutual connections</span>
                    </div>
                    {req.message && (
                      <div className="mt-3 p-2.5 bg-muted/30 rounded-xl border-l-2 border-primary/30 w-full">
                        <p className="text-xs text-muted-foreground italic line-clamp-2">"{req.message}"</p>
                      </div>
                    )}
                    <div className="flex flex-col gap-2 mt-3 w-full">
                      {accepted.has(req.id) ? (
                        <div className="flex items-center justify-center gap-1.5 text-emerald-600 text-sm py-2">
                          <UserCheck className="w-4 h-4" />
                          <span>Connected!</span>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAccept(req.id)}
                            disabled={loadingAccept.has(req.id)}
                            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#7c3aed] text-white text-sm cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-70"
                          >
                            {loadingAccept.has(req.id)
                              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              : <UserCheck className="w-3.5 h-3.5" />
                            }
                            {loadingAccept.has(req.id) ? "Accepting..." : "Accept"}
                          </button>
                          <button
                            onClick={() => handleIgnore(req.id)}
                            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-muted/40 text-muted-foreground text-sm cursor-pointer hover:bg-muted/60 transition-colors"
                          >
                            <UserX className="w-3.5 h-3.5" /> Ignore
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        {/* People You May Know */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-foreground">People you may know</h3>
            {(searchQuery || activeFilter !== "All") && (
              <span className="text-xs text-muted-foreground">{filteredSuggestions.length} result{filteredSuggestions.length !== 1 ? "s" : ""}</span>
            )}
          </div>

          {filteredSuggestions.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-foreground">No people found</p>
              <p className="text-xs text-muted-foreground mt-1">
                {searchQuery ? `No results for "${searchQuery}"` : `No suggestions for this filter`}
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
                className="mt-3 text-sm text-primary hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSuggestions.map(person => (
                <motion.div
                  key={person.id}
                  layout
                  className="border border-border/30 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-16 bg-gradient-to-r from-primary/10 to-violet-100" />
                  <div className="px-4 pb-4 -mt-6 text-center">
                    <button onClick={() => navigate(`/profile/${person.id}`)} className="cursor-pointer">
                      <img src={person.avatar} alt={person.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white mx-auto" />
                    </button>
                    <button
                      onClick={() => navigate(`/profile/${person.id}`)}
                      className="text-sm text-foreground mt-2 truncate hover:text-primary hover:underline transition-colors cursor-pointer block w-full"
                    >
                      {person.name}
                    </button>
                    <p className="text-xs text-muted-foreground truncate">{person.title}</p>
                    <p className="text-[11px] text-muted-foreground/70">{person.company}</p>
                    <div className="flex items-center justify-center gap-1 mt-1.5 text-[11px] text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{person.mutual} mutual</span>
                    </div>
                    <p className="text-[10px] text-primary/70 mt-0.5">{person.reason}</p>
                    <div className="mt-3">
                      {connected.has(person.id) ? (
                        <button
                          onClick={() => handleConnect(person.id)}
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs cursor-pointer hover:bg-emerald-100 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" /> Pending
                        </button>
                      ) : (
                        <button
                          onClick={() => handleConnect(person.id)}
                          disabled={loadingConnect.has(person.id)}
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-xl border border-border/40 text-foreground text-xs cursor-pointer hover:bg-muted/40 transition-colors disabled:opacity-70"
                        >
                          {loadingConnect.has(person.id)
                            ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            : <UserPlus className="w-3.5 h-3.5" />
                          }
                          {loadingConnect.has(person.id) ? "Sending..." : "Connect"}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        {/* Companies to Follow */}
        <Card>
          <h3 className="text-sm text-foreground mb-4">Companies to follow</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {companiestoFollow.map(co => {
              const companySlug = co.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <div key={co.id} className="flex items-center gap-4 p-3 border border-border/20 rounded-xl hover:bg-muted/20 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-violet-100 flex items-center justify-center shrink-0">
                    <span className="text-primary text-lg" style={{ fontWeight: 700 }}>{co.logo}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/company/${companySlug}`)}
                    className="flex-1 min-w-0 text-left cursor-pointer"
                  >
                    <h4 className="text-sm text-foreground hover:text-primary transition-colors">{co.name}</h4>
                    <p className="text-xs text-muted-foreground">{co.industry} · {co.followers} followers</p>
                  </button>
                  <button
                    onClick={() => handleFollow(co.id)}
                    disabled={loadingFollow.has(co.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all disabled:opacity-70 ${
                      followed.has(co.id)
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "border border-border/40 text-foreground hover:bg-muted/40"
                    }`}
                  >
                    {loadingFollow.has(co.id) ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : followed.has(co.id) ? (
                      <><Check className="w-3.5 h-3.5" /> Following</>
                    ) : (
                      "+ Follow"
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
