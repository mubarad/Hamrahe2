import { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { MatchScore } from "../ui/MatchScore";
import { projects, iranCompanies, iranEvents, type Project } from "../../data/mock-data";
import {
  Search, X, SlidersHorizontal, MapPin, Clock, Users, Bookmark, Zap,
  Briefcase, Lightbulb, DollarSign, Calendar, ArrowRight, Building2,
  TrendingUp, Star, ExternalLink, AlertCircle, Filter,
} from "lucide-react";
import { motion } from "motion/react";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";

type ProjectFilter = "all" | "freelance" | "consulting" | "short-term";

export function ProjectsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [savedProjects, setSavedProjects] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0]);
  const [activeTab, setActiveTab] = useState<"projects" | "companies" | "events">("projects");

  const toggleSave = (id: string) => {
    setSavedProjects(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast("Project removed from saved");
      } else {
        next.add(id);
        toast.success("Project saved!");
      }
      return next;
    });
  };

  const filtered = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || p.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Tabs: Projects / Iran Market / Events */}
      <div className="flex items-center gap-1 bg-muted/50 rounded-xl p-1 w-fit mb-5">
        {(["projects", "companies", "events"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm cursor-pointer transition-all capitalize ${
              activeTab === tab ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "projects" ? "🟡 Project Market" : tab === "companies" ? "🇮🇷 Iran Companies" : "📅 Events"}
          </button>
        ))}
      </div>

      {activeTab === "projects" && (
        <>
          {/* Search & Filters */}
          <div className="bg-card border border-border/30 rounded-2xl p-5 mb-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 bg-muted/50 rounded-2xl px-4 py-2.5 flex-1 border border-border/20 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search projects, companies..." className="flex-1 bg-transparent text-sm focus:outline-none" />
                {searchQuery && <button onClick={() => setSearchQuery("")} className="cursor-pointer"><X className="w-4 h-4 text-muted-foreground" /></button>}
              </div>
            </div>
            <div className="flex gap-2">
              {(["all", "freelance", "consulting", "short-term"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-full text-xs cursor-pointer transition-all capitalize ${
                  filter === f ? "bg-gradient-to-r from-[#0066FF] to-[#7c3aed] text-white shadow-sm" : "bg-muted/50 text-muted-foreground hover:bg-muted border border-border/20"
                }`}>
                  {f === "all" ? "All Projects" : f === "short-term" ? "Short-term" : f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground">{filtered.length} projects available</span>
          </div>

          {/* Split layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-5">
            {/* List */}
            <div className="space-y-2 lg:max-h-[calc(100vh-260px)] lg:overflow-y-auto lg:pr-1">
              {filtered.length === 0 && (
                <div className="py-12 text-center bg-card border border-border/30 rounded-2xl">
                  <Briefcase className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-foreground">No projects found</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {searchQuery ? `No results for "${searchQuery}"` : "No projects in this category yet"}
                  </p>
                  <button
                    onClick={() => { setSearchQuery(""); setFilter("all"); }}
                    className="mt-3 text-sm text-primary hover:underline cursor-pointer"
                  >
                    Clear filters
                  </button>
                </div>
              )}
              {filtered.map((project, idx) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                  <div
                    onClick={() => setSelectedProject(project)}
                    className={`bg-card border rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md relative overflow-hidden ${
                      selectedProject?.id === project.id ? "border-primary/30 shadow-md ring-1 ring-primary/10" : "border-border/30 shadow-sm"
                    }`}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{
                      background: project.matchScore >= 90 ? "linear-gradient(to bottom, #00C853, #0066FF)" : project.matchScore >= 80 ? "linear-gradient(to bottom, #0066FF, #7c3aed)" : "#FF9800",
                    }} />
                    <div className="pl-2">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm text-foreground truncate">{project.title}</h4>
                            {project.urgent && <span className="px-1.5 py-0.5 bg-red-50 text-red-600 text-[10px] rounded-md border border-red-200">Urgent</span>}
                          </div>
                          <Link
                            to={`/company/${project.company.toLowerCase().replace(/\s+/g, "-")}`}
                            className="text-xs text-muted-foreground mt-0.5 hover:text-primary hover:underline transition-colors inline-block"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {project.company}
                          </Link>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{project.budget}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{project.duration}</span>
                          </div>
                        </div>
                        <MatchScore score={project.matchScore} size="sm" />
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant={project.type === "freelance" ? "primary" : project.type === "consulting" ? "warning" : "default"} size="sm">{project.type}</Badge>
                        <Badge variant="outline" size="sm"><Users className="w-3 h-3" />{project.applicants}</Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Detail panel */}
            <div className="hidden lg:block">
              {selectedProject ? (
                <div className="bg-card border border-border/30 rounded-2xl shadow-sm sticky top-[76px] max-h-[calc(100vh-100px)] overflow-y-auto">
                  <div className="p-6 space-y-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-foreground">{selectedProject.title}</h2>
                          {selectedProject.urgent && <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-lg border border-red-200">Urgent</span>}
                        </div>
                        <Link
                          to={`/company/${selectedProject.company.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm text-muted-foreground mt-1 hover:text-primary hover:underline transition-colors inline-block"
                        >
                          {selectedProject.company}
                        </Link>
                      </div>
                      <MatchScore score={selectedProject.matchScore} size="lg" />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { icon: DollarSign, label: "Budget", value: selectedProject.budget },
                        { icon: Clock, label: "Duration", value: selectedProject.duration },
                        { icon: Users, label: "Applicants", value: `${selectedProject.applicants}` },
                      ].map(item => (
                        <div key={item.label} className="p-3 bg-muted/20 rounded-xl text-center">
                          <item.icon className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="text-sm text-foreground mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedProject.description}</p>
                    </div>

                    <div>
                      <h3 className="text-sm text-foreground mb-2">Required Skills</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.skills.map(s => (
                          <span key={s} className="px-2.5 py-1 bg-primary/5 text-primary text-xs rounded-lg">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-border/20">
                      <Button
                        variant="gradient"
                        className="flex-1"
                        onClick={() => toast.success(`Applied to ${selectedProject.title}! They'll contact you soon.`)}
                      >
                        <Zap className="w-4 h-4" /> Apply Now
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => toggleSave(selectedProject.id)} className={savedProjects.has(selectedProject.id) ? "text-violet-500" : ""}>
                        <Bookmark className={`w-5 h-5 ${savedProjects.has(selectedProject.id) ? "fill-violet-500" : ""}`} />
                      </Button>
                    </div>

                    <p className="text-[11px] text-muted-foreground text-center">Posted {selectedProject.postedAgo}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-card border border-border/30 rounded-2xl shadow-sm p-12 text-center">
                  <Briefcase className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Select a project to view details</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {activeTab === "companies" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Top Iranian tech companies hiring on Hamrahe</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {iranCompanies.map(co => {
              const companySlug = co.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <Card
                  key={co.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/company/${companySlug}`)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-violet-100 flex items-center justify-center shrink-0">
                      <span className="text-primary text-lg" style={{ fontWeight: 700 }}>{co.logo}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm text-foreground hover:text-primary transition-colors">{co.name}</h3>
                      <p className="text-xs text-muted-foreground">{co.industry}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{co.employees}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{co.hq}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-primary" style={{ fontWeight: 600 }}>{co.openRoles} open roles</span>
                        <Button variant="outline" size="sm">View →</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Upcoming tech events and meetups in Iran</p>
          <div className="space-y-3">
            {iranEvents.map(ev => (
              <Card key={ev.id} className="hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm text-foreground">{ev.title}</h3>
                      <Badge variant={ev.type === "Conference" ? "primary" : ev.type === "Hackathon" ? "success" : "default"} size="sm">{ev.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{ev.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{ev.attendees} attendees</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.success(`Registered for ${ev.title}!`)}>Register</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
