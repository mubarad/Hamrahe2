import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Avatar } from "../ui/Avatar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import type { Post } from "../../data/mock-data";
import { currentUser } from "../../data/mock-data";
import {
  Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Send,
  Flame, ThumbsUp, Lightbulb, Star, Rocket, Link as LinkIcon, Mail,
  Instagram, MessageSquare, TrendingUp, HelpCircle, Briefcase, FileText,
  Repeat2, Flag, EyeOff, UserMinus, Copy, ExternalLink, X, BarChart3,
  Sparkles, Pin, Shield, Lock, Eye, Trash2, Edit3, Compass
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

import { ExtendedPost, CommentPermission } from "../../types/post-types";
import { PostAttachmentRenderer } from "../posts/PostAttachmentRenderer";
import { PostAnalyticsDrawer } from "../posts/PostAnalyticsDrawer";
import { PostBoostDialog } from "../posts/PostBoostDialog";
import { ReportDialog } from "../posts/ReportDialog";
import { MuteDialog, BlockDialog } from "../posts/MuteBlockDialogs";
import { SaveCollectionDialog } from "../posts/SaveCollectionDialog";
import { WhyShownDialog } from "../posts/WhyShownDialog";
import { CommentPermissionsDialog } from "../posts/CommentManagement";

const REACTIONS = [
  { type: "heart", icon: Heart, label: "Love", color: "from-red-400 to-pink-500", textColor: "text-red-500", bgColor: "bg-red-50" },
  { type: "fire", icon: Flame, label: "Fire", color: "from-orange-400 to-red-500", textColor: "text-orange-500", bgColor: "bg-orange-50" },
  { type: "thumbsup", icon: ThumbsUp, label: "Applause", color: "from-yellow-400 to-amber-500", textColor: "text-amber-600", bgColor: "bg-amber-50" },
  { type: "lightbulb", icon: Lightbulb, label: "Insightful", color: "from-primary to-violet-500", textColor: "text-primary", bgColor: "bg-primary/5" },
  { type: "star", icon: Star, label: "Amazing", color: "from-violet-400 to-purple-500", textColor: "text-violet-500", bgColor: "bg-violet-50" },
  { type: "rocket", icon: Rocket, label: "Exciting", color: "from-emerald-400 to-teal-500", textColor: "text-emerald-600", bgColor: "bg-emerald-50" },
];

const SHARE_OPTIONS = [
  { type: "instagram", icon: Instagram, label: "Instagram Story", color: "from-pink-500 to-purple-600" },
  { type: "whatsapp", icon: MessageCircle, label: "WhatsApp", color: "from-emerald-500 to-teal-600" },
  { type: "telegram", icon: Send, label: "Telegram", color: "from-blue-400 to-cyan-500" },
  { type: "twitter", icon: MessageSquare, label: "Twitter/X", color: "from-slate-700 to-slate-900" },
  { type: "linkedin", icon: Share2, label: "LinkedIn", color: "from-primary to-blue-600" },
  { type: "copy", icon: LinkIcon, label: "Copy Link", color: "from-gray-400 to-gray-600" },
  { type: "email", icon: Mail, label: "Email", color: "from-indigo-500 to-purple-600" },
];

interface FeedPostProps {
  post: ExtendedPost;
}

export function FeedPost({ post }: FeedPostProps) {
  const isOwnPost = post.author.id === "me" || post.author.name === "Ahmad Parvizi";

  const [reaction, setReaction] = useState<string | null>(post.liked ? "heart" : null);
  const [saved, setSaved] = useState(post.saved);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [repostCount, setRepostCount] = useState(post.shares);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<{ id: number; text: string; authorName?: string; isAuthor?: boolean; pinned?: boolean }[]>([]);
  const [commentSort, setCommentSort] = useState<"relevant" | "newest">("relevant");
  const [commentPermission, setCommentPermission] = useState<CommentPermission>(post.commentPermission || "everyone");

  const [expanded, setExpanded] = useState(false);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showRepostMenu, setShowRepostMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [hidden, setHidden] = useState(false);

  // Modal dialog states
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showBoost, setShowBoost] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showMute, setShowMute] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const [showSaveCollection, setShowSaveCollection] = useState(false);
  const [showWhyShown, setShowWhyShown] = useState(false);
  const [showCommentPerms, setShowCommentPerms] = useState(false);

  const navigate = useNavigate();

  const reactionRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);
  const repostRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (reactionRef.current && !reactionRef.current.contains(event.target as Node)) setShowReactionPicker(false);
      if (shareRef.current && !shareRef.current.contains(event.target as Node)) setShowShareMenu(false);
      if (repostRef.current && !repostRef.current.contains(event.target as Node)) setShowRepostMenu(false);
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) setShowMoreMenu(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function parseContent(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    const regex = /(#\w[\w؀-ۿ]*)|(@[\w؀-ۿ][\w؀-ۿ\s]*)/g;
    let last = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > last) parts.push(text.slice(last, match.index));
      if (match[0].startsWith("#")) {
        const tag = match[0];
        parts.push(
          <button key={match.index} onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}&tab=posts`)}
            className="text-primary hover:underline cursor-pointer">{tag}</button>
        );
      } else {
        parts.push(
          <span key={match.index} className="text-primary cursor-pointer hover:underline">{match[0]}</span>
        );
      }
      last = match.index + match[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  }

  const handleReaction = (type: string) => {
    if (reaction === type) {
      setReaction(null);
      setLikeCount(likeCount - 1);
    } else {
      if (!reaction) setLikeCount(likeCount + 1);
      setReaction(type);
    }
    setShowReactionPicker(false);
  };

  const handleShare = (type: string) => {
    setShowShareMenu(false);
    const messages: Record<string, string> = {
      copy: "Link copied to clipboard!",
      instagram: "Opening Instagram...",
      whatsapp: "Opening WhatsApp...",
      telegram: "Opening Telegram...",
      twitter: "Opening Twitter...",
      linkedin: "Opening LinkedIn...",
      email: "Opening Email...",
    };
    setShareMessage(messages[type] || "Sharing...");
    setTimeout(() => setShareMessage(""), 2000);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    setComments([...comments, { id: Date.now(), text: commentText, authorName: "Ahmad Parvizi", isAuthor: isOwnPost }]);
    setCommentText("");
  };

  const currentReaction = REACTIONS.find(r => r.type === reaction);
  const isLong = post.content.length > 220;
  const displayText = !expanded && isLong ? post.content.slice(0, 220) + "..." : post.content;
  const companySlug = post.author.company.toLowerCase().replace(/\s+/g, "-");

  if (hidden) return null;

  return (
    <div className="bg-card border border-border/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 relative">
      {/* Distribution Reason / Social Context Banner */}
      {post.distributionReason && (
        <div className="px-5 pt-3 pb-1 flex items-center gap-1.5 text-xs text-muted-foreground border-b border-border/10 bg-muted/10">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>{post.distributionReason}</span>
        </div>
      )}

      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${post.author.id}`}>
              <Avatar src={post.author.avatar} name={post.author.name} size="md" verified={post.author.verified} />
            </Link>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <Link to={`/profile/${post.author.id}`} className="text-sm text-foreground hover:text-primary hover:underline transition-colors font-medium">
                  {post.author.name}
                </Link>
                {post.isSponsored && (
                  <span className="px-2 py-0.5 bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20 rounded-md text-[10px] font-semibold">
                    {post.sponsoredLabel || "Promoted"}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {post.author.title} · <Link to={`/company/${companySlug}`} className="hover:text-primary hover:underline transition-colors">{post.author.company}</Link>
              </p>
              <p className="text-[11px] text-muted-foreground/60 mt-0.5">{post.timeAgo} ago</p>
            </div>
          </div>

          {/* Three dot Context Menu */}
          <div ref={moreRef} className="relative">
            <button onClick={() => setShowMoreMenu(m => !m)} className="p-1.5 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground/60" />
            </button>

            <AnimatePresence>
              {showMoreMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 top-full mt-1 w-56 bg-card border border-border/20 rounded-2xl shadow-xl z-20 overflow-hidden"
                >
                  {isOwnPost ? (
                    <>
                      <button onClick={() => { setShowAnalytics(true); setShowMoreMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-foreground/80 hover:bg-muted/40 cursor-pointer">
                        <BarChart3 className="w-4 h-4 text-primary shrink-0" /> View Post Analytics
                      </button>
                      <button onClick={() => { setShowBoost(true); setShowMoreMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-foreground/80 hover:bg-muted/40 cursor-pointer">
                        <Rocket className="w-4 h-4 text-violet-500 shrink-0" /> Boost Post
                      </button>
                      <button onClick={() => { setShowCommentPerms(true); setShowMoreMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-foreground/80 hover:bg-muted/40 cursor-pointer">
                        <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" /> Manage Comment Settings
                      </button>
                      <button onClick={() => { setHidden(true); toast.success("Post archived"); setShowMoreMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-amber-600 hover:bg-amber-50 cursor-pointer border-t border-border/10">
                        <Bookmark className="w-4 h-4 shrink-0" /> Archive Post
                      </button>
                      <button onClick={() => { setHidden(true); toast.success("Post deleted"); setShowMoreMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 cursor-pointer">
                        <Trash2 className="w-4 h-4 shrink-0" /> Delete Post
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setShowSaveCollection(true); setShowMoreMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-foreground/80 hover:bg-muted/40 cursor-pointer">
                        <Bookmark className="w-4 h-4 text-primary shrink-0" /> Save to Collection
                      </button>
                      <button onClick={() => { setShowWhyShown(true); setShowMoreMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-foreground/80 hover:bg-muted/40 cursor-pointer">
                        <HelpCircle className="w-4 h-4 text-violet-500 shrink-0" /> Why am I seeing this?
                      </button>
                      <button onClick={() => { setHidden(true); toast("Post hidden"); setShowMoreMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-foreground/80 hover:bg-muted/40 cursor-pointer">
                        <EyeOff className="w-4 h-4 shrink-0" /> Not Interested
                      </button>
                      <button onClick={() => { setShowMute(true); setShowMoreMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-amber-600 hover:bg-amber-50 cursor-pointer border-t border-border/10">
                        <EyeOff className="w-4 h-4 shrink-0" /> Mute Author
                      </button>
                      <button onClick={() => { setShowBlock(true); setShowMoreMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 cursor-pointer">
                        <UserMinus className="w-4 h-4 shrink-0" /> Block Author
                      </button>
                      <button onClick={() => { setShowReport(true); setShowMoreMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 cursor-pointer">
                        <Flag className="w-4 h-4 shrink-0" /> Report Post
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Content text */}
      <div className="px-5 pb-3">
        <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
          {parseContent(displayText)}
          {isLong && !expanded && (
            <button onClick={() => setExpanded(true)} className="text-primary ml-1 cursor-pointer hover:underline">
              see more
            </button>
          )}
        </p>
      </div>

      {/* Main Image if present */}
      {post.image && (
        <div className="mx-5 mb-3 rounded-xl overflow-hidden">
          <ImageWithFallback src={post.image} alt="Post image" className="w-full max-h-[380px] object-cover" />
        </div>
      )}

      {/* Post Attachments & Context Renderer */}
      <PostAttachmentRenderer
        attachments={post.attachments}
        linkPreview={post.linkPreview}
        structuredData={post.structuredData}
        evidence={post.evidence}
      />

      {/* Stats bar */}
      <div className="px-5 py-2 flex items-center justify-between text-xs text-muted-foreground border-b border-border/10 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1">
            {REACTIONS.slice(0, 3).map((r, i) => {
              const Icon = r.icon;
              return (
                <span key={i} className={`w-4 h-4 bg-gradient-to-r ${r.color} rounded-full flex items-center justify-center ring-1 ring-white`}>
                  <Icon className="w-2.5 h-2.5 text-white fill-white" />
                </span>
              );
            })}
          </div>
          <span className="tabular-nums">{likeCount.toLocaleString()}</span>
        </div>
        <div className="flex gap-3 text-muted-foreground/70">
          <button onClick={() => setShowComments(!showComments)} className="hover:text-foreground transition-colors cursor-pointer hover:underline">
            {post.comments + comments.length} comments
          </button>
          <span>{repostCount} reposts</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-3 py-1.5 flex items-center gap-0.5 relative">
        {/* Reaction Picker */}
        <div ref={reactionRef} className="relative flex-1">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setShowReactionPicker(!showReactionPicker)}
            className={`w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
              currentReaction ? `${currentReaction.textColor} ${currentReaction.bgColor}` : "text-muted-foreground hover:bg-muted/40"
            }`}
          >
            {currentReaction ? (
              <>
                <currentReaction.icon className="w-4 h-4 fill-current" />
                <span className="text-xs">{currentReaction.label}</span>
              </>
            ) : (
              <>
                <Heart className="w-4 h-4" />
                <span className="text-xs">React</span>
              </>
            )}
          </motion.button>

          <AnimatePresence>
            {showReactionPicker && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-0 mb-2 bg-card border border-border/30 rounded-2xl shadow-xl p-2 flex gap-1 z-10"
              >
                {REACTIONS.map((r) => {
                  const Icon = r.icon;
                  return (
                    <motion.button
                      key={r.type}
                      whileHover={{ scale: 1.2, y: -4 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleReaction(r.type)}
                      className="group relative cursor-pointer"
                    >
                      <div className={`w-9 h-9 bg-gradient-to-r ${r.color} rounded-full flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white fill-white" />
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Comment Button */}
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
            showComments ? "text-primary bg-primary/5" : "text-muted-foreground hover:bg-muted/40"
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs">Comment</span>
        </button>

        {/* Repost / Quote Menu */}
        <div ref={repostRef} className="relative flex-1">
          <button
            onClick={() => setShowRepostMenu(!showRepostMenu)}
            className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-muted/40 transition-all cursor-pointer"
          >
            <Repeat2 className="w-4 h-4" />
            <span className="text-xs">Repost</span>
          </button>

          <AnimatePresence>
            {showRepostMenu && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full right-0 mb-2 bg-card border border-border/30 rounded-2xl shadow-xl overflow-hidden min-w-[210px] z-10"
              >
                <button
                  onClick={() => { setRepostCount(c => c + 1); toast.success("Reposted to your network!"); setShowRepostMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer text-left"
                >
                  <Repeat2 className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-foreground" style={{ fontWeight: 500 }}>Repost instantly</p>
                    <p className="text-[10px] text-muted-foreground">Share to your network now</p>
                  </div>
                </button>
                <button
                  onClick={() => { toast.success("Composer opened for Quote Post"); setShowRepostMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer text-left border-t border-border/10"
                >
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-foreground" style={{ fontWeight: 500 }}>Quote Post</p>
                    <p className="text-[10px] text-muted-foreground">Add your own commentary</p>
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Share Menu */}
        <div ref={shareRef} className="relative flex-1">
          <button onClick={() => setShowShareMenu(!showShareMenu)} className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-muted/40 transition-all cursor-pointer">
            <Share2 className="w-4 h-4" />
            <span className="text-xs hidden sm:block">Share</span>
          </button>
          <AnimatePresence>
            {showShareMenu && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-full right-0 mb-2 bg-card border border-border/30 rounded-2xl shadow-xl overflow-hidden min-w-[190px] z-10">
                {SHARE_OPTIONS.map((opt) => (
                  <button key={opt.type} onClick={() => handleShare(opt.type)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/40 transition-colors cursor-pointer text-left">
                    <opt.icon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-foreground">{opt.label}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Save */}
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setShowSaveCollection(true)}
          className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all cursor-pointer ${
            saved ? "text-violet-500 bg-violet-50" : "text-muted-foreground hover:bg-muted/40"
          }`}
        >
          <Bookmark className={`w-4 h-4 ${saved ? "fill-violet-500" : ""}`} />
          <span className="text-xs">{saved ? "Saved" : "Save"}</span>
        </motion.button>
      </div>

      {/* Comments section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-border/20 overflow-hidden"
          >
            <div className="p-4 space-y-3">
              {/* Comment Permissions Alert if disabled */}
              {commentPermission === "disabled" ? (
                <div className="p-3 bg-muted/20 text-center rounded-xl text-xs text-muted-foreground">
                  Comments have been disabled for this post by the author.
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span className="font-semibold text-foreground">Comments</span>
                    <button
                      onClick={() => setCommentSort(s => s === "relevant" ? "newest" : "relevant")}
                      className="hover:text-foreground cursor-pointer"
                    >
                      Sort by: {commentSort === "relevant" ? "Relevant" : "Newest"}
                    </button>
                  </div>

                  {comments.map((c) => (
                    <div key={c.id} className="flex gap-2.5">
                      <Avatar src={currentUser.avatar} name={c.authorName || "User"} size="xs" />
                      <div className="bg-muted/50 rounded-2xl px-4 py-2.5 text-xs flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-semibold text-foreground">{c.authorName || "User"}</span>
                          {c.isAuthor && (
                            <span className="px-1.5 py-0.2 bg-primary/10 text-primary text-[9px] font-semibold rounded">
                              Author
                            </span>
                          )}
                        </div>
                        <p className="text-foreground/90">{c.text}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 pt-1">
                    <Avatar src={currentUser.avatar} name="Ahmad Parvizi" size="sm" />
                    <input
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleComment()}
                      placeholder="Add a comment..."
                      className="flex-1 bg-muted/40 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary/20"
                    />
                    <button
                      onClick={handleComment}
                      disabled={!commentText.trim()}
                      className="p-2 text-primary disabled:opacity-30 cursor-pointer hover:bg-primary/5 rounded-xl transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <PostAnalyticsDrawer postId={post.id} postType={post.type} onClose={() => setShowAnalytics(false)} />
        </div>
      )}

      {showBoost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <PostBoostDialog postId={post.id} onClose={() => setShowBoost(false)} />
        </div>
      )}

      {showReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <ReportDialog itemType="Post" itemTitle={post.content.slice(0, 30)} onClose={() => setShowReport(false)} />
        </div>
      )}

      {showMute && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <MuteDialog authorName={post.author.name} onConfirm={() => setHidden(true)} onClose={() => setShowMute(false)} />
        </div>
      )}

      {showBlock && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <BlockDialog authorName={post.author.name} onConfirm={() => setHidden(true)} onClose={() => setShowBlock(false)} />
        </div>
      )}

      {showSaveCollection && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <SaveCollectionDialog postId={post.id} onClose={() => { setShowSaveCollection(false); setSaved(true); }} />
        </div>
      )}

      {showWhyShown && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <WhyShownDialog onClose={() => setShowWhyShown(false)} />
        </div>
      )}

      {showCommentPerms && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <CommentPermissionsDialog
            commentPermissions={commentPermission}
            onUpdatePermissions={(p) => setCommentPermission(p)}
            onClose={() => setShowCommentPerms(false)}
          />
        </div>
      )}
    </div>
  );
}
