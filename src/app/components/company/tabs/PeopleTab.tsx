import { useState } from "react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Avatar } from "../../ui/Avatar";
import {
  CheckCircle2,
  Users,
  UserPlus,
  Shield,
  MessageSquare,
  ChevronRight,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { MOCK_PEOPLE } from "../companyMockData";
import { useNavigate } from "react-router";

interface PeopleTabProps {
  viewMode: "public" | "loggedIn" | "admin";
}

function PersonCard({
  person,
  badge,
  showMutual = false,
}: {
  person: { name: string; role: string; avatar: string; mutual?: number; verified?: boolean; id?: string };
  badge?: string;
  showMutual?: boolean;
}) {
  const navigate = useNavigate();
  const [connected, setConnected] = useState(false);

  const handleProfileClick = () => {
    // Use a generated ID based on name if no ID is provided
    const personId = person.id || person.name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/profile/${personId}`);
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors">
      <button onClick={handleProfileClick} className="relative shrink-0 cursor-pointer">
        <Avatar src={person.avatar} name={person.name} size="md" />
        {person.verified && (
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
        )}
      </button>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <button
              onClick={handleProfileClick}
              className="text-sm text-foreground hover:text-primary hover:underline transition-colors text-left cursor-pointer"
              style={{ fontWeight: 600 }}
            >
              {person.name}
            </button>
            <p className="text-xs text-muted-foreground">{person.role}</p>
            {badge && (
              <div className="flex items-center gap-1 mt-0.5">
                <Shield className="w-3 h-3 text-emerald-500" />
                <span className="text-xs text-emerald-600 dark:text-emerald-400" style={{ fontWeight: 600 }}>
                  {badge}
                </span>
              </div>
            )}
            {showMutual && person.mutual !== undefined && person.mutual > 0 && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {person.mutual} mutual connection{person.mutual > 1 ? "s" : ""}
              </p>
            )}
          </div>
          <div className="flex gap-1 shrink-0">
            <Button variant="ghost" size="icon" className="w-7 h-7">
              <MessageSquare className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant={connected ? "outline" : "ghost"}
              size="icon"
              className="w-7 h-7"
              onClick={(e) => {
                e.stopPropagation();
                setConnected(!connected);
              }}
            >
              {connected ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <UserPlus className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PeopleSection({ title, people, badge, showMutual }: {
  title: string;
  people: { name: string; role: string; avatar: string; mutual?: number; verified?: boolean; badge?: string }[];
  badge?: string;
  showMutual?: boolean;
}) {
  const [showAll, setShowAll] = useState(false);
  const displayedPeople = showAll ? people : people.slice(0, 3);

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
          {title}
        </h3>
        <span className="text-xs text-muted-foreground">{people.length} people</span>
      </div>
      <div className="divide-y divide-border/20">
        {displayedPeople.map((person) => (
          <PersonCard
            key={person.name}
            person={person}
            badge={badge || person.badge}
            showMutual={showMutual}
          />
        ))}
      </div>
      {people.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-xs text-primary flex items-center gap-0.5 hover:underline"
        >
          {showAll ? "Show less" : `Show all ${people.length}`}
          <ChevronRight className={`w-3 h-3 transition-transform ${showAll ? "rotate-90" : ""}`} />
        </button>
      )}
    </Card>
  );
}

function ContactHiringTeam() {
  return (
    <Card className="bg-gradient-to-br from-primary/5 to-violet-500/5 border border-primary/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-600 flex items-center justify-center shrink-0">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
            Message Hiring Team
          </h3>
          <p className="text-xs text-muted-foreground">Reach out directly to verified recruiters at Snapp.</p>
        </div>
        <Button variant="gradient" size="sm" className="shrink-0">
          Contact
        </Button>
      </div>
    </Card>
  );
}

function PeopleYouKnow({ viewMode }: { viewMode: string }) {
  if (viewMode === "public") return null;

  const mutual = MOCK_PEOPLE.employees.filter((e) => (e.mutual ?? 0) > 0);

  if (mutual.length === 0) return null;

  return (
    <Card className="border border-primary/20">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
        <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
          People You Know at Snapp
        </h3>
      </div>
      <div className="space-y-0">
        {mutual.map((person) => (
          <PersonCard key={person.name} person={person} showMutual />
        ))}
      </div>
    </Card>
  );
}

function EmployeeConfirmation() {
  return (
    <Card>
      <h3 className="text-sm text-foreground mb-2" style={{ fontWeight: 700 }}>
        How employees are confirmed
      </h3>
      <div className="space-y-2">
        {[
          "User adds Snapp to their work experience",
          "Hamrahe links the user to the company entity",
          "User requests confirmation from company",
          "Company admin confirms the connection",
          "User appears as a confirmed employee",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="w-5 h-5 rounded-full bg-muted text-xs flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            {step}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function PeopleTab({ viewMode }: PeopleTabProps) {
  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-[1fr_280px] gap-4">
        <div className="space-y-4">
          <PeopleYouKnow viewMode={viewMode} />
          <PeopleSection title="Leadership" people={MOCK_PEOPLE.leadership} />
          <PeopleSection title="Verified Hiring Team" people={MOCK_PEOPLE.hiringTeam} showMutual={viewMode !== "public"} />
          <PeopleSection
            title="Confirmed Employees"
            people={MOCK_PEOPLE.employees}
            showMutual={viewMode !== "public"}
          />
        </div>
        <div className="space-y-4">
          <ContactHiringTeam />
          <Card>
            <h3 className="text-sm text-foreground mb-3" style={{ fontWeight: 700 }}>
              Team at a Glance
            </h3>
            <div className="space-y-3">
              {[
                { label: "Confirmed Employees", value: 436 },
                { label: "Verified Recruiters", value: 2 },
                { label: "Verified Executives", value: 5 },
                { label: "Employee Advocates", value: 38 },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm text-foreground" style={{ fontWeight: 700 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
          <EmployeeConfirmation />
        </div>
      </div>
    </div>
  );
}
