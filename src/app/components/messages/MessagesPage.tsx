import { useState, useRef, useEffect } from "react";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { users, currentUser } from "../../data/mock-data";
import { Search, Send, MoreHorizontal, Phone, Video, Smile, Paperclip, Image as ImageIcon, Check, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  fromMe: boolean;
  time: string;
  read: boolean;
}

interface Conversation {
  id: string;
  user: typeof users[0];
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: "c1",
    user: users[0],
    lastMessage: "That sounds great! Let's schedule a call to discuss the details.",
    time: "2m",
    unread: 2,
    messages: [
      { id: "m1", text: "Hi Ahmad, I saw your work on the Digikala design system. Really impressive!", fromMe: false, time: "10:30 AM", read: true },
      { id: "m2", text: "Thank you Ali! It was a really challenging but rewarding project.", fromMe: true, time: "10:32 AM", read: true },
      { id: "m3", text: "I'd love to discuss a potential collaboration. Are you open to freelance work?", fromMe: false, time: "10:35 AM", read: true },
      { id: "m4", text: "That sounds great! Let's schedule a call to discuss the details.", fromMe: false, time: "10:36 AM", read: false },
    ],
  },
  {
    id: "c2",
    user: users[2],
    lastMessage: "The data visualization project is coming along nicely!",
    time: "1h",
    unread: 0,
    messages: [
      { id: "m5", text: "Hey Ahmad, quick update on the dashboard project.", fromMe: false, time: "9:15 AM", read: true },
      { id: "m6", text: "The data visualization project is coming along nicely!", fromMe: false, time: "9:16 AM", read: true },
      { id: "m7", text: "That's wonderful to hear. Can you share the latest mockups?", fromMe: true, time: "9:20 AM", read: true },
    ],
  },
  {
    id: "c3",
    user: users[4],
    lastMessage: "Sure, I'll send you the research findings by EOD.",
    time: "3h",
    unread: 0,
    messages: [
      { id: "m8", text: "Hi Nazanin, do you have the user research report ready?", fromMe: true, time: "Yesterday", read: true },
      { id: "m9", text: "Sure, I'll send you the research findings by EOD.", fromMe: false, time: "Yesterday", read: true },
    ],
  },
  {
    id: "c4",
    user: users[1],
    lastMessage: "See you at the conference next week!",
    time: "1d",
    unread: 0,
    messages: [
      { id: "m10", text: "Are you attending the Tehran Tech Conference?", fromMe: false, time: "Monday", read: true },
      { id: "m11", text: "Yes! Looking forward to it.", fromMe: true, time: "Monday", read: true },
      { id: "m12", text: "See you at the conference next week!", fromMe: false, time: "Monday", read: true },
    ],
  },
  {
    id: "c5",
    user: users[3],
    lastMessage: "Thanks for the React tips, really helpful!",
    time: "2d",
    unread: 0,
    messages: [
      { id: "m13", text: "Thanks for the React tips, really helpful!", fromMe: false, time: "Sunday", read: true },
    ],
  },
];

