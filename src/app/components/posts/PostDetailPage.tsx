import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal,
  Send, ThumbsUp, Smile, Lightbulb, Clapping, Repeat2, Flag, EyeOff,
  UserMinus, Copy, Link2, Globe, Lock, ChevronDown, CheckCircle2,
  Verified, Users, ExternalLink,
} from "lucide-react";
import { Card } from "../ui/Card";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { feedPosts, users, currentUser } from "../../data/mock-data";
import { toast } from "sonner";

const REACTIONS = [
  { emoji: "👍", label: "Like", color: "text-primary" },
  { emoji: "❤️", label: "Love", color: "text-red-500" },
  { emoji: "🌟", label: "Insightful", color: "text-amber-500" },
  { emoji: "👏", label: "Celebrate", color: "text-emerald-500" },
  { emoji: "🤔", label: "Curious", color: "text-violet-500" },
  { emoji: "😢", label: "Support", color: "text-blue-400" },
];

interface Comment {
  id: string;
  author: { name: string; title: string; avatar: string; verified?: boolean };
  text: string;
  timeAgo: string;
  likes: number;
  liked: boolean;
  replies?: Comment[];
  showReplies?: boolean;
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: "c1",
    author: { name: "Mina Hosseini", title: "Data Scientist · Tapsi", avatar: users[2].avatar, verified: true },
    text: "This is such an important insight! We've been seeing similar patterns in our user research. The trust factor is so underrated in product design.",
    timeAgo: "1h",
    likes: 24,
    liked: false,
    replies: [
      {
        id: "c1r1",
        author: { name: "Amir Rahimi", title: "Frontend Developer · Divar", avatar: users[3].avatar },
        text: "Completely agree! Personal referrals convert at 5x the rate of cold applications in our data.",
        timeAgo: "45m",
        likes: 8,
        liked: false,
      }
    ],
  },
  {
    id: "c2",
    author: { name: "Ali Mohammadi", title: "Engineering Manager · Snapp", avatar: users[0].avatar, verified: true },
    text: "Great points! One thing I'd add — the formality of job titles matters less when you have strong community backing. Iranian professionals are very community-oriented.",
    timeAgo: "2h",
    likes: 41,
    liked: true,
    replies: [],
  },
  {
    id: "c3",
    author: { name: "Reza Karimi", title: "Full Stack Developer · Cafe Bazaar", avatar: users[1].avatar },
    text: "This explains so much about why LinkedIn hasn't fully taken off here compared to locally-built platforms. Context matters enormously.",
    timeAgo: "3h",
    likes: 17,
    liked: false,
    replies: [],
  },
  {
    id: "c4",
    author: { name: "Nazanin Farahani", title: "UX Researcher · Snapp Food", avatar: users[4].avatar, verified: true },
    text: "Would love to read the full research paper if you plan to publish it! The 3x stat on trust signals is fascinating.",
    timeAgo: "4h",
    likes: 12,
    liked: false,
    replies: [],
  },
];

