import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../../context/AppContext";
import {
  ArrowRight, Briefcase, Building2, CheckCircle2, ChevronLeft,
  Users, Shield, Rocket, User, Building, AlertCircle
} from "lucide-react";
import ahmadPhoto from "../../../imports/photo_1322455563730881281_c.jpg";

type AuthState =
  | "default"
  | "individual_signup"
  | "individual_login"
  | "org_signup_choice"
  | "company_signup"
  | "startup_signup"
  | "org_login"
  | "startup_login"
  | "mobile_verify"
  | "org_recovery"
  | "success_individual"
  | "success_company"
  | "success_startup"
  | "duplicate_company"
  | "success_recovery";

export function AuthPage() {
  const [view, setView] = useState<AuthState>("default");
  const [previousView, setPreviousView] = useState<AuthState>("default");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useApp();

  const [contact, setContact] = useState("");
  const [code, setCode] = useState("");
  const [nationalId, setNationalId] = useState("");

  const navigateTo = (newView: AuthState) => {
    setPreviousView(view);
    setView(newView);
    window.scrollTo(0, 0);
  };

  const handleSimulateLogin = (role: "individual" | "company" | "startup") => {
    setIsLoading(true);
    setTimeout(() => {
      const newUser = {
        id: `user-${Date.now()}`,
        name: role === "individual" ? "Ahmad Parvizi" : role === "company" ? "TechCorp Inc." : "NextGen Startup",
        title: role === "individual" ? "Senior Product Designer" : "Admin",
        company: role === "individual" ? "Digikala" : "",
        avatar: role === "individual" ? ahmadPhoto : "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?w=200",
        verified: role === "company",
        isPremium: false,
        identityVerified: false,
        customUrl: "",
        location: "Tehran, Iran",
        connectionCount: 0,
        professionalScore: 30,
        responseRate: 0,
        responseTime: "",
        workStatus: [],
        accountType: role as "individual" | "company" | "startup",
      };
      login(newUser);
      setIsLoading(false);
      if (role === "company") navigate("/company/snapp/admin");
      else if (role === "startup") navigate("/startup/nextgen/admin");
      else navigate("/");
    }, 1200);
  };

  const handleVerifyCode = () => {
    if (code.length !== 6) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (previousView === "individual_signup") navigateTo("success_individual");
      else if (previousView === "company_signup") navigateTo("success_company");
      else if (previousView === "startup_signup") navigateTo("success_startup");
      else handleSimulateLogin("individual"); // fallback
    }, 1000);
  };

  const handleCompanySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nationalId === "123456") {
      navigateTo("duplicate_company");
    } else {
      navigateTo("mobile_verify");
    }
  };

  const renderLeftPanel = () => (
    <div className="hidden lg:flex w-[45%] flex-col justify-between relative overflow-hidden bg-zinc-950 p-12 text-white">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1683560660669-6be33568035e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHByb2Zlc3Npb25hbCUyMGZ1dHVyaXN0aWMlMjBuZXR3b3JrJTIwY29ubmVjdGlvbnxlbnwxfHx8fDE3Nzg2ODc4NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Professional Network"
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/40 to-zinc-950/90" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-16 cursor-pointer" onClick={() => navigateTo("default")}>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#7c3aed] flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl font-bold">H</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">Hamrahe</span>
        </div>

        <div className="space-y-6 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Hamrahe; Where Opportunity Moves With You
          </h1>
          <p className="text-zinc-300 text-lg leading-relaxed">
            Build your professional identity, showcase your credibility, and connect with real opportunities through people, companies, and startups.
          </p>
          <p className="text-zinc-400 font-medium pt-4 border-t border-white/10">
            Create your path, build trust, and move toward better opportunities.
          </p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <Shield className="w-5 h-5 text-blue-400 mb-2" />
          <h3 className="font-semibold text-sm mb-1">Professional Identity</h3>
          <p className="text-xs text-zinc-400">Build your profile, skills, experience, and credibility.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <Briefcase className="w-5 h-5 text-violet-400 mb-2" />
          <h3 className="font-semibold text-sm mb-1">Employer Brand</h3>
          <p className="text-xs text-zinc-400">Showcase your company, culture, team, and opportunities.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
          <Users className="w-5 h-5 text-emerald-400 mb-2" />
          <h3 className="font-semibold text-sm mb-1">Layered Trust</h3>
          <p className="text-xs text-zinc-400">National company ID for registered companies, flexible trust levels for startups.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/30 flex w-full">
      {renderLeftPanel()}
      
      <div className="flex-1 flex flex-col relative">
        <header className="absolute top-0 w-full p-6 flex justify-between items-center z-20">
          <div className="lg:hidden flex items-center gap-2 cursor-pointer" onClick={() => navigateTo("default")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#7c3aed] flex items-center justify-center shadow-sm">
              <span className="text-white text-lg font-bold">H</span>
            </div>
            <span className="font-bold">Hamrahe</span>
          </div>
          <div className="ml-auto">
            {view === "default" && (
              <Button variant="ghost" onClick={() => navigateTo("individual_login")}>
                Log In
              </Button>
            )}
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 overflow-y-auto w-full">
          <div className="w-full max-w-xl mx-auto pt-16 lg:pt-0 pb-10">
            <AnimatePresence mode="wait">
              {view === "default" && (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow border-primary/10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">For Individuals</h2>
                        <p className="text-muted-foreground text-sm mt-1">
                          Build your professional profile, showcase your skills and experience, grow your network, and connect with better career opportunities.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <Button className="flex-1" onClick={() => navigateTo("individual_signup")}>
                        Create Individual Account
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => navigateTo("individual_login")}>
                        Log in as Individual
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6 hover:shadow-lg transition-shadow border-violet-500/10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-violet-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">For Organizations & Startups</h2>
                        <p className="text-muted-foreground text-sm mt-1">
                          Create your company or startup page, build your employer brand, showcase your team and culture, and attract the right talent.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                      <Button className="flex-1 bg-violet-600 hover:bg-violet-700" onClick={() => navigateTo("org_signup_choice")}>
                        Register Company or Startup
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => navigateTo("org_login")}>
                        Log in as Organization
                      </Button>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border/40">
                      <button
                        className="text-sm text-emerald-600 font-medium hover:underline w-full text-center flex items-center justify-center gap-1.5"
                        onClick={() => navigateTo("startup_login")}
                      >
                        <Rocket className="w-3.5 h-3.5" />
                        Log in as Startup or Early Team
                      </button>
                    </div>
                  </Card>

                  <p className="text-xs text-center text-muted-foreground mt-8 max-w-md mx-auto">
                    Companies and startups do not need to create a personal profile first. Create an independent organization account and add admins later.
                  </p>
                </motion.div>
              )}

              {view === "individual_signup" && (
                <motion.div key="individual_signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Button variant="ghost" size="sm" className="mb-6 -ml-3" onClick={() => navigateTo("default")}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Create Individual Account</h2>
                    <p className="text-muted-foreground mt-2">Start building your professional identity and unlock your profile on Hamrahe.</p>
                  </div>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigateTo("mobile_verify"); }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>First Name</Label>
                        <Input placeholder="Ahmad" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Last Name</Label>
                        <Input placeholder="Parvizi" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Mobile Number</Label>
                      <Input type="tel" placeholder="09123456789" required value={contact} onChange={e => setContact(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address (Optional)</Label>
                      <Input type="email" placeholder="ahmad@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm Password</Label>
                      <Input type="password" required />
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="terms" required />
                      <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I agree to Hamrahe's Terms and Privacy Policy.
                      </label>
                    </div>
                    <Button type="submit" className="w-full mt-6" size="lg">Create Account</Button>
                  </form>
                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an account? <button className="text-primary font-medium hover:underline" onClick={() => navigateTo("individual_login")}>Log in</button>
                  </p>
                </motion.div>
              )}

              {view === "individual_login" && (
                <motion.div key="individual_login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Button variant="ghost" size="sm" className="mb-6 -ml-3" onClick={() => navigateTo("default")}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Log in as Individual</h2>
                    <p className="text-muted-foreground mt-2">Access your professional profile, network, messages, and career opportunities.</p>
                  </div>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSimulateLogin("individual"); }}>
                    <div className="space-y-2">
                      <Label>Mobile Number or Email Address</Label>
                      <Input required />
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input type="password" required />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <label htmlFor="remember" className="text-sm font-medium">Remember me</label>
                      </div>
                      <button type="button" className="text-sm text-primary hover:underline">Forgot password?</button>
                    </div>
                    <div className="space-y-3 pt-4">
                      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Log In"}
                      </Button>
                      <Button type="button" variant="outline" className="w-full" size="lg" onClick={() => navigateTo("mobile_verify")}>
                        Log in with SMS Code
                      </Button>
                    </div>
                  </form>
                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Don't have an account? <button className="text-primary font-medium hover:underline" onClick={() => navigateTo("individual_signup")}>Create Individual Account</button>
                  </p>
                </motion.div>
              )}

              {view === "org_signup_choice" && (
                <motion.div key="org_signup_choice" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Button variant="ghost" size="sm" className="mb-6 -ml-3" onClick={() => navigateTo("default")}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Create Organization Account</h2>
                    <p className="text-muted-foreground mt-2">Choose the type of page you want to create. You can complete your profile, employer brand, verification, and admin settings later from your dashboard.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <Card className="p-5 border-2 hover:border-violet-500 transition-colors cursor-pointer group" onClick={() => navigateTo("company_signup")}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center shrink-0 group-hover:bg-violet-600 transition-colors">
                          <Building className="w-5 h-5 text-violet-600 group-hover:text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Registered Company</h3>
                          <p className="text-sm text-muted-foreground mt-1">For companies that are officially registered and have a national company ID.</p>
                          <span className="text-violet-600 text-sm font-medium mt-3 inline-flex items-center">
                            Register Company <ArrowRight className="w-4 h-4 ml-1" />
                          </span>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-5 border-2 hover:border-emerald-500 transition-colors cursor-pointer group" onClick={() => navigateTo("startup_signup")}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 transition-colors">
                          <Rocket className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">Startup or Early Team</h3>
                          <p className="text-sm text-muted-foreground mt-1">For startups, early-stage teams, and new brands that have not officially registered a company yet.</p>
                          <span className="text-emerald-600 text-sm font-medium mt-3 inline-flex items-center">
                            Register Startup <ArrowRight className="w-4 h-4 ml-1" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <p className="text-center text-sm text-muted-foreground mt-8">
                    Already have an organization account? <button className="text-primary font-medium hover:underline" onClick={() => navigateTo("org_login")}>Log in</button>
                  </p>
                </motion.div>
              )}

              {view === "company_signup" && (
                <motion.div key="company_signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Button variant="ghost" size="sm" className="mb-6 -ml-3" onClick={() => navigateTo("org_signup_choice")}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Register Company</h2>
                    <p className="text-muted-foreground mt-2">Create your organization account. You can complete your company profile, employer brand, and full verification later.</p>
                  </div>
                  <form className="space-y-4" onSubmit={handleCompanySubmit}>
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input required />
                    </div>
                    <div className="space-y-2">
                      <Label>National Company ID</Label>
                      <Input value={nationalId} onChange={e => setNationalId(e.target.value)} required />
                      <p className="text-xs text-muted-foreground">Used to prevent fake pages. Try "123456" for duplicate demo.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Industry</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tech">Technology</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="health">Healthcare</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Main City</Label>
                        <Input required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Company Username</Label>
                      <div className="flex flex-col">
                        <Input required placeholder="mycompany" />
                        <p className="text-xs text-muted-foreground mt-1">hamrahe.com/company/mycompany</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Official Mobile Number</Label>
                        <Input type="tel" required value={contact} onChange={e => setContact(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Email (Optional)</Label>
                        <Input type="email" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Password</Label>
                        <Input type="password" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Confirm Password</Label>
                        <Input type="password" required />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="auth_confirm" required />
                      <label htmlFor="auth_confirm" className="text-sm font-medium leading-none">
                        I confirm that I am authorized to create or manage this organization account.
                      </label>
                    </div>
                    <Button type="submit" className="w-full mt-6" size="lg" variant="default">Create Company Account</Button>
                  </form>
                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an organization account? <button className="text-primary font-medium hover:underline" onClick={() => navigateTo("org_login")}>Log in</button>
                  </p>
                </motion.div>
              )}

              {view === "startup_signup" && (
                <motion.div key="startup_signup" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Button variant="ghost" size="sm" className="mb-6 -ml-3" onClick={() => navigateTo("org_signup_choice")}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Register Startup or Early Team</h2>
                    <p className="text-muted-foreground mt-2">Create an early organization page without official company registration. You can build your profile now and increase trust level later.</p>
                  </div>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigateTo("mobile_verify"); }}>
                    <div className="space-y-2">
                      <Label>Startup or Team Name</Label>
                      <Input required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Stage</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Select Stage" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="idea">Idea Stage</SelectItem>
                            <SelectItem value="building">Building Product</SelectItem>
                            <SelectItem value="mvp">Prototype / MVP</SelectItem>
                            <SelectItem value="active">Active Product</SelectItem>
                            <SelectItem value="users">Has Early Users</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Industry</Label>
                        <Input required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Page Username</Label>
                      <div className="flex flex-col">
                        <Input required placeholder="mystartup" />
                        <p className="text-xs text-muted-foreground mt-1">hamrahe.com/startup/mystartup</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Mobile Number</Label>
                      <Input type="tel" required value={contact} onChange={e => setContact(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Password</Label>
                        <Input type="password" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Confirm Password</Label>
                        <Input type="password" required />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="startup_confirm" required />
                      <label htmlFor="startup_confirm" className="text-sm font-medium leading-none">
                        I confirm that I am authorized to create or manage this startup page.
                      </label>
                    </div>
                    <Button type="submit" className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700" size="lg">Create Startup Account</Button>
                  </form>
                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an organization account? <button className="text-primary font-medium hover:underline" onClick={() => navigateTo("org_login")}>Log in</button>
                  </p>
                </motion.div>
              )}

              {view === "org_login" && (
                <motion.div key="org_login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Button variant="ghost" size="sm" className="mb-6 -ml-3" onClick={() => navigateTo("default")}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Log in as Organization</h2>
                    <p className="text-muted-foreground mt-2">Access your company or startup account and manage your profile, employer brand, admins, and hiring tools.</p>
                  </div>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSimulateLogin("company"); }}>
                    <div className="space-y-2">
                      <Label>Username, National ID, Email, or Mobile</Label>
                      <Input required />
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input type="password" required />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="org_remember" />
                        <label htmlFor="org_remember" className="text-sm font-medium">Remember me</label>
                      </div>
                      <button type="button" className="text-sm text-primary hover:underline">Forgot password?</button>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-lg flex gap-3 items-start mt-2">
                      <Shield className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        If email access is interrupted, you can use your registered mobile number and SMS code to log in.
                      </p>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Log In to Organization Dashboard"}
                      </Button>
                      <Button type="button" variant="outline" className="w-full" size="lg" onClick={() => navigateTo("mobile_verify")}>
                        Log in with SMS Code
                      </Button>
                    </div>
                  </form>
                  <div className="flex flex-col gap-2 text-center mt-6">
                    <button className="text-sm text-primary font-medium hover:underline" onClick={() => navigateTo("startup_login")}>Log in as Startup or Early Team</button>
                    <button className="text-sm text-primary font-medium hover:underline" onClick={() => navigateTo("org_signup_choice")}>Register Company or Startup</button>
                    <button className="text-sm text-muted-foreground hover:text-primary hover:underline" onClick={() => navigateTo("org_recovery")}>Recover Organization Access</button>
                    <button className="text-sm text-muted-foreground hover:text-primary hover:underline" onClick={() => navigateTo("individual_login")}>Log in as Individual</button>
                  </div>
                </motion.div>
              )}

              {view === "startup_login" && (
                <motion.div key="startup_login" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Button variant="ghost" size="sm" className="mb-6 -ml-3" onClick={() => navigateTo("default")}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Log in as Startup or Early Team</h2>
                    <p className="text-muted-foreground mt-2">Access your startup dashboard, manage your team profile, and connect with talent.</p>
                  </div>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSimulateLogin("startup"); }}>
                    <div className="space-y-2">
                      <Label>Startup username, email, or mobile number</Label>
                      <Input required />
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input type="password" required />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="startup_remember" />
                        <label htmlFor="startup_remember" className="text-sm font-medium">Remember me</label>
                      </div>
                      <button type="button" className="text-sm text-primary hover:underline">Forgot password?</button>
                    </div>

                    <div className="bg-emerald-50 p-3 rounded-lg flex gap-3 items-start mt-2 border border-emerald-100">
                      <Rocket className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-emerald-700 leading-relaxed">
                        Startups and early teams have their own independent account. No personal profile needed to get started.
                      </p>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Log In to Startup Dashboard"}
                      </Button>
                      <Button type="button" variant="outline" className="w-full" size="lg" onClick={() => navigateTo("mobile_verify")}>
                        Log in with SMS Code
                      </Button>
                    </div>
                  </form>
                  <div className="flex flex-col gap-2 text-center mt-6">
                    <button className="text-sm text-primary font-medium hover:underline" onClick={() => navigateTo("org_login")}>Log in as Organization / Company</button>
                    <button className="text-sm text-primary font-medium hover:underline" onClick={() => navigateTo("org_signup_choice")}>Register Company or Startup</button>
                    <button className="text-sm text-muted-foreground hover:text-primary hover:underline" onClick={() => navigateTo("individual_login")}>Log in as Individual</button>
                  </div>
                </motion.div>
              )}

              {view === "mobile_verify" && (
                <motion.div key="mobile_verify" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                  <Button variant="ghost" size="sm" className="mb-6 -ml-3" onClick={() => navigateTo(previousView)}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Verify Mobile Number</h2>
                    <p className="text-muted-foreground mt-2">Enter the code sent to {contact || "your mobile number"}.</p>
                  </div>
                  <div className="space-y-6">
                    <Input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="------"
                      className="w-full px-4 py-6 bg-muted/30 border-border/50 rounded-xl text-3xl text-center tracking-[1em] font-mono focus:ring-primary/20"
                      maxLength={6}
                    />
                    <Button className="w-full" size="lg" onClick={handleVerifyCode} disabled={code.length !== 6 || isLoading}>
                      {isLoading ? "Verifying..." : "Verify and Continue"}
                    </Button>
                    <div className="text-center">
                      <button className="text-sm text-muted-foreground hover:text-primary" onClick={() => navigateTo(previousView)}>Change Mobile Number</button>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <button className="text-sm text-primary hover:underline">Resend Code</button>
                    </div>
                  </div>
                </motion.div>
              )}

              {view === "org_recovery" && (
                <motion.div key="org_recovery" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <Button variant="ghost" size="sm" className="mb-6 -ml-3" onClick={() => navigateTo("org_login")}>
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                  </Button>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold">Recover Organization Access</h2>
                    <p className="text-muted-foreground mt-2">Use this if you no longer have access to the organization account, previous login credentials, or the person who created the account has left the company.</p>
                  </div>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigateTo("success_recovery"); }}>
                    <div className="space-y-2">
                      <Label>Company or Startup Name</Label>
                      <Input required />
                    </div>
                    <div className="space-y-2">
                      <Label>National Company ID (If Registered Company)</Label>
                      <Input />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Registered Mobile or Contact</Label>
                        <Input required />
                      </div>
                      <div className="space-y-2">
                        <Label>Your Full Name</Label>
                        <Input required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Your Role</Label>
                      <Input required />
                    </div>
                    <div className="space-y-2">
                      <Label>Description of Request</Label>
                      <textarea className="flex w-full rounded-md border border-input bg-input-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[100px]" required></textarea>
                    </div>
                    <Button type="submit" className="w-full mt-6" size="lg">Submit Access Recovery Request</Button>
                  </form>
                </motion.div>
              )}

              {view === "duplicate_company" && (
                <motion.div key="duplicate_company" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold">This company already exists on Hamrahe</h2>
                  <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                    If you are authorized to manage this company page, you can request access instead of creating a duplicate page.
                  </p>
                  <div className="flex flex-col gap-3 mt-8 max-w-sm mx-auto">
                    <Button size="lg" onClick={() => navigateTo("org_recovery")}>Request Access to Existing Company</Button>
                    <Button variant="outline" size="lg" onClick={() => navigateTo("company_signup")}>Edit Information</Button>
                  </div>
                </motion.div>
              )}

              {view === "success_individual" && (
                <motion.div key="success_individual" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Your account has been created</h2>
                  <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                    Complete your professional profile to start building credibility and connecting with opportunities.
                  </p>
                  <Button size="lg" className="mt-8" onClick={() => handleSimulateLogin("individual")}>
                    Complete My Profile
                  </Button>
                </motion.div>
              )}

              {view === "success_company" && (
                <motion.div key="success_company" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Your company account has been created</h2>
                  <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                    You can now complete your company profile, build your employer brand, and start the verification process to unlock hiring features.
                  </p>
                  <div className="flex flex-col gap-3 mt-8 max-w-sm mx-auto">
                    <Button size="lg" onClick={() => handleSimulateLogin("company")}>Go to Company Dashboard</Button>
                    <Button variant="outline" size="lg" onClick={() => handleSimulateLogin("company")}>Start Verification Later</Button>
                  </div>
                </motion.div>
              )}

              {view === "success_startup" && (
                <motion.div key="success_startup" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Your startup page has been created</h2>
                  <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                    You can now complete your startup profile, introduce your team and product, and increase your trust level over time. Once your company is officially registered, you can upgrade this page to a verified company account.
                  </p>
                  <div className="flex flex-col gap-3 mt-8 max-w-sm mx-auto">
                    <Button size="lg" onClick={() => handleSimulateLogin("startup")}>Go to Startup Dashboard</Button>
                    <Button variant="outline" size="lg" onClick={() => handleSimulateLogin("startup")}>Complete Startup Profile Later</Button>
                  </div>
                </motion.div>
              )}

              {view === "success_recovery" && (
                <motion.div key="success_recovery" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Your request has been submitted</h2>
                  <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                    Hamrahe's support team will review your request and contact you if more information is needed.
                  </p>
                  <Button size="lg" className="mt-8" onClick={() => navigateTo("default")}>
                    Back to Home
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}