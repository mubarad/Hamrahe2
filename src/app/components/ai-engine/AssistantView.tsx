import { useState } from "react";
import {
  Send, Bot, Paperclip, Pin, Archive, Trash2, Sparkles, Plus,
  FileText, ShieldCheck, CheckCircle2, ChevronRight, Lock, Eye, Download,
  Share2, Save, Layers, Search, RefreshCw, X, AlertTriangle, ArrowRight
} from "lucide-react";
import { useAIEngine } from "../../context/AIEngineContext";
import { ConversationMessage } from "../../data/ai-engine-data";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function AssistantView() {
  const {
    conversations,
    activeConversationId,
    setActiveConversationId,
    activeContext,
    tools,
    saveOutputArtifact,
    requestActionApproval,
    hasUnsavedDraft,
    setHasUnsavedDraft,
  } = useAIEngine();

  const [inputPrompt, setInputPrompt] = useState("");
  const [selectedToolId, setSelectedToolId] = useState<string>("");
  const [isTempMode, setIsTempMode] = useState(false);
  const [selectedOutputTab, setSelectedOutputTab] = useState<"preview" | "evidence" | "sources">("preview");

  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const handleSendMessage = () => {
    if (!inputPrompt.trim()) return;

    const userMsg: ConversationMessage = {
      id: `m_${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      content: inputPrompt,
    };

    activeConv.messages.push(userMsg);
    setInputPrompt("");
    setHasUnsavedDraft(false);

    // AI Response simulation with structured blocks
    setTimeout(() => {
      const aiMsg: ConversationMessage = {
        id: `m_ai_${Date.now()}`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        content: `I have analyzed your request regarding "${userMsg.content.slice(0, 40)}..." for ${activeContext.name}.`,
        dataSourcesUsed: ["Personal Profile", "Digikala Employment Verification"],
        structuredBlocks: [
          {
            type: "explanation",
            title: "Analysis Results",
            body: "Based on your verified design system experience at Digikala, your profile demonstrates 92% readiness for senior design leadership roles in Iranian tech.",
          },
          {
            type: "draft",
            title: "Generated Application Note Draft",
            body: "I am writing to express my strong enthusiasm for joining the product team...",
          },
          {
            type: "recommendation",
            title: "Suggested Next Step",
            body: "Save this generated note to your Output Artifacts or execute submission preview.",
          },
        ],
        actionPreview: {
          actionName: "Save Output Artifact & Update Case",
          destination: "Output Artifacts Library",
          dataDisclosed: ["Draft Application Note"],
          quotaCost: 10,
          requiresConfirmation: true,
        },
      };

      activeConv.messages.push(aiMsg);
      toast.success("AI Engine generated response & structured output.");
    }, 600);
  };

  const handleSaveMessageAsOutput = (msg: ConversationMessage) => {
    const draftBlock = msg.structuredBlocks?.find((b) => b.type === "draft") || msg.structuredBlocks?.[0];
    saveOutputArtifact({
      title: `Generated Draft — ${new Date().toLocaleDateString()}`,
      type: "cover_letter",
      content: draftBlock ? `${draftBlock.title}\n\n${draftBlock.body}` : msg.content,
      dataSources: msg.dataSourcesUsed || ["AI Conversation"],
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-280px)] min-h-[600px]">
      {/* 1. CONVERSATION NAVIGATION PANEL (3 Cols) */}
      <div className="lg:col-span-3 bg-white rounded-2xl p-3 border border-border/30 shadow-sm flex flex-col h-full overflow-hidden">
        <div className="p-2 space-y-2 border-b border-border/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">Conversations</span>
            <button
              onClick={() => {
                const newId = `conv_${Date.now()}`;
                conversations.unshift({
                  id: newId,
                  contextId: activeContext.id,
                  title: "New AI Analysis Session",
                  updatedAt: "Just now",
                  messages: [],
                });
                setActiveConversationId(newId);
              }}
              className="p-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground bg-muted/40 p-2 rounded-xl border border-border/20">
            <span>Temporary Mode (Incognito)</span>
            <input
              type="checkbox"
              checked={isTempMode}
              onChange={(e) => setIsTempMode(e.target.checked)}
              className="rounded text-primary cursor-pointer"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-1 space-y-1.5 mt-2">
          {conversations.map((conv) => {
            const isActive = conv.id === activeConversationId;
            return (
              <button
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`w-full p-2.5 rounded-xl text-left transition-all cursor-pointer flex items-start justify-between gap-2 ${
                  isActive ? "bg-primary/10 border border-primary/30 text-primary" : "hover:bg-muted/50 text-foreground"
                }`}
              >
                <div className="space-y-0.5 overflow-hidden">
                  <p className="text-xs font-bold truncate">{conv.title}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{conv.messages[conv.messages.length - 1]?.content || "Empty chat"}</p>
                </div>
                {conv.isPinned && <Pin className="w-3 h-3 text-amber-500 shrink-0 mt-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN CONVERSATION CHAT WINDOW (5 Cols) */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-border/30 shadow-sm flex flex-col h-full overflow-hidden">
        {/* Chat Header */}
        <div className="pb-3 border-b border-border/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-foreground">{activeConv?.title}</h3>
              <p className="text-[10px] text-muted-foreground">Active Context: {activeContext.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
              <Pin className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
              <Archive className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Chat Message Scroll Area */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4 my-2">
          {activeConv?.messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div key={msg.id} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
                {!isUser && (
                  <div className="w-7 h-7 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 mt-1 text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2 ${isUser ? "items-end" : "items-start"}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs ${
                      isUser
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-muted/50 border border-border/30 text-foreground rounded-tl-none space-y-3"
                    }`}
                  >
                    <p className="leading-relaxed">{msg.content}</p>

                    {/* Structured Blocks */}
                    {msg.structuredBlocks?.map((block, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-border/30 shadow-xs space-y-1">
                        {block.title && <span className="font-bold text-[11px] text-primary block">{block.title}</span>}
                        <p className="text-[11px] text-muted-foreground whitespace-pre-wrap">{block.body}</p>
                      </div>
                    ))}

                    {/* Action Preview Callout */}
                    {msg.actionPreview && (
                      <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-xl space-y-2 text-amber-900">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span>Action Preview</span>
                          <span className="text-amber-700">{msg.actionPreview.quotaCost} Credits</span>
                        </div>
                        <p className="text-[10px] text-amber-800">{msg.actionPreview.actionName}</p>
                        <button
                          onClick={() =>
                            requestActionApproval(
                              msg.actionPreview!.actionName,
                              msg.actionPreview!.destination,
                              msg.actionPreview!.dataDisclosed,
                              msg.actionPreview!.quotaCost,
                              () => handleSaveMessageAsOutput(msg)
                            )
                          }
                          className="w-full py-1.5 rounded-lg bg-amber-600 text-white font-bold text-[10px] hover:bg-amber-700 transition-colors cursor-pointer"
                        >
                          Review & Execute Action
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleSaveMessageAsOutput(msg)}
                        className="hover:text-primary flex items-center gap-1 cursor-pointer"
                      >
                        <Save className="w-3 h-3" />
                        <span>Save Output</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Composer Input */}
        <div className="pt-2 border-t border-border/20 space-y-2">
          {/* Tool Selector Bar */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <select
              value={selectedToolId}
              onChange={(e) => setSelectedToolId(e.target.value)}
              className="text-[11px] bg-muted/60 border border-border/30 rounded-xl px-2.5 py-1 text-foreground cursor-pointer shrink-0"
            >
              <option value="">Select AI Tool (180 Available)</option>
              {tools.slice(0, 10).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.estimatedQuota} Credits)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-muted/40 rounded-2xl p-2 border border-border/30">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => {
                setInputPrompt(e.target.value);
                setHasUnsavedDraft(e.target.value.length > 0);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask AI Engine to analyze, draft, or tailor..."
              className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none px-2"
            />
            <button className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted">
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              onClick={handleSendMessage}
              className="p-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. STRUCTURED OUTPUT & EVIDENCE PANEL (4 Cols) */}
      <div className="lg:col-span-4 bg-white rounded-2xl p-4 border border-border/30 shadow-sm flex flex-col h-full overflow-hidden">
        <div className="pb-3 border-b border-border/20 flex items-center justify-between">
          <h3 className="text-xs font-bold text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" />
            <span>Structured Output Preview</span>
          </h3>

          <div className="flex bg-muted/50 p-0.5 rounded-lg text-[10px]">
            <button
              onClick={() => setSelectedOutputTab("preview")}
              className={`px-2 py-1 rounded-md font-semibold cursor-pointer ${selectedOutputTab === "preview" ? "bg-white text-primary shadow-xs" : "text-muted-foreground"}`}
            >
              Output
            </button>
            <button
              onClick={() => setSelectedOutputTab("evidence")}
              className={`px-2 py-1 rounded-md font-semibold cursor-pointer ${selectedOutputTab === "evidence" ? "bg-white text-primary shadow-xs" : "text-muted-foreground"}`}
            >
              Evidence
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-4 my-2">
          {selectedOutputTab === "preview" && (
            <div className="space-y-3">
              <div className="bg-muted/30 p-3 rounded-xl border border-border/20 text-xs space-y-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Active Artifact Draft</span>
                <h4 className="font-bold text-foreground">Sara Ahmadi — Tailored Resume for Snapp</h4>
                <p className="text-muted-foreground text-[11px]">
                  Updated 10 minutes ago with verified Digikala design system credentials.
                </p>
              </div>

              <div className="p-3 bg-slate-900 text-slate-200 rounded-xl text-[11px] font-mono whitespace-pre-wrap leading-relaxed">
                {`SARA AHMADI
Senior Product Designer | Tehran
- 6+ years at Digikala & SnappPay
- Design System Lead (45+ Engineers)
- Verified National Identity & HR Proof`}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() =>
                    saveOutputArtifact({
                      title: "Sara Ahmadi — Tailored Resume for Snapp",
                      type: "resume",
                      content: "SARA AHMADI\nSenior Product Designer...",
                    })
                  }
                  className="w-full py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Artifact Version</span>
                </button>
              </div>
            </div>
          )}

          {selectedOutputTab === "evidence" && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Digikala HR Employment Proof</span>
                </div>
                <p className="text-[11px] text-emerald-800">Verified via official hr@digikala.com email domain co-sign.</p>
              </div>

              <div className="p-3 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Advanced UX Assessment</span>
                </div>
                <p className="text-[11px] text-blue-800">Hamrahe Proctored Assessment Score: 94%</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