function parseContent(text: string) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  const regex = /(#\w+)|(@[\w\s]+)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    if (match[0].startsWith("#")) {
      parts.push(
        <span key={match.index} className="text-primary cursor-pointer hover:underline">
          {match[0]}
        </span>
      );
    } else {
      parts.push(
        <span key={match.index} className="text-primary cursor-pointer hover:underline">
          {match[0]}
        </span>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = feedPosts.find(p => p.id === postId) ?? feedPosts[1];
  const related = feedPosts.filter(p => p.id !== post.id).slice(0, 3);

  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [saved, setSaved] = useState(post.saved);
  const [showReactions, setShowReactions] = useState(false);
  const [activeReaction, setActiveReaction] = useState<string | null>(post.liked ? "👍" : null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const reactHoldTimer = useRef<any>(null);

  const reactionCount = {
    "👍": Math.floor(likeCount * 0.6),
    "❤️": Math.floor(likeCount * 0.2),
    "🌟": Math.floor(likeCount * 0.12),
    "👏": Math.floor(likeCount * 0.08),
  };

  const handleReaction = (emoji: string) => {
    if (activeReaction === emoji) {
      setActiveReaction(null);
      setLiked(false);
      setLikeCount(c => c - 1);
    } else {
      if (!activeReaction) setLikeCount(c => c + 1);
      setActiveReaction(emoji);
      setLiked(true);
    }
    setShowReactions(false);
  };

  const handleLikeClick = () => {
    if (activeReaction) {
      setActiveReaction(null);
      setLiked(false);
      setLikeCount(c => c - 1);
    } else {
      setActiveReaction("👍");
      setLiked(true);
      setLikeCount(c => c + 1);
    }
  };

  const handleLikeMouseDown = () => {
    reactHoldTimer.current = setTimeout(() => setShowReactions(true), 400);
  };
  const handleLikeMouseUp = () => {
    clearTimeout(reactHoldTimer.current);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: { name: currentUser.name, title: `${currentUser.title} · ${currentUser.company}`, avatar: currentUser.avatar, verified: true },
      text: commentText,
      timeAgo: "Just now",
      likes: 0,
      liked: false,
      replies: [],
    };
    setComments(prev => [newComment, ...prev]);
    setCommentText("");
    toast.success("Comment posted!");
  };

  const handleReply = (commentId: string) => {
    if (!replyText.trim()) return;
    const reply: Comment = {
      id: `r${Date.now()}`,
      author: { name: currentUser.name, title: `${currentUser.title} · ${currentUser.company}`, avatar: currentUser.avatar, verified: true },
      text: replyText,
      timeAgo: "Just now",
      likes: 0,
      liked: false,
    };
    setComments(prev => prev.map(c =>
      c.id === commentId ? { ...c, replies: [...(c.replies ?? []), reply] } : c
    ));
    setReplyText("");
    setReplyingTo(null);
    setExpandedReplies(prev => new Set([...prev, commentId]));
  };

  const handleCommentLike = (commentId: string) => {
    setComments(prev => prev.map(c =>
      c.id === commentId
        ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
        : c
    ));
  };

  // Close menus on outside click
  useEffect(() => {
    if (!showShareMenu && !showMoreMenu && !showReactions) return;
    const handler = () => { setShowShareMenu(false); setShowMoreMenu(false); setShowReactions(false); };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showShareMenu, showMoreMenu, showReactions]);

  return (
    <div className="max-w-[700px] mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 cursor-pointer transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back
      </button>

      {/* Main post card */}
      <Card className="mb-4">
        {/* Author row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 cursor-pointer" onClick={() => navigate(`/profile/${post.author.id}`)}>
            <Avatar src={post.author.avatar} name={post.author.name} size="lg" verified={post.author.verified} />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm text-foreground hover:text-primary transition-colors" style={{ fontWeight: 600 }}>{post.author.name}</span>
                {post.author.verified && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
              </div>
              <p className="text-xs text-muted-foreground">{post.author.title} · {post.author.company}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-[11px] text-muted-foreground/60">{post.timeAgo} ago</p>
                <span className="text-muted-foreground/40">·</span>
                <Globe className="w-3 h-3 text-muted-foreground/40" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1.5 text-primary border-primary/30 hover:bg-primary/5">
              <Users className="w-3.5 h-3.5" /> Follow
            </Button>
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
                      { icon: Bookmark, label: saved ? "Unsave post" : "Save post", action: () => { setSaved(s => !s); toast(saved ? "Post unsaved" : "Post saved!"); setShowMoreMenu(false); } },
                      { icon: Copy, label: "Copy post text", action: () => { navigator.clipboard?.writeText(post.content); toast.success("Copied!"); setShowMoreMenu(false); } },
                      { icon: Link2, label: "Copy link", action: () => { navigator.clipboard?.writeText(`https://hamrahe.com/posts/${post.id}`); toast.success("Link copied!"); setShowMoreMenu(false); } },
                      { icon: EyeOff, label: "I don't want to see this", action: () => { toast("Post hidden"); navigate(-1); } },
                      { icon: Flag, label: "Report post", action: () => { toast("Report submitted"); setShowMoreMenu(false); } },
                      { icon: UserMinus, label: "Unfollow", action: () => { toast(`Unfollowed ${post.author.name.split(" ")[0]}`); setShowMoreMenu(false); } },
                    ].map(item => (
                      <button key={item.label} onClick={item.action} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors hover:bg-muted/40 ${item.label === "Unfollow" ? "text-red-500" : "text-foreground/80"}`}>
                        <item.icon className="w-4 h-4 shrink-0" />
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Post content */}
        <div className="mb-4">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {parseContent(post.content)}
          </p>
        </div>

        {/* Post image */}
        {post.image && (
          <div className="mb-4 -mx-5 sm:-mx-6">
            <img src={post.image} alt="" className="w-full max-h-[480px] object-cover" />
          </div>
        )}

        {/* Reaction summary */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/15">
          <div className="flex items-center gap-1.5 cursor-pointer hover:underline" onClick={() => {}}>
            <div className="flex -space-x-1">
              {Object.entries(reactionCount).filter(([,v]) => v > 0).slice(0, 3).map(([emoji]) => (
                <span key={emoji} className="text-base">{emoji}</span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{likeCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="cursor-pointer hover:underline">{comments.length + 43} comments</span>
            <span className="cursor-pointer hover:underline">{post.shares} reposts</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Like with hold-for-reactions */}
          <div className="relative flex-1">
            <button
              onMouseDown={handleLikeMouseDown}
              onMouseUp={handleLikeMouseUp}
              onMouseLeave={handleLikeMouseUp}
              onTouchStart={handleLikeMouseDown}
              onTouchEnd={handleLikeMouseUp}
              onClick={handleLikeClick}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm cursor-pointer transition-all hover:bg-muted/40 ${liked ? "text-primary" : "text-muted-foreground"}`}
            >
              {activeReaction ? (
                <span className="text-base">{activeReaction}</span>
              ) : (
                <ThumbsUp className="w-4 h-4" />
              )}
              <span className="hidden sm:block">{activeReaction ? REACTIONS.find(r => r.emoji === activeReaction)?.label : "Like"}</span>
            </button>

            {/* Reaction picker */}
            <AnimatePresence>
              {showReactions && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-0 mb-2 bg-card border border-border/20 rounded-2xl shadow-xl p-2 flex gap-1 z-20"
                  onClick={e => e.stopPropagation()}
                >
                  {REACTIONS.map(r => (
                    <button
                      key={r.emoji}
                      onClick={() => handleReaction(r.emoji)}
                      title={r.label}
                      className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted/50 cursor-pointer transition-all hover:scale-125 text-xl"
                    >
                      {r.emoji}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => commentInputRef.current?.focus()}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-muted-foreground cursor-pointer transition-all hover:bg-muted/40"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:block">Comment</span>
          </button>

          {/* Repost */}
          <div className="relative flex-1">
            <button
              onClick={(e) => { e.stopPropagation(); setShowShareMenu(s => !s); }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-muted-foreground cursor-pointer transition-all hover:bg-muted/40"
            >
              <Repeat2 className="w-4 h-4" />
              <span className="hidden sm:block">Repost</span>
            </button>
            <AnimatePresence>
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute bottom-full right-0 mb-2 w-52 bg-card border border-border/20 rounded-2xl shadow-xl z-20 overflow-hidden"
                  onClick={e => e.stopPropagation()}
                >
                  {[
                    { icon: Repeat2, label: "Repost instantly", action: () => { toast.success("Reposted to your network!"); setShowShareMenu(false); } },
                    { icon: MessageCircle, label: "Repost with your thoughts", action: () => { toast("Opening composer..."); setShowShareMenu(false); } },
                  ].map(item => (
                    <button key={item.label} onClick={item.action} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground/80 cursor-pointer hover:bg-muted/40 transition-colors">
                      <item.icon className="w-4 h-4 shrink-0 text-muted-foreground" />
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => { setSaved(s => !s); toast(saved ? "Post unsaved" : "Post saved!"); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm cursor-pointer transition-all hover:bg-muted/40 ${saved ? "text-amber-500" : "text-muted-foreground"}`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? "fill-amber-500" : ""}`} />
            <span className="hidden sm:block">{saved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </Card>

      {/* Comments section */}
      <Card className="mb-4">
        <h3 className="text-sm text-foreground mb-4" style={{ fontWeight: 600 }}>Comments · {comments.length + 43}</h3>

        {/* Comment input */}
        <div className="flex gap-3 mb-5 pb-5 border-b border-border/15">
          <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
          <div className="flex-1">
            <textarea
              ref={commentInputRef}
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleComment(); }}
              placeholder="Add a comment..."
              rows={commentText ? 3 : 1}
              className="w-full px-4 py-2.5 bg-muted/30 border border-border/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none transition-all"
            />
            {commentText && (
              <div className="flex items-center justify-between mt-2">
                <p className="text-[11px] text-muted-foreground/50">Ctrl+Enter to post</p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setCommentText("")}>Cancel</Button>
                  <Button variant="gradient" size="sm" onClick={handleComment}>
                    <Send className="w-3.5 h-3.5" /> Post
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comment list */}
        <div className="space-y-5">
          {comments.map(comment => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <Avatar
                src={comment.author.avatar}
                name={comment.author.name}
                size="sm"
                className="cursor-pointer shrink-0"
              />
              <div className="flex-1 min-w-0">
                {/* Comment bubble */}
                <div className="bg-muted/25 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs text-foreground" style={{ fontWeight: 600 }}>{comment.author.name}</span>
                    {comment.author.verified && <CheckCircle2 className="w-3 h-3 text-primary" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground/60 mb-1.5">{comment.author.title}</p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{comment.text}</p>
                </div>

                {/* Comment actions */}
                <div className="flex items-center gap-3 mt-1.5 px-1">
                  <span className="text-[11px] text-muted-foreground/50">{comment.timeAgo}</span>
                  <button
                    onClick={() => handleCommentLike(comment.id)}
                    className={`text-[11px] cursor-pointer transition-colors ${comment.liked ? "text-primary" : "text-muted-foreground/70 hover:text-foreground"}`}
                    style={{ fontWeight: comment.liked ? 600 : 400 }}
                  >
                    {comment.liked ? "👍" : ""} Like {comment.likes > 0 && `· ${comment.likes}`}
                  </button>
                  <button
                    onClick={() => { setReplyingTo(replyingTo === comment.id ? null : comment.id); setReplyText(""); }}
                    className="text-[11px] text-muted-foreground/70 hover:text-foreground cursor-pointer transition-colors"
                  >
                    Reply
                  </button>
                </div>

                {/* Reply input */}
                <AnimatePresence>
                  {replyingTo === comment.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-2 mt-2"
                    >
                      <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" className="shrink-0" />
                      <div className="flex-1">
                        <input
                          autoFocus
                          value={replyText}
                          onChange={e => setReplyText(e.target.value)}
                          onKeyDown={e => { if (e.key === "Enter") handleReply(comment.id); if (e.key === "Escape") setReplyingTo(null); }}
                          placeholder={`Reply to ${comment.author.name.split(" ")[0]}...`}
                          className="w-full px-3 py-2 bg-muted/30 border border-border/30 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <button onClick={() => handleReply(comment.id)} disabled={!replyText.trim()}
                        className="px-3 py-2 bg-primary text-white text-xs rounded-xl hover:bg-primary/90 disabled:opacity-40 cursor-pointer transition-colors">
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Replies */}
                {(comment.replies?.length ?? 0) > 0 && (
                  <div className="mt-2 ml-1">
                    <button
                      onClick={() => setExpandedReplies(prev => {
                        const next = new Set(prev);
                        if (next.has(comment.id)) next.delete(comment.id);
                        else next.add(comment.id);
                        return next;
                      })}
                      className="flex items-center gap-1 text-[11px] text-primary cursor-pointer hover:underline mb-2"
                    >
                      <ChevronDown className={`w-3 h-3 transition-transform ${expandedReplies.has(comment.id) ? "rotate-180" : ""}`} />
                      {expandedReplies.has(comment.id) ? "Hide" : `View`} {comment.replies!.length} {comment.replies!.length === 1 ? "reply" : "replies"}
                    </button>
                    <AnimatePresence>
                      {expandedReplies.has(comment.id) && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                          {comment.replies!.map(reply => (
                            <div key={reply.id} className="flex gap-2">
                              <Avatar src={reply.author.avatar} name={reply.author.name} size="sm" className="shrink-0" />
                              <div className="flex-1">
                                <div className="bg-muted/20 rounded-2xl rounded-tl-sm px-3 py-2.5">
                                  <span className="text-[11px] text-foreground" style={{ fontWeight: 600 }}>{reply.author.name}</span>
                                  <p className="text-xs text-foreground/80 mt-0.5 leading-relaxed">{reply.text}</p>
                                </div>
                                <div className="flex items-center gap-3 mt-1 px-1">
                                  <span className="text-[10px] text-muted-foreground/50">{reply.timeAgo}</span>
                                  <span className="text-[10px] text-muted-foreground/70 cursor-pointer hover:text-foreground">Like</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more comments */}
        <button className="w-full mt-4 pt-4 border-t border-border/10 text-sm text-primary cursor-pointer hover:underline flex items-center justify-center gap-1">
          <ChevronDown className="w-4 h-4" /> Load more comments
        </button>
      </Card>

      {/* Related posts */}
      {related.length > 0 && (
        <div>
          <h3 className="text-sm text-muted-foreground mb-3 px-1" style={{ fontWeight: 500 }}>More posts</h3>
          <div className="space-y-3">
            {related.map(p => (
              <Card
                key={p.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/posts/${p.id}`)}
              >
                <div className="flex items-start gap-3">
                  <Avatar src={p.author.avatar} name={p.author.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-foreground" style={{ fontWeight: 600 }}>{p.author.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{p.author.title}</p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {p.content.slice(0, 120)}...
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>{p.likes} likes</span>
                      <span>{p.comments} comments</span>
                      <span>{p.timeAgo}</span>
                    </div>
                  </div>
                  {p.image && (
                    <img src={p.image} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
