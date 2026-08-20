import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Wallet, Sparkles, Gift, Award, Brain, Users, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { WALLET } from "../../data/learning-data";

const USAGE = [
  { label: "AI Teaching Sessions", cost: 20, icon: Brain },
  { label: "AI Practice Generation", cost: 30, icon: Sparkles },
  { label: "AI Roleplay Sessions", cost: 60, icon: Users },
  { label: "AI Resume Review", cost: 80, icon: Award },
  { label: "AI Portfolio Review", cost: 120, icon: Award },
  { label: "AI Output Critique Practice", cost: 40, icon: Sparkles },
  { label: "Assessment Attempt", cost: 120, icon: Brain },
  { label: "Human Expert Review (discounted)", cost: 600, icon: Users },
];

export function WalletPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1000px] mx-auto space-y-5">
      <button onClick={() => navigate("/learning")} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Learning &amp; Assessments
      </button>

      {/* Balance Hero */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border-amber-200/60 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-amber-700" />
              <span className="text-xs text-amber-800" style={{ fontWeight: 700, letterSpacing: 0.5 }}>LEARNING WALLET · AI CREDITS</span>
            </div>
            <div className="flex items-end gap-3 mb-3 flex-wrap">
              <div className="text-amber-900" style={{ fontWeight: 700, fontSize: 48, lineHeight: 1 }}>
                {WALLET.balance.toLocaleString()}
              </div>
              <div className="text-sm text-amber-800/80 pb-1.5">credits</div>
            </div>
            <p className="text-sm text-amber-800/90 max-w-xl leading-relaxed">
              Credits reward meaningful progress, not empty clicks. Earn by completing practice, revising AI output, and finishing assessments.
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Ways to Earn */}
      <section>
        <h2 className="text-foreground mb-3" style={{ fontWeight: 700, fontSize: 16 }}>Ways to Earn</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: "Welcome Credits", value: 500, icon: Gift, color: "amber" },
            { label: "Practice Completion Reward", value: 80, icon: Sparkles, color: "violet" },
            { label: "Revision Reward", value: 40, icon: Sparkles, color: "violet" },
            { label: "Assessment Completion", value: 120, icon: Brain, color: "primary" },
            { label: "Certificate Discount Credit", value: 380, icon: Award, color: "amber" },
            { label: "Company-Sponsored Credits", value: 300, icon: Award, color: "emerald" },
            { label: "Referral Credits", value: 100, icon: Users, color: "primary" },
          ].map((it) => {
            const colorMap: Record<string, string> = {
              amber: "bg-amber-100 text-amber-700",
              violet: "bg-violet-100 text-violet-700",
              primary: "bg-primary/10 text-primary",
              emerald: "bg-emerald-100 text-emerald-700",
            };
            return (
              <Card key={it.label}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorMap[it.color]}`}>
                    <it.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-foreground" style={{ fontWeight: 600 }}>{it.label}</div>
                    <div className="text-[11px] text-muted-foreground">+{it.value} credits</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Usage */}
      <section>
        <h2 className="text-foreground mb-3" style={{ fontWeight: 700, fontSize: 16 }}>What credits unlock</h2>
        <Card>
          <div className="grid sm:grid-cols-2 gap-2">
            {USAGE.map((u) => (
              <div key={u.label} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <u.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground truncate">{u.label}</span>
                </div>
                <span className="text-xs text-foreground shrink-0" style={{ fontWeight: 700 }}>{u.cost}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* History */}
      <section>
        <h2 className="text-foreground mb-3" style={{ fontWeight: 700, fontSize: 16 }}>Recent activity</h2>
        <Card>
          <div className="space-y-1">
            {WALLET.history.map((h, i) => {
              const positive = h.amount > 0;
              const kindColor =
                h.kind === "bonus" ? "text-amber-700 bg-amber-50"
                : h.kind === "sponsored" ? "text-emerald-700 bg-emerald-50"
                : positive ? "text-violet-700 bg-violet-50" : "text-slate-600 bg-slate-100";
              return (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${positive ? "bg-emerald-50" : "bg-slate-100"}`}>
                      {positive ? <ArrowDownRight className="w-4 h-4 text-emerald-600" /> : <ArrowUpRight className="w-4 h-4 text-slate-500" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-foreground truncate">{h.label}</div>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${kindColor}`} style={{ fontWeight: 600 }}>
                          {h.kind}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{h.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm shrink-0 ${positive ? "text-emerald-700" : "text-slate-500"}`} style={{ fontWeight: 700 }}>
                    {positive ? "+" : ""}{h.amount.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      <Card className="bg-gradient-to-br from-primary/5 to-violet-50/40 border-primary/20">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-primary mt-0.5" />
          <div className="flex-1">
            <div className="text-sm text-foreground mb-1" style={{ fontWeight: 700 }}>Need more credits?</div>
            <p className="text-xs text-muted-foreground mb-3">
              Complete recommended practice, refer a colleague, or check if your company sponsors credits.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <Button size="sm" variant="gradient" onClick={() => navigate("/learning")}>
                Start a recommended practice
              </Button>
              <Button size="sm" variant="outline" onClick={() => navigate("/learning")}>
                Refer a colleague
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
