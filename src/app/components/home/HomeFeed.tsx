import { useState, useEffect } from "react";
import { Composer } from "./Composer";
import { FeedPost } from "./FeedPost";
import { FeedJobCard } from "./FeedJobCard";
import { LeftSidebar } from "./LeftSidebar";
import { RightSidebar } from "./RightSidebar";
import { PostSkeleton, JobSkeleton } from "../ui/Skeleton";
import { feedPosts, feedJobs } from "../../data/mock-data";
import { ExtendedPost } from "../../types/post-types";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, TrendingUp, Rss, Target, Briefcase, Users, Shield, ChevronRight, LayoutList, Layers, BarChart2, UserPlus, Sparkles, Compass } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type FeedState = "loading" | "active" | "empty" | "error";
type FeedFilter = "all" | "posts" | "opportunities";
type FeedMode = "for_you" | "following";

export function HomeFeed() {
  const [state, setState] = useState<FeedState>("loading");
  const [posts, setPosts] = useState<ExtendedPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [newPostBanner, setNewPostBanner] = useState(false);
  const [feedFilter, setFeedFilter] = useState<FeedFilter>("all");
  const [feedMode, setFeedMode] = useState<FeedMode>("for_you");
  const { currentUser: appUser } = useApp();
  const navigate = useNavigate();

  const isCompany = appUser?.accountType === "company";
  const isStartup = appUser?.accountType === "startup";
  const isOrg = isCompany || isStartup;
  const orgPath = isCompany ? "/company/snapp/admin" : isStartup ? "/startup/nextgen/admin" : "/profile";

  useEffect(() => {
    const timer = setTimeout(() => {
      // Enrich mock posts with distribution context
      const enriched: ExtendedPost[] = feedPosts.map((p, idx) => ({
        ...p,
        distributionReason:
          idx === 0
            ? "Mina Hosseini commented on this"
            : idx === 1
            ? "Suggested because you follow #ProductDesign"
            : undefined,
      }));
      setPosts(enriched);
      setState("active");
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleNewPost = (content: string, extraData?: any) => {
    const newPost: ExtendedPost = {
      id: `new-${Date.now()}`,
      author: {
        id: "me",
        name: appUser?.name ?? "Ahmad Parvizi",
        title: isOrg ? (isCompany ? "Company Account" : "Startup Account") : (appUser?.title ?? "Senior Product Designer"),
        company: appUser?.company ?? "Digikala",
        avatar: appUser?.avatar ?? "",
        verified: appUser?.verified ?? true,
      },
      content,
      type: extraData?.attachments?.some((a: any) => a.type === "video")
        ? "video"
        : extraData?.attachments?.length > 0
        ? "image"
        : "text",
      likes: 0,
      comments: 0,
      shares: 0,
      timeAgo: "Just now",
      liked: false,
      saved: false,
      attachments: extraData?.attachments,
      linkPreview: extraData?.linkPreview,
      structuredData: extraData?.structuredData,
      collaborators: extraData?.collaborators,
      evidence: extraData?.evidence,
      scheduledAt: extraData?.scheduledAt,
      isScheduled: !!extraData?.scheduledAt,
    };

    setPosts([newPost, ...posts]);
    setNewPostBanner(true);
    setTimeout(() => setNewPostBanner(false), 3000);
    toast.success(extraData?.scheduledAt ? "Post scheduled successfully!" : "Post published to your network!");
  };

  const buildFeed = () => {
    const items: { type: "post" | "job"; data: any; key: string }[] = [];

    // Filter by feedMode if applicable
    let displayPosts = [...posts];
    if (feedMode === "following") {
      // In following mode, show posts chronologically
      displayPosts = displayPosts.filter(p => !p.isSponsored);
    }

    if (feedFilter === "posts") {
      displayPosts.forEach((p) => items.push({ type: "post", data: p, key: p.id }));
      return items;
    }

    if (feedFilter === "opportunities") {
      feedJobs.forEach((j) => items.push({ type: "job", data: j, key: j.id }));
      return items;
    }

    // "all" — interleave posts and jobs
    let jobIdx = 0;
    displayPosts.forEach((p, i) => {
      items.push({ type: "post", data: p, key: p.id });
      if ((i + 1) % 2 === 0 && jobIdx < feedJobs.length) {
        items.push({ type: "job", data: feedJobs[jobIdx], key: feedJobs[jobIdx].id });
        jobIdx++;
      }
    });
    return items;
  };

  const metrics = isOrg
    ? [
        {
          icon: BarChart2,
          label: "Page Views",
          value: "1.8k",
          color: "text-primary",
          bg: "bg-primary/5",
          borderColor: "border-primary/15",
          action: () => navigate(orgPath),
        },
        {
          icon: UserPlus,
          label: "New Followers",
          value: "+23",
          color: "text-violet-600",
          bg: "bg-violet-50",
          borderColor: "border-violet-200/60",
          action: () => navigate(orgPath),
        },
        {
          icon: Briefcase,
          label: "Active Jobs",
          value: "5",
          color: "text-amber-600",
          bg: "bg-amber-50",
          borderColor: "border-amber-200/60",
          action: () => navigate("/jobs"),
        },
        {
          icon: Users,
          label: "Applicants",
          value: "38",
          color: "text-emerald-600",
          bg: "bg-emerald-50",
          borderColor: "border-emerald-200/60",
          action: () => navigate("/jobs"),
        },
      ]
    : [
        {
          icon: Shield,
          label: "Trust Score",
          value: `${appUser?.professionalScore ?? 82}%`,
          color: "text-emerald-600",
          bg: "bg-emerald-50",
          borderColor: "border-emerald-200/60",
          action: () => navigate("/profile"),
        },
        {
          icon: Users,
          label: "Profile Views",
          value: "234",
          color: "text-primary",
          bg: "bg-primary/5",
          borderColor: "border-primary/15",
          action: () => navigate("/profile"),
        },
        {
          icon: Briefcase,
          label: "Job Matches",
          value: "12",
          color: "text-amber-600",
          bg: "bg-amber-50",
          borderColor: "border-amber-200/60",
          action: () => navigate("/jobs"),
        },
        {
          icon: Target,
          label: "Applications",
          value: "5",
          color: "text-violet-600",
          bg: "bg-violet-50",
          borderColor: "border-violet-200/60",
          action: () => navigate("/jobs"),
        },
      ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_295px] gap-5">
      {/* Left Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-[76px]">
          <LeftSidebar />
        </div>
      </aside>

      {/* Main Feed */}
      <div className="min-w-0">
        {/* Professional Activity Strip */}
        {state === "active" && (
          <div className="mb-4 hidden lg:block">
            <div className="bg-card border border-border/30 rounded-2xl shadow-sm px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="shrink-0 mr-1">
                  <p className="text-xs text-foreground font-semibold">{isOrg ? "Company" : "Your week"}</p>
                  <p className="text-[10px] text-muted-foreground">{isOrg ? "performance" : "at a glance"}</p>
                </div>
                <div className="w-px h-8 bg-border/40 shrink-0" />
                <div className="flex flex-1 gap-2">
                  {metrics.map((metric, i) => {
                    const Icon = metric.icon;
                    return (
                      <button
                        key={i}
                        onClick={metric.action}
                        className={`flex-1 flex items-center gap-2 px-2.5 py-2 rounded-xl border ${metric.borderColor} ${metric.bg} hover:shadow-sm transition-all cursor-pointer text-left group`}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${metric.color}`} />
                        <div className="min-w-0">
                          <p className={`text-sm leading-none font-bold ${metric.color}`}>
                            {metric.value}
                          </p>
                          <p className="text-[9px] text-muted-foreground mt-0.5 truncate">{metric.label}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => navigate(isOrg ? orgPath : "/ai-engine/analytics")}
                  className="shrink-0 flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {isOrg ? "Full view" : "Analytics"}
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New post success banner */}
        <AnimatePresence>
          {newPostBanner && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 text-center text-sm text-emerald-700 mb-4 font-medium"
            >
              ✓ Your post has been published to your network
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          {/* Loading State */}
          {state === "loading" && (
            <div className="space-y-4">
              <div className="bg-card border border-border/50 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                  <div className="flex-1 h-10 bg-muted rounded-xl animate-pulse" />
                </div>
              </div>
              <PostSkeleton />
              <JobSkeleton />
              <PostSkeleton />
            </div>
          )}

          {/* Active State */}
          {state === "active" && (
            <>
              {/* Composer */}
              <Composer onPost={handleNewPost} />

              {/* Feed Mode Toggle (For You vs Following) & Activity Filters */}
              <div className="flex items-center justify-between gap-2 flex-wrap bg-card border border-border/30 rounded-2xl px-3 py-2 shadow-sm">
                {/* For You / Following Switcher */}
                <div className="flex items-center bg-muted/40 p-1 rounded-xl border border-border/20 text-xs">
                  <button
                    onClick={() => setFeedMode("for_you")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      feedMode === "for_you" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    For You
                  </button>
                  <button
                    onClick={() => setFeedMode("following")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                      feedMode === "following" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Users className="w-3.5 h-3.5 text-amber-500" />
                    Following
                  </button>
                </div>

                {/* Sub Filters */}
                <div className="flex items-center gap-1">
                  {[
                    { key: "all" as FeedFilter, label: "All", icon: Layers },
                    { key: "posts" as FeedFilter, label: "Posts", icon: LayoutList },
                    { key: "opportunities" as FeedFilter, label: "Opportunities", icon: Briefcase },
                  ].map((tab) => {
                    const active = feedFilter === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setFeedFilter(tab.key)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                          active
                            ? "bg-primary text-white"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                  <button
                    onClick={handleRefresh}
                    className={`p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all cursor-pointer ml-1 ${
                      refreshing ? "animate-spin text-primary" : ""
                    }`}
                    title="Refresh feed"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Feed Items */}
              <div className="space-y-4">
                {buildFeed().map((item, idx) => {
                  const prevItem = idx > 0 ? buildFeed()[idx - 1] : null;
                  const showDivider =
                    feedFilter === "all" &&
                    item.type === "job" &&
                    prevItem?.type === "post";

                  return (
                    <div key={item.key}>
                      {showDivider && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-3 my-1"
                        >
                          <div className="h-px flex-1 bg-border/20" />
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-card border border-border/20 rounded-full shadow-sm">
                            <Target className="w-3 h-3 text-primary/60" />
                            <span className="text-[10px] text-muted-foreground">
                              Opportunity matched to your profile
                            </span>
                          </div>
                          <div className="h-px flex-1 bg-border/20" />
                        </motion.div>
                      )}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03, duration: 0.25 }}
                      >
                        {item.type === "post" ? (
                          <FeedPost post={item.data} />
                        ) : (
                          <FeedJobCard job={item.data} />
                        )}
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-[76px]">
          <RightSidebar />
        </div>
      </aside>
    </div>
  );
}