export function MessagesPage() {
  const navigate = useNavigate();
  const [selectedConv, setSelectedConv] = useState<Conversation>(conversations[0]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadMap, setUnreadMap] = useState<Record<string, number>>(() => {
    const m: Record<string, number> = {};
    conversations.forEach(c => { m[c.id] = c.unread; });
    return m;
  });
  const [localMessages, setLocalMessages] = useState<Record<string, Message[]>>(() => {
    const initial: Record<string, Message[]> = {};
    conversations.forEach(c => { initial[c.id] = c.messages; });
    return initial;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages, selectedConv.id]);

  const handleSelectConv = (conv: Conversation) => {
    setSelectedConv(conv);
    setUnreadMap(prev => ({ ...prev, [conv.id]: 0 }));
  };

  const handleSend = () => {
    if (!messageText.trim()) return;
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      text: messageText,
      fromMe: true,
      time: "Just now",
      read: false,
    };
    setLocalMessages(prev => ({
      ...prev,
      [selectedConv.id]: [...(prev[selectedConv.id] || []), newMsg],
    }));
    setMessageText("");
  };

  const filteredConversations = conversations.filter(c =>
    c.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = localMessages[selectedConv.id] || [];

  return (
    <div className="bg-card border border-border/30 rounded-2xl overflow-hidden shadow-sm" style={{ height: "calc(100vh - 96px)" }}>
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] h-full">
        {/* Conversation List */}
        <div className="border-r border-border/20 flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b border-border/20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-foreground">Messages</h2>
              <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 rounded-2xl px-4 py-2 border border-border/20">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages"
                className="bg-transparent text-sm focus:outline-none flex-1"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto p-2">
            {filteredConversations.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-muted-foreground">No conversations found</p>
              </div>
            ) : filteredConversations.map((conv) => {
              const unread = unreadMap[conv.id] ?? 0;
              return (
                <div
                  key={conv.id}
                  className={`w-full flex items-center gap-3 px-3 py-3 transition-all rounded-xl cursor-pointer ${
                    selectedConv.id === conv.id ? "bg-primary/5 shadow-sm" : "hover:bg-muted/30"
                  }`}
                  onClick={() => handleSelectConv(conv)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/profile/${conv.user.id}`);
                    }}
                    className="shrink-0 cursor-pointer"
                  >
                    <Avatar src={conv.user.avatar} name={conv.user.name} size="md" verified={conv.user.verified} />
                  </button>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm truncate hover:text-primary transition-colors ${unread > 0 ? "text-foreground" : "text-foreground/80"}`} style={{ fontWeight: unread > 0 ? 600 : 400 }}>
                        {conv.user.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground shrink-0">{conv.time}</span>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${unread > 0 ? "text-foreground/70" : "text-muted-foreground"}`}>
                      {conv.lastMessage}
                    </p>
                  </div>
                  {unread > 0 && (
                    <span className="w-5 h-5 bg-gradient-to-r from-[#0066FF] to-[#7c3aed] rounded-full flex items-center justify-center text-[10px] text-white shrink-0 shadow-sm shadow-primary/20">
                      {unread}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col h-full bg-[#fafbfc]">
          {/* Chat Header */}
          <div className="px-5 py-3.5 border-b border-border/20 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/profile/${selectedConv.user.id}`)}
                className="shrink-0 cursor-pointer"
              >
                <Avatar src={selectedConv.user.avatar} name={selectedConv.user.name} size="md" verified={selectedConv.user.verified} />
              </button>
              <div>
                <button
                  onClick={() => navigate(`/profile/${selectedConv.user.id}`)}
                  className="text-sm text-foreground hover:text-primary hover:underline transition-colors cursor-pointer text-left"
                >
                  {selectedConv.user.name}
                </button>
                <p className="text-xs text-muted-foreground">{selectedConv.user.title} at {selectedConv.user.company}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon"><Phone className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon"><Video className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {currentMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-3 ${
                  msg.fromMe
                    ? "rounded-2xl rounded-br-md text-white shadow-sm shadow-primary/20"
                    : "bg-white border border-border/20 text-foreground rounded-2xl rounded-bl-md shadow-sm"
                }`}
                style={msg.fromMe ? { background: "linear-gradient(135deg, #0066FF 0%, #7c3aed 100%)" } : undefined}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 mt-1 ${msg.fromMe ? "text-white/60" : "text-muted-foreground"}`}>
                    <span className="text-[10px]">{msg.time}</span>
                    {msg.fromMe && (msg.read ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border/20 bg-white">
            <div className="flex items-center gap-2">
              <button className="p-2.5 hover:bg-muted/40 rounded-xl transition-colors cursor-pointer">
                <Paperclip className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2.5 hover:bg-muted/40 rounded-xl transition-colors cursor-pointer">
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              </button>
              <input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Write a message..."
                className="flex-1 bg-muted/50 rounded-2xl px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border border-border/20"
              />
              <button className="p-2.5 hover:bg-muted/40 rounded-xl transition-colors cursor-pointer">
                <Smile className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={handleSend}
                disabled={!messageText.trim()}
                className="p-2.5 rounded-xl hover:opacity-90 disabled:opacity-40 cursor-pointer transition-all text-white shadow-sm shadow-primary/20"
                style={{ background: "linear-gradient(135deg, #0066FF 0%, #7c3aed 100%)" }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}