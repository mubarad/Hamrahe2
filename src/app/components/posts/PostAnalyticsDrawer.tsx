import { useState, useEffect } from "react";
import { generateMockPostAnalytics } from "../../utils/post-analytics-mock";
import { PostAnalyticsData } from "../../types/post-types";
import { BarChart3, Eye, Heart, MessageSquare, Repeat2, Bookmark, Send, Users, UserPlus, X, TrendingUp, Sparkles } from "lucide-react";

interface PostAnalyticsDrawerProps {
  postId: string;
  postType?: string;
  onClose: () => void;
}

export function PostAnalyticsDrawer({ postId, postType, onClose }: PostAnalyticsDrawerProps) {
  const [data, setData] = useState<PostAnalyticsData | null>(null);

  useEffect(() => {
    setData(generateMockPostAnalytics(postId, postType));
  }, [postId, postType]);

  if (!data) return null;

  return (
    <div className="p-5 bg-card border border-border/30 rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] flex flex-col">
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Post Analytics & Performance</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-4 space-y-4 overflow-y-auto pr-1 flex-1">
        {/* Core Reach Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-3 bg-muted/20 border border-border/20 rounded-xl text-center">
            <p className="text-[10px] uppercase font-semibold text-muted-foreground">Impressions</p>
            <p className="text-base font-bold text-foreground mt-0.5">{data.impressions.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-muted/20 border border-border/20 rounded-xl text-center">
            <p className="text-[10px] uppercase font-semibold text-muted-foreground">Reach</p>
            <p className="text-base font-bold text-foreground mt-0.5">{data.reach.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-muted/20 border border-border/20 rounded-xl text-center">
            <p className="text-[10px] uppercase font-semibold text-muted-foreground">Reactions</p>
            <p className="text-base font-bold text-primary mt-0.5">{data.reactions}</p>
          </div>
          <div className="p-3 bg-muted/20 border border-border/20 rounded-xl text-center">
            <p className="text-[10px] uppercase font-semibold text-muted-foreground">Saves</p>
            <p className="text-base font-bold text-emerald-600 mt-0.5">{data.saves}</p>
          </div>
        </div>

        {/* Engagement Breakdown */}
        <div className="p-3 bg-muted/20 border border-border/20 rounded-xl space-y-2">
          <p className="text-xs font-semibold text-foreground">Engagement Breakdown</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-card rounded-lg">
              <span className="text-muted-foreground">Comments & Replies</span>
              <span className="font-semibold text-foreground">{data.comments}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-card rounded-lg">
              <span className="text-muted-foreground">Reposts & Quotes</span>
              <span className="font-semibold text-foreground">{data.reposts + data.quotePosts}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-card rounded-lg">
              <span className="text-muted-foreground">Direct Message Sends</span>
              <span className="font-semibold text-foreground">{data.sends}</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-card rounded-lg">
              <span className="text-muted-foreground">Link / CTA Clicks</span>
              <span className="font-semibold text-foreground">{data.linkClicks}</span>
            </div>
          </div>
        </div>

        {/* Professional Outcomes */}
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <p className="text-xs font-semibold text-primary">Professional Outcomes Generated</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2 bg-card rounded-lg text-center">
              <p className="text-[10px] text-muted-foreground">Profile Views</p>
              <p className="font-bold text-foreground mt-0.5">+{data.profileViews}</p>
            </div>
            <div className="p-2 bg-card rounded-lg text-center">
              <p className="text-[10px] text-muted-foreground">New Followers</p>
              <p className="font-bold text-foreground mt-0.5">+{data.newFollowers}</p>
            </div>
            <div className="p-2 bg-card rounded-lg text-center">
              <p className="text-[10px] text-muted-foreground">Connection Requests</p>
              <p className="font-bold text-foreground mt-0.5">+{data.connectionRequests}</p>
            </div>
          </div>
        </div>

        {/* Media / Video Metrics if available */}
        {data.videoStarts && (
          <div className="p-3 bg-muted/20 border border-border/20 rounded-xl space-y-2">
            <p className="text-xs font-semibold text-foreground">Video Performance</p>
            <div className="grid grid-cols-3 gap-2 text-xs text-center">
              <div className="p-2 bg-card rounded-lg">
                <p className="text-[10px] text-muted-foreground">Starts</p>
                <p className="font-semibold text-foreground">{data.videoStarts}</p>
              </div>
              <div className="p-2 bg-card rounded-lg">
                <p className="text-[10px] text-muted-foreground">Avg Watch Time</p>
                <p className="font-semibold text-foreground">{data.avgWatchTime}</p>
              </div>
              <div className="p-2 bg-card rounded-lg">
                <p className="text-[10px] text-muted-foreground">Completion Rate</p>
                <p className="font-semibold text-foreground">{data.completionRate}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end pt-3 border-t border-border/20 mt-3">
        <button onClick={onClose} className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-medium cursor-pointer">
          Close Analytics
        </button>
      </div>
    </div>
  );
}
