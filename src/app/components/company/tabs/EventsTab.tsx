import { useState } from "react";
import { Card } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Briefcase,
  Star,
  Bell,
  ChevronRight,
  Video,
  Monitor,
} from "lucide-react";
import { motion } from "motion/react";
import { MOCK_EVENTS, EventData } from "../companyMockData";

interface EventsTabProps {
  viewMode: "public" | "loggedIn" | "admin";
}

const EVENT_TYPE_COLORS: Record<string, string> = {
  "Hiring Day": "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Webinar: "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
  "Company Open Day": "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Workshop: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  "Networking Session": "bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400",
};

function EventCard({ event, viewMode, featured }: { event: EventData; viewMode: string; featured?: boolean }) {
  const [registered, setRegistered] = useState(false);

  return (
    <Card className={`hover:shadow-md transition-shadow ${featured ? "border border-primary/20 bg-gradient-to-br from-primary/3 to-violet-500/3" : ""}`}>
      {featured && (
        <div className="flex items-center gap-1.5 mb-3">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs text-amber-600" style={{ fontWeight: 600 }}>
            Featured Event
          </span>
        </div>
      )}
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-violet-500/10 flex flex-col items-center justify-center shrink-0 border border-primary/10">
          <span className="text-primary text-xs" style={{ fontWeight: 700 }}>
            {event.date.split(",")[0].split(" ")[0]}
          </span>
          <span className="text-foreground text-lg leading-none" style={{ fontWeight: 800 }}>
            {event.date.split(",")[0].split(" ")[1]}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
              {event.title}
            </h3>
          </div>
          <div className="flex items-center flex-wrap gap-2 text-xs text-muted-foreground mb-2">
            <span
              className={`px-2 py-0.5 rounded-lg ${EVENT_TYPE_COLORS[event.type] || "bg-muted text-muted-foreground"}`}
            >
              {event.type}
            </span>
            <span className="flex items-center gap-1">
              {event.mode === "Online" ? <Monitor className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
              {event.mode}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {event.time}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {event.registrations} registered
            </span>
          </div>

          {event.relatedJobs.length > 0 && (
            <div className="mb-2">
              <p className="text-xs text-muted-foreground mb-1">Related roles:</p>
              <div className="flex flex-wrap gap-1.5">
                {event.relatedJobs.map((job) => (
                  <div
                    key={job}
                    className="flex items-center gap-1 text-xs bg-muted/40 text-muted-foreground px-2 py-0.5 rounded-lg"
                  >
                    <Briefcase className="w-3 h-3" />
                    {job}
                  </div>
                ))}
              </div>
            </div>
          )}

          {viewMode !== "public" && event.recommendedBefore.length > 0 && (
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-3">
              <p className="text-xs text-blue-700 dark:text-blue-400 mb-1" style={{ fontWeight: 600 }}>
                Recommended before attending:
              </p>
              {event.recommendedBefore.map((rec) => (
                <div key={rec} className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
                  <BookOpen className="w-3 h-3" />
                  {rec}
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant={registered ? "outline" : "gradient"}
              size="sm"
              onClick={() => setRegistered(!registered)}
            >
              {registered ? "Registered" : "Register"}
            </Button>
            <Button variant="ghost" size="sm">
              View Details
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function EmptyEvents() {
  return (
    <Card className="text-center py-10">
      <Calendar className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
      <p className="text-sm text-foreground" style={{ fontWeight: 600 }}>
        No upcoming events
      </p>
      <p className="text-xs text-muted-foreground mt-1 mb-4">
        Follow this company to get notified about future events.
      </p>
      <Button variant="outline" size="sm">
        Follow Company
      </Button>
    </Card>
  );
}

export function EventsTab({ viewMode }: EventsTabProps) {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

  const featured = MOCK_EVENTS.find((e) => e.featured);
  const regular = MOCK_EVENTS.filter((e) => !e.featured);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter("upcoming")}
          className={`px-4 py-1.5 rounded-xl text-sm transition-colors ${
            filter === "upcoming" ? "bg-primary text-white" : "bg-muted/40 text-muted-foreground hover:bg-muted/70"
          }`}
          style={{ fontWeight: filter === "upcoming" ? 600 : 400 }}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter("past")}
          className={`px-4 py-1.5 rounded-xl text-sm transition-colors ${
            filter === "past" ? "bg-primary text-white" : "bg-muted/40 text-muted-foreground hover:bg-muted/70"
          }`}
          style={{ fontWeight: filter === "past" ? 600 : 400 }}
        >
          Past Events
        </button>
      </div>

      {filter === "upcoming" ? (
        <div className="space-y-4">
          {featured && <EventCard event={featured} viewMode={viewMode} featured />}
          {regular.map((event) => (
            <EventCard key={event.id} event={event} viewMode={viewMode} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-14 h-14 rounded-xl bg-muted flex flex-col items-center justify-center shrink-0">
                <span className="text-muted-foreground text-xs">Apr</span>
                <span className="text-foreground text-lg leading-none" style={{ fontWeight: 800 }}>12</span>
              </div>
              <div>
                <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
                  Snapp Career Day — Spring 2026
                </h3>
                <p className="text-xs text-muted-foreground">Webinar · 428 attendees · Ended</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3 opacity-60">
              <div className="w-14 h-14 rounded-xl bg-muted flex flex-col items-center justify-center shrink-0">
                <span className="text-muted-foreground text-xs">Mar</span>
                <span className="text-foreground text-lg leading-none" style={{ fontWeight: 800 }}>8</span>
              </div>
              <div>
                <h3 className="text-sm text-foreground" style={{ fontWeight: 700 }}>
                  Tech Talks: Super App Architecture
                </h3>
                <p className="text-xs text-muted-foreground">Webinar · 312 attendees · Ended</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
