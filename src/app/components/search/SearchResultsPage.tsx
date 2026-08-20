import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Users, Building2, Briefcase, FileText, Filter, X,
  MapPin, CheckCircle2, UserPlus, UserCheck, ArrowRight, SlidersHorizontal,
  ChevronDown, Loader2, Globe, Clock, Star, Zap,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { users, feedPosts, feedJobs, iranCompanies } from "../../data/mock-data";
import { toast } from "sonner";

type TabType = "all" | "people" | "companies" | "jobs" | "posts";

const LOCATION_FILTERS = ["All Locations", "Tehran", "Isfahan", "Mashhad", "Remote"];
const INDUSTRY_FILTERS = ["All Industries", "Technology", "E-commerce", "Fintech", "Healthcare", "Education"];
const EXPERIENCE_FILTERS = ["Any", "Entry Level", "Mid-Level", "Senior", "Director", "Executive"];
const JOB_TYPE_FILTERS = ["Any", "Full-time", "Part-time", "Freelance", "Remote", "Contract"];

export function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [activeTab, setActiveTab] = useState<TabType>((searchParams.get("tab") as TabType) ?? "all");
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [industryFilter, setIndustryFilter] = useState("All Industries");
  const [experienceFilter, setExperienceFilter] = useState("Any");
  const [jobTypeFilter, setJobTypeFilter] = useState("Any");
  const [connecting, setConnecting] = useState<Set<string>>(new Set());
  const [connected, setConnected] = useState<Set<string>>(new Set());

  // Re-run search when params change
  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    setQuery(q);
    if (q) {
      setLoading(true);
      setTimeout(() => setLoading(false), 600);
    }
  }, [searchParams]);

  const q = query.toLowerCase().trim();

  const matchedPeople = users.filter(u =>
    !q ||
    u.name.toLowerCase().includes(q) ||
    u.title.toLowerCase().includes(q) ||
    u.company.toLowerCase().includes(q)
  ).filter(u =>
    locationFilter === "All Locations" || true
  );

  const matchedCompanies = (iranCompanies as any[]).filter((c: any) =>
    !q ||
    c.name.toLowerCase().includes(q) ||
    c.industry.toLowerCase().includes(q)
  );

  const matchedJobs = (feedJobs as any[]).filter((j: any) =>
    !q ||
    j.title.toLowerCase().includes(q) ||
    j.company.toLowerCase().includes(q)
  ).filter((j: any) =>
    jobTypeFilter === "Any" || j.type === jobTypeFilter
  );

  const matchedPosts = feedPosts.filter(p =>
    !q ||
    p.content.toLowerCase().includes(q) ||
    p.author.name.toLowerCase().includes(q)
  );

  const totalCount = matchedPeople.length + matchedCompanies.length + matchedJobs.length + matchedPosts.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query, tab: activeTab });
  };

  const handleConnect = (userId: string) => {
    setConnecting(prev => new Set([...prev, userId]));
    setTimeout(() => {
      setConnecting(prev => { const n = new Set(prev); n.delete(userId); return n; });
      setConnected(prev => new Set([...prev, userId]));
      toast.success("Connection request sent!");
    }, 700);
  };

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: "all", label: "All", count: totalCount },
    { key: "people", label: "People", count: matchedPeople.length },
    { key: "companies", label: "Companies", count: matchedCompanies.length },
    { key: "jobs", label: "Jobs", count: matchedJobs.length },
    { key: "posts", label: "Posts", count: matchedPosts.length },
  ];

  const activeFilters = [
    locationFilter !== "All Locations" && locationFilter,
    industryFilter !== "All Industries" && industryFilter,
    experienceFilter !== "Any" && experienceFilter,
    jobTypeFilter !== "Any" && jobTypeFilter,
  ].filter(Boolean) as string[];

  return (
    <div className="max-w-[800px] mx-auto">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-5">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search people, companies, jobs, posts..."
            className="w-full pl-12 pr-28 py-3.5 bg-card border border-border/30 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            {query && (
              <button type="button" onClick={() => { setQuery(""); setSearchParams({}); }} className="p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
            <Button type="submit" variant="gradient" size="sm">Search</Button>
          </div>
        </div>
      </form>

      {/* Tabs + filter toggle */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex overflow-x-auto gap-1 bg-muted/30 rounded-xl p-1 flex-1" style={{ scrollbarWidth: "none" }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSearchParams({ q: query, tab: tab.key }); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all whitespace-nowrap shrink-0 ${
                activeTab === tab.key
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                  activeTab === tab.key ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowFilters(f => !f)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs border cursor-pointer transition-all shrink-0 ${
            activeFilters.length > 0 || showFilters
              ? "border-primary/30 text-primary bg-primary/5"
              : "border-border/30 text-muted-foreground hover:border-border/60"
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
        </button>
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeFilters.map(f => (
            <button
              key={f}
              onClick={() => {
                if (LOCATION_FILTERS.includes(f)) setLocationFilter("All Locations");
                if (INDUSTRY_FILTERS.includes(f)) setIndustryFilter("All Industries");
                if (EXPERIENCE_FILTERS.includes(f)) setExperienceFilter("Any");
                if (JOB_TYPE_FILTERS.includes(f)) setJobTypeFilter("Any");
              }}
              className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20 cursor-pointer hover:bg-primary/15 transition-colors"
            >
              {f} <X className="w-3 h-3" />
            </button>
          ))}
          <button
            onClick={() => { setLocationFilter("All Locations"); setIndustryFilter("All Industries"); setExperienceFilter("Any"); setJobTypeFilter("Any"); }}
            className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-4"
          >
            <Card className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Location</label>
                <div className="space-y-1">
                  {LOCATION_FILTERS.map(f => (
                    <button key={f} onClick={() => setLocationFilter(f)}
                      className={`w-full text-left text-xs px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${locationFilter === f ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/40"}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Industry</label>
                <div className="space-y-1">
                  {INDUSTRY_FILTERS.map(f => (
                    <button key={f} onClick={() => setIndustryFilter(f)}
                      className={`w-full text-left text-xs px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${industryFilter === f ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/40"}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Experience</label>
                <div className="space-y-1">
                  {EXPERIENCE_FILTERS.map(f => (
                    <button key={f} onClick={() => setExperienceFilter(f)}
                      className={`w-full text-left text-xs px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${experienceFilter === f ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/40"}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5 block">Job Type</label>
                <div className="space-y-1">
                  {JOB_TYPE_FILTERS.map(f => (
                    <button key={f} onClick={() => setJobTypeFilter(f)}
                      className={`w-full text-left text-xs px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${jobTypeFilter === f ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/40"}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!loading && !q && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-muted-foreground">Search for people, companies, jobs, or posts</p>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {["Product Designer", "Snapp", "Remote jobs", "Engineering Manager"].map(s => (
              <button key={s} onClick={() => { setQuery(s); setSearchParams({ q: s, tab: activeTab }); }}
                className="px-3 py-1.5 bg-muted/50 rounded-full text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {!loading && q && totalCount === 0 && (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-foreground" style={{ fontWeight: 500 }}>No results for "{query}"</p>
          <p className="text-sm text-muted-foreground mt-1">Try different keywords or remove filters</p>
        </div>
      )}

      {/* Results */}
      {!loading && q && (
        <div className="space-y-6">
          {/* PEOPLE */}
          {(activeTab === "all" || activeTab === "people") && matchedPeople.length > 0 && (
            <section>
              {activeTab === "all" && (
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm text-foreground flex items-center gap-2" style={{ fontWeight: 600 }}>
                    <Users className="w-4 h-4 text-primary" /> People
                  </h2>
                  {matchedPeople.length > 3 && (
                    <button onClick={() => { setActiveTab("people"); setSearchParams({ q: query, tab: "people" }); }}
                      className="text-xs text-primary cursor-pointer hover:underline">
                      See all {matchedPeople.length} →
                    </button>
                  )}
                </div>
              )}
              <div className="space-y-2">
                {(activeTab === "all" ? matchedPeople.slice(0, 3) : matchedPeople).map(person => (
                  <Card key={person.id} className="hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <Avatar src={person.avatar} name={person.name} size="lg" verified={person.verified} className="cursor-pointer shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="cursor-pointer" onClick={() => navigate(`/profile/${person.id}`)}>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm text-foreground hover:text-primary transition-colors" style={{ fontWeight: 600 }}>{person.name}</span>
                              {person.verified && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                            </div>
                            <p className="text-xs text-muted-foreground">{person.title} · {person.company}</p>
                            {person.location && (
                              <p className="text-xs text-muted-foreground/60 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3" />{person.location}
                              </p>
                            )}
                          </div>
                          <Button
                            variant={connected.has(person.id) ? "outline" : "outline"}
                            size="sm"
                            onClick={() => !connected.has(person.id) && handleConnect(person.id)}
                            disabled={connecting.has(person.id)}
                            className="shrink-0"
                          >
                            {connecting.has(person.id) ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : connected.has(person.id) ? (
                              <><UserCheck className="w-3.5 h-3.5" /> Connected</>
                            ) : (
                              <><UserPlus className="w-3.5 h-3.5" /> Connect</>
                            )}
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {person.responseRate && person.responseRate >= 80 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] rounded-md border border-emerald-100">
                              <Zap className="w-2.5 h-2.5" /> {person.responseRate}% response rate
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* COMPANIES */}
          {(activeTab === "all" || activeTab === "companies") && matchedCompanies.length > 0 && (
            <section>
              {activeTab === "all" && (
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm text-foreground flex items-center gap-2" style={{ fontWeight: 600 }}>
                    <Building2 className="w-4 h-4 text-violet-600" /> Companies
                  </h2>
                  {matchedCompanies.length > 3 && (
                    <button onClick={() => { setActiveTab("companies"); setSearchParams({ q: query, tab: "companies" }); }}
                      className="text-xs text-primary cursor-pointer hover:underline">
                      See all {matchedCompanies.length} →
                    </button>
                  )}
                </div>
              )}
              <div className="space-y-2">
                {(activeTab === "all" ? matchedCompanies.slice(0, 3) : matchedCompanies).map((company: any) => (
                  <Card key={company.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/company/${company.name.toLowerCase().replace(/\s+/g, "-")}`)}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center text-lg shrink-0">
                        {company.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm text-foreground hover:text-primary transition-colors" style={{ fontWeight: 600 }}>{company.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{company.industry}</p>
                        <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                          <span>{company.employees} employees</span>
                          <span className="text-primary">{company.openRoles} open roles</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={e => { e.stopPropagation(); toast.success(`Following ${company.name}!`); }}>
                        Follow
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* JOBS */}
          {(activeTab === "all" || activeTab === "jobs") && matchedJobs.length > 0 && (
            <section>
              {activeTab === "all" && (
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm text-foreground flex items-center gap-2" style={{ fontWeight: 600 }}>
                    <Briefcase className="w-4 h-4 text-emerald-600" /> Jobs
                  </h2>
                  {matchedJobs.length > 3 && (
                    <button onClick={() => { setActiveTab("jobs"); setSearchParams({ q: query, tab: "jobs" }); }}
                      className="text-xs text-primary cursor-pointer hover:underline">
                      See all {matchedJobs.length} →
                    </button>
                  )}
                </div>
              )}
              <div className="space-y-2">
                {(activeTab === "all" ? matchedJobs.slice(0, 3) : matchedJobs).map((job: any) => (
                  <Card key={job.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate("/jobs")}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-lg shrink-0">
                        {job.company[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground hover:text-primary transition-colors" style={{ fontWeight: 600 }}>{job.title}</p>
                        <p className="text-xs text-muted-foreground">{job.company} · {job.location}</p>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          <span className="px-2 py-0.5 bg-muted/50 text-muted-foreground text-[10px] rounded-md">{job.type}</span>
                          {job.salary && <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] rounded-md">{job.salary}</span>}
                          <span className="px-2 py-0.5 bg-primary/5 text-primary text-[10px] rounded-md">{job.matchScore}% match</span>
                        </div>
                      </div>
                      <span className="text-[11px] text-muted-foreground/60 shrink-0">{job.postedAgo}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* POSTS */}
          {(activeTab === "all" || activeTab === "posts") && matchedPosts.length > 0 && (
            <section>
              {activeTab === "all" && (
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm text-foreground flex items-center gap-2" style={{ fontWeight: 600 }}>
                    <FileText className="w-4 h-4 text-amber-600" /> Posts
                  </h2>
                  {matchedPosts.length > 3 && (
                    <button onClick={() => { setActiveTab("posts"); setSearchParams({ q: query, tab: "posts" }); }}
                      className="text-xs text-primary cursor-pointer hover:underline">
                      See all {matchedPosts.length} →
                    </button>
                  )}
                </div>
              )}
              <div className="space-y-2">
                {(activeTab === "all" ? matchedPosts.slice(0, 3) : matchedPosts).map(post => (
                  <Card key={post.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/posts/${post.id}`)}>
                    <div className="flex items-start gap-3">
                      <Avatar src={post.author.avatar} name={post.author.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-foreground" style={{ fontWeight: 600 }}>{post.author.name}</span>
                          <span className="text-[10px] text-muted-foreground/60">{post.timeAgo}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{post.author.title}</p>
                        <p className="text-sm text-foreground/80 mt-1.5 line-clamp-2 leading-relaxed">{post.content.slice(0, 150)}...</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                        </div>
                      </div>
                      {post.image && <img src={post.image} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />}
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
