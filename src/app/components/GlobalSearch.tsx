import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, X, User, Building2, Briefcase, FileText,
  Rocket, ArrowRight, Clock, TrendingUp, Command,
} from "lucide-react";
import { users, feedPosts, feedJobs, iranCompanies } from "../data/mock-data";

interface SearchResult {
  id: string;
  type: "person" | "company" | "job" | "post";
  title: string;
  subtitle: string;
  avatar?: string;
  initials?: string;
  path: string;
  badge?: string;
}

const RECENT_SEARCHES = ["Senior Product Designer", "Snapp", "Ali Mohammadi", "Remote jobs"];

function buildResults(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  users.forEach(u => {
    if (u.name.toLowerCase().includes(q) || u.title.toLowerCase().includes(q) || u.company.toLowerCase().includes(q)) {
      results.push({
        id: `person-${u.id}`,
        type: "person",
        title: u.name,
        subtitle: `${u.title} · ${u.company}`,
        avatar: u.avatar,
        path: `/profile/${u.id}`,
        badge: u.verified ? "Verified" : undefined,
      });
    }
  });

  iranCompanies.forEach(c => {
    if (c.name.toLowerCase().includes(q) || c.industry.toLowerCase().includes(q)) {
      results.push({
        id: `company-${c.id}`,
        type: "company",
        title: c.name,
        subtitle: `${c.industry} · ${c.openRoles} open roles`,
        initials: c.logo,
        path: `/company/${c.name.toLowerCase().replace(/\s+/g, "-")}`,
      });
    }
  });

  feedJobs.forEach(j => {
    if (j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)) {
      results.push({
        id: `job-${j.id}`,
        type: "job",
        title: j.title,
        subtitle: `${j.company} · ${j.location} · ${j.salary ?? ""}`,
        initials: j.company[0],
        path: `/jobs`,
        badge: `${j.matchScore}% match`,
      });
    }
  });

  feedPosts.forEach(p => {
    if (p.content.toLowerCase().includes(q) || p.author.name.toLowerCase().includes(q)) {
      results.push({
        id: `post-${p.id}`,
        type: "post",
        title: p.author.name,
        subtitle: p.content.slice(0, 80) + "...",
        avatar: p.author.avatar,
        path: `/`,
      });
    }
  });

  return results.slice(0, 8);
}

const typeIcon = {
  person: User,
  company: Building2,
  job: Briefcase,
  post: FileText,
};

const typeLabel = {
  person: "Person",
  company: "Company",
  job: "Job",
  post: "Post",
};

const typeColor = {
  person: "text-primary bg-primary/10",
  company: "text-violet-600 bg-violet-50",
  job: "text-emerald-600 bg-emerald-50",
  post: "text-amber-600 bg-amber-50",
};

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

export function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setActiveIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const built = buildResults(query);
    setResults(built);
    setActiveIndex(-1);
  }, [query]);

  const handleSelect = useCallback((path: string) => {
    navigate(path);
    onClose();
  }, [navigate, onClose]);

  const handleSearchAll = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const max = query ? results.length - 1 : RECENT_SEARCHES.length - 1;
      setActiveIndex(i => Math.min(i + 1, max));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) {
        if (query && results[activeIndex]) {
          handleSelect(results[activeIndex].path);
        } else if (!query && RECENT_SEARCHES[activeIndex]) {
          setQuery(RECENT_SEARCHES[activeIndex]);
        }
      } else if (query.trim()) {
        handleSearchAll();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    if (!acc[r.type]) acc[r.type] = [];
    acc[r.type].push(r);
    return acc;
  }, {});

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.2, type: "spring", bounce: 0.15 }}
            className="fixed top-[80px] left-1/2 -translate-x-1/2 w-full max-w-[640px] z-[101] px-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-border/20 overflow-hidden">
              {/* Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border/15">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search people, companies, jobs, posts..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
                />
                <div className="flex items-center gap-2">
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="p-1 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  )}
                  <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-muted/60 rounded-lg text-[11px] text-muted-foreground border border-border/30">
                    <span>esc</span>
                  </kbd>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[420px] overflow-y-auto">
                {!query ? (
                  <div className="p-4">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider px-2 mb-2">Recent searches</p>
                    <div className="space-y-0.5">
                      {RECENT_SEARCHES.map((s, i) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-left ${
                            activeIndex === i ? "bg-muted/60" : "hover:bg-muted/40"
                          }`}
                        >
                          <Clock className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                          <span className="text-sm text-foreground/80">{s}</span>
                        </button>
                      ))}
                    </div>

                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider px-2 mb-2 mt-4">Trending</p>
                    <div className="flex flex-wrap gap-2 px-2">
                      {["Product Designer", "Snapp", "Remote jobs", "UI/UX", "Senior Dev"].map(tag => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full text-xs text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer"
                        >
                          <TrendingUp className="w-3 h-3" />
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  <div className="py-12 text-center">
                    <Search className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No results for "{query}"</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Try a different search term</p>
                  </div>
                ) : (
                  <div className="p-2">
                    {(["person", "company", "job", "post"] as const).map(type => {
                      const group = grouped[type];
                      if (!group?.length) return null;
                      const Icon = typeIcon[type];
                      return (
                        <div key={type} className="mb-3">
                          <p className="text-[11px] text-muted-foreground uppercase tracking-wider px-3 mb-1 flex items-center gap-1.5">
                            <Icon className="w-3 h-3" />
                            {typeLabel[type]}s
                          </p>
                          <div className="space-y-0.5">
                            {group.map(r => {
                              const globalIndex = results.indexOf(r);
                              const RIcon = typeIcon[r.type];
                              return (
                                <button
                                  key={r.id}
                                  onClick={() => handleSelect(r.path)}
                                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-left ${
                                    activeIndex === globalIndex ? "bg-primary/5" : "hover:bg-muted/40"
                                  }`}
                                >
                                  {r.avatar ? (
                                    <img src={r.avatar} alt={r.title} className="w-9 h-9 rounded-full object-cover shrink-0" />
                                  ) : (
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${typeColor[r.type]}`}>
                                      <span className="text-sm">{r.initials}</span>
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-foreground truncate">{r.title}</p>
                                    <p className="text-xs text-muted-foreground truncate">{r.subtitle}</p>
                                  </div>
                                  {r.badge && (
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${typeColor[r.type]}`}>
                                      {r.badge}
                                    </span>
                                  )}
                                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-2.5 border-t border-border/10 flex items-center gap-4 bg-muted/20">
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 bg-white border border-border/30 rounded text-[10px]">↑↓</kbd>
                  navigate
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 bg-white border border-border/30 rounded text-[10px]">↵</kbd>
                  open
                </div>
                {query && results.length > 0 && (
                  <button onClick={handleSearchAll} className="text-[11px] text-primary cursor-pointer hover:underline ml-auto flex items-center gap-1">
                    See all results for "{query}" <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                {!query && (
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground ml-auto">
                    <Command className="w-3 h-3" />
                    <span>K to search</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function useGlobalSearch() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return { open, setOpen };
}
