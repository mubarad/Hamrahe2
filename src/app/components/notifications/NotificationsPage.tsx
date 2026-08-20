import { useState } from "react";
import { Avatar } from "../ui/Avatar";
import { Card } from "../ui/Card";
import { users, IMAGES } from "../../data/mock-data";
import {
  Heart, MessageCircle, UserPlus, Briefcase, Award, Bell,
  BellOff, Check, Settings, Trash2, UserCheck, UserX, X,
} from "lucide-react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: "like" | "comment" | "connection_request" | "connection_accepted" | "job" | "endorsement" | "mention" | "post" | "milestone";
  title: string;
  description: string;
  avatar: string;
  time: string;
  read: boolean;
  actionUrl?: string;
  userId?: string;
  grouped?: number; // how many others did the same thing
}

const initialNotifs: Notification[] = [
  {
    id: "n1", type: "connection_accepted",
    title: "Ali Mohammadi accepted your connection request",
    description: "You can now message each other",
    avatar: IMAGES.avatars.ali, time: "5m", read: false, userId: "1",
  },
  {
    id: "n2", type: "like",
    title: "Mina Hosseini and 11 others liked your post",
    description: '"Data Science tip of the day..."',
    avatar: IMAGES.avatars.mina, time: "15m", read: false, userId: "2", grouped: 11,
  },
  {
    id: "n3", type: "comment",
    title: "Reza Karimi commented on your post",
    description: '"Great insights Ahmad! I totally agree with..."',
    avatar: IMAGES.avatars.reza, time: "1h", read: false, userId: "3",
  },
  {
    id: "n4", type: "job",
    title: "New job match: Senior Product Designer at Snapp",
    description: "92% match score — Based on your skills",
    avatar: IMAGES.avatars.ahmad, time: "2h", read: true, actionUrl: "/jobs",
  },
  {
    id: "n5", type: "endorsement",
    title: "Nazanin Farahani endorsed you for Product Design",
    description: "You now have 48 endorsements for this skill",
    avatar: IMAGES.avatars.designer, time: "3h", read: true, userId: "4",
  },
  {
    id: "n6", type: "mention",
    title: "Ali Mohammadi mentioned you in a post",
    description: '"Shout out to @Ahmad Parvizi for the incredible design system work..."',
    avatar: IMAGES.avatars.ali, time: "5h", read: true, userId: "1",
  },
  {
    id: "n7", type: "milestone",
    title: "Your profile was viewed 234 times this week",
    description: "That's 12% more than last week!",
    avatar: IMAGES.avatars.ahmad, time: "8h", read: true,
  },
  {
    id: "n8", type: "post",
    title: "Amir Rahimi posted for the first time in a while",
    description: '"Excited to announce that I just joined Divar as..."',
    avatar: IMAGES.avatars.developer, time: "1d", read: true, userId: "5",
  },
  {
    id: "n9", type: "connection_request",
    title: "Parisa Tehrani wants to connect with you",
    description: "Product Manager at Snapp · 8 mutual connections",
    avatar: IMAGES.avatars.designer, time: "1d", read: false, userId: "6",
  },
  {
    id: "n10", type: "job",
    title: "3 new jobs match your preferences",
    description: "UX Researcher at Cafe Bazaar, and 2 more",
    avatar: IMAGES.avatars.ahmad, time: "2d", read: true, actionUrl: "/jobs",
  },
  {
    id: "n11", type: "endorsement",
    title: "Mina Hosseini endorsed you for Figma",
    description: "You now have 40 endorsements for this skill",
    avatar: IMAGES.avatars.mina, time: "3d", read: true, userId: "2",
  },
];

const iconMap = {
  like: Heart,
  comment: MessageCircle,
  connection_request: UserPlus,
  connection_accepted: UserCheck,
  job: Briefcase,
  endorsement: Award,
  mention: MessageCircle,
  post: Bell,
  milestone: Award,
};

const colorMap: Record<string, string> = {
  like: "text-red-500 bg-red-50",
  comment: "text-primary bg-primary/10",
  connection_request: "text-violet-500 bg-violet-50",
  connection_accepted: "text-emerald-600 bg-emerald-50",
  job: "text-emerald-600 bg-emerald-50",
  endorsement: "text-amber-500 bg-amber-50",
  mention: "text-pink-500 bg-pink-50",
  post: "text-primary bg-primary/10",
  milestone: "text-orange-500 bg-orange-50",
};

