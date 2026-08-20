import { useState, type ElementType } from "react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { ImageWithFallback } from "../../figma/ImageWithFallback";
import {
  Heart,
  MessageSquare,
  Share2,
  Bell,
  BookOpen,
  FileText,
  Briefcase,
  Calendar,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { MOCK_POSTS, PostData } from "../companyMockData";

interface PostsTabProps {
  viewMode: "public" | "loggedIn" | "admin";
}

const POST_TYPES: Record<string, { icon: ElementType; color: string }> = {
  "Hiring Post": { icon: Briefcase, color: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" },
  "Company Update": { icon: Megaphone, color: "bg-primary/10 text-primary" },
  "Culture Post": { icon: Heart, color: "bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400" },
  "Product Update": { icon: TrendingUp, color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" },
  "Learning Recommendation": { icon: BookOpen, color: "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400" },
  Article: { icon: FileText, color: "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400" },
  "Event Post": { icon: Calendar, color: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400" },
};

function PostCard({ post }: { post: PostData }) {
  const [liked, setLiked] = useState(false);
  const typeConfig = POST_TYPES[post.type] || POST_TYPES["Company Update"];
  const TypeIcon = typeConfig.icon;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl overflow-hidden bg-muted shrink-0">
          <img
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&auto=format"
            alt="Snapp"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>
            Snapp
          </p>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-lg inline-flex items-center gap-1 ${typeConfig.color}`}>
              <TypeIcon className="w-3 h-3" />
              {post.type}
            </span>
            <span className="text-xs text-muted-foreground">{post.timestamp}</span>
          </div>
        </div>
        {post.sponsored && (
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full shrink-0" style={{ fontWeight: 600 }}>
            Sponsored
          </span>
        )}
      </div>

      <p className="text-sm text-foreground leading-relaxed mb-3">{post.content}</p>

      {post.image && (
        <div className="rounded-xl overflow-hidden mb-3 h-48">
          <ImageWithFallback
            src={post.image}
            alt="Post image"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
        <span>{(post.likes + (liked ? 1 : 0)).toLocaleString()} likes</span>
        <span>{post.comments} comments</span>
        <span>{post.reshares} reshares</span>
      </div>

      <div className="flex items-center gap-1 pt-2 border-t border-border/20">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-colors flex-1 justify-center ${
            liked ? "bg-red-50 text-red-500 dark:bg-red-900/20" : "hover:bg-muted/40 text-muted-foreground"
          }`}
        >
          <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
          Like
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs hover:bg-muted/40 text-muted-foreground transition-colors flex-1 justify-center">
          <MessageSquare className="w-4 h-4" />
          Comment
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs hover:bg-muted/40 text-muted-foreground transition-colors flex-1 justify-center">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </Card>
  );
}

function NewsletterSection() {
  const [subscribed, setSubscribed] = useState(false);

  const issues = [
    {
      title: "Inside Snapp: Q1 2026 Product Review",
      date: "April 2026",
      reads: "1.2K reads",
      preview: "A look inside our product updates, team growth, and what's coming in Q2.",
    },
    {
      title: "How We Built SnappFood's New Search",
      date: "March 2026",
      reads: "890 reads",
      preview: "Our engineering team shares the story behind the search revamp.",
    },
    {
      title: "Hiring at Snapp: What We Look For",
      date: "February 2026",
      reads: "2.1K reads",
      preview: "Our talent team walks through what makes a strong application at Snapp.",
    },
  ];

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
            Snapp Newsletter
          </h3>
          <p className="text-xs text-muted-foreground">Industry insights, team stories, and hiring updates</p>
        </div>
        <Button
          variant={subscribed ? "outline" : "gradient"}
          size="sm"
          onClick={() => setSubscribed(!subscribed)}
        >
          {subscribed ? (
            <>
              <Bell className="w-3.5 h-3.5" />
              Subscribed
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>

      <div className="space-y-3">
        {issues.map((issue) => (
          <div
            key={issue.title}
            className="p-3 bg-muted/20 hover:bg-muted/40 rounded-xl cursor-pointer transition-colors"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>
                {issue.title}
              </p>
              <span className="text-xs text-muted-foreground shrink-0">{issue.date}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-1">{issue.preview}</p>
            <span className="text-xs text-primary">{issue.reads}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

const POST_FILTERS = ["All", "Hiring", "Culture", "Product", "Articles", "Events"];

export function PostsTab({ viewMode }: PostsTabProps) {
  const [filter, setFilter] = useState("All");

  const filteredPosts =
    filter === "All"
      ? MOCK_POSTS
      : MOCK_POSTS.filter((p) => p.type.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {POST_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-sm transition-colors ${
              filter === f ? "bg-primary text-white" : "bg-muted/40 text-muted-foreground hover:bg-muted/70"
            }`}
            style={{ fontWeight: filter === f ? 600 : 400 }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card className="text-center py-8">
              <p className="text-sm text-muted-foreground">No posts in this category.</p>
            </Card>
          ) : (
            filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
        <div className="space-y-4">
          <NewsletterSection />
          <Card>
            <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>
              Post Categories
            </h3>
            <div className="space-y-2">
              {Object.entries(POST_TYPES).map(([type, { icon: Icon, color }]) => (
                <button
                  key={type}
                  onClick={() => setFilter(type.split(" ")[0])}
                  className="w-full flex items-center gap-2 p-2 hover:bg-muted/30 rounded-xl transition-colors text-left"
                >
                  <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-muted-foreground">{type}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