export function NotificationsPage() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [dismissedRequests, setDismissedRequests] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const markRead = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotif = (id: string) => {
    setNotifs(prev => prev.filter(n => n.id !== id));
  };

  const acceptConnection = (id: string) => {
    const notif = notifs.find(n => n.id === id);
    setNotifs(prev => prev.map(n => n.id === id
      ? { ...n, type: "connection_accepted" as const, title: n.title.replace("wants to connect with you", "is now connected with you"), read: true }
      : n
    ));
    toast.success(`Connection accepted!`);
  };

  const declineConnection = (id: string) => {
    setDismissedRequests(prev => new Set(prev).add(id));
    setNotifs(prev => prev.filter(n => n.id !== id));
    toast("Connection request declined");
  };

  const filtered = filter === "unread" ? notifs.filter(n => !n.read) : notifs;
  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_280px] gap-6">
      {/* Left sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-[76px]">
          <Card>
            <h3 className="text-sm text-foreground mb-3">Notification Settings</h3>
            <div className="space-y-1">
              {[
                { icon: Bell, label: "All notifications", active: true },
                { icon: Briefcase, label: "Job alerts", active: true },
                { icon: MessageCircle, label: "Messages", active: true },
                { icon: UserPlus, label: "Connections", active: true },
                { icon: BellOff, label: "Muted", active: false },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${item.active ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/settings")}
              className="w-full flex items-center gap-2 px-3 py-2.5 mt-2 rounded-xl text-sm text-primary hover:bg-primary/5 transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4" />
              Manage settings
            </button>
          </Card>
        </div>
      </aside>

      {/* Main */}
      <div className="space-y-4 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-foreground">Notifications</h2>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 bg-gradient-to-r from-[#0066FF] to-[#7c3aed] text-white text-xs rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="text-sm text-primary cursor-pointer hover:underline">
                Mark all read
              </button>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 bg-muted/50 rounded-xl p-1 w-fit">
          {(["all", "unread"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm cursor-pointer transition-all capitalize ${
                filter === f ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All" : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>

        {/* Notifications list */}
        <Card padding={false}>
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <Bell className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-foreground">All caught up!</p>
              <p className="text-xs text-muted-foreground mt-1">
                {filter === "unread" ? "No unread notifications" : "No notifications yet"}
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              <div className="divide-y divide-border/20">
                {filtered.map(notif => {
                  const Icon = iconMap[notif.type];
                  const colors = colorMap[notif.type] ?? "text-muted-foreground bg-muted";
                  const isConnectionRequest = notif.type === "connection_request";

                  return (
                    <motion.div
                      key={notif.id}
                      layout
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        onClick={() => {
                          if (isConnectionRequest) return;
                          markRead(notif.id);
                          if (notif.actionUrl) navigate(notif.actionUrl);
                          else if (notif.userId) navigate(`/profile/${notif.userId}`);
                        }}
                        className={`flex items-start gap-4 px-5 py-4 transition-colors group ${
                          !notif.read ? "bg-primary/[0.025]" : ""
                        } ${!isConnectionRequest ? "hover:bg-muted/20 cursor-pointer" : ""}`}
                      >
                        {/* Avatar with icon badge */}
                        <div className="relative shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (notif.userId) {
                                markRead(notif.id);
                                navigate(`/profile/${notif.userId}`);
                              }
                            }}
                            className={notif.userId ? "cursor-pointer" : "cursor-default"}
                            disabled={!notif.userId}
                          >
                            <img src={notif.avatar} alt="" className="w-12 h-12 rounded-full object-cover" />
                          </button>
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${colors}`}>
                            <Icon className="w-3 h-3" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm leading-snug ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>
                            {notif.grouped && (
                              <span className="text-foreground" style={{ fontWeight: 600 }}>
                                {notif.grouped + 1} people{" "}
                              </span>
                            )}
                            {notif.title}
                          </p>
                          <p className="text-xs text-muted-foreground/70 mt-0.5 line-clamp-1">{notif.description}</p>
                          <p className="text-[11px] text-muted-foreground/50 mt-1">{notif.time} ago</p>

                          {/* Contextual actions for connection requests */}
                          {isConnectionRequest && (
                            <div className="flex items-center gap-2 mt-3">
                              <button
                                onClick={(e) => { e.stopPropagation(); acceptConnection(notif.id); }}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white text-xs rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                Accept
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); declineConnection(notif.id); }}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground text-xs rounded-lg hover:bg-muted/80 hover:text-foreground transition-colors cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                                Decline
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); if (notif.userId) navigate(`/profile/${notif.userId}`); }}
                                className="text-xs text-primary hover:underline cursor-pointer ml-1"
                              >
                                View profile
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Right actions */}
                        <div className="flex items-center gap-1 shrink-0">
                          {!notif.read && !isConnectionRequest && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                          <button
                            onClick={e => { e.stopPropagation(); deleteNotif(notif.id); }}
                            className="p-1.5 hover:bg-muted rounded-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatePresence>
          )}
        </Card>
      </div>

      {/* Right sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-[76px] space-y-4">
          <Card className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/10 to-violet-100 flex items-center justify-center mx-auto mb-3">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-foreground">Stay updated</p>
            <p className="text-xs text-muted-foreground mt-1">
              {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : "You're all caught up!"}
            </p>
          </Card>

          <Card>
            <h3 className="text-sm text-foreground mb-3">Quick stats</h3>
            <div className="space-y-2.5">
              {[
                { label: "Profile views this week", value: "234" },
                { label: "Post engagements", value: "1.2K" },
                { label: "Search appearances", value: "89" },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                  <span className="text-sm text-primary" style={{ fontWeight: 600 }}>{s.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </aside>
    </div>
  );
}
