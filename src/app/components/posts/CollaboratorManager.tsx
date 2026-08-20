import { useState } from "react";
import { Users, UserPlus, X, Check, Search, ShieldCheck } from "lucide-react";
import { Collaborator } from "../../types/post-types";
import { users } from "../../data/mock-data";
import { Avatar } from "../ui/Avatar";
import { toast } from "sonner";

interface CollaboratorManagerProps {
  collaborators: Collaborator[];
  onUpdate: (collaborators: Collaborator[]) => void;
  onClose: () => void;
}

const ROLES = [
  "Product Design",
  "Engineering",
  "Research",
  "Business Development",
  "Content & Marketing",
  "Project Management",
  "Speaker",
  "Project Contributor",
];

export function CollaboratorManager({ collaborators, onUpdate, onClose }: CollaboratorManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState(ROLES[0]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInvite = (user: typeof users[0]) => {
    if (collaborators.some((c) => c.user.id === user.id)) {
      toast.error("User already invited");
      return;
    }
    const newCollab: Collaborator = {
      id: `collab_${Date.now()}`,
      user,
      role: selectedRole,
      status: "accepted", // Auto-accept in prototype simulation
    };
    onUpdate([...collaborators, newCollab]);
    toast.success(`Invited ${user.name} as ${selectedRole}`);
  };

  const handleRemove = (id: string) => {
    onUpdate(collaborators.filter((c) => c.id !== id));
    toast.success("Collaborator removed");
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col">
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-foreground">Post Collaborators</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-3 space-y-3 overflow-y-auto pr-1 flex-1">
        {/* Selected Role */}
        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Contribution Role</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
          >
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-muted-foreground" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search colleagues, co-authors or partners..."
            className="w-full pl-9 pr-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
          />
        </div>

        {/* Search Results */}
        <div className="space-y-1.5 max-h-[180px] overflow-y-auto">
          {filteredUsers.map((u) => {
            const isAdded = collaborators.some((c) => c.user.id === u.id);
            return (
              <div
                key={u.id}
                className="flex items-center justify-between p-2 hover:bg-muted/30 rounded-xl border border-border/10"
              >
                <div className="flex items-center gap-2.5">
                  <Avatar src={u.avatar} name={u.name} size="sm" />
                  <div>
                    <p className="text-xs font-medium text-foreground">{u.name}</p>
                    <p className="text-[10px] text-muted-foreground">{u.title}</p>
                  </div>
                </div>
                <button
                  disabled={isAdded}
                  onClick={() => handleInvite(u)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    isAdded ? "bg-muted/50 text-muted-foreground cursor-not-allowed" : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {isAdded ? "Added" : "Invite"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Current Collaborators */}
        {collaborators.length > 0 && (
          <div className="pt-3 border-t border-border/20 space-y-2">
            <p className="text-xs font-medium text-foreground">Added Collaborators</p>
            {collaborators.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-2 bg-muted/20 rounded-xl border border-border/20">
                <div className="flex items-center gap-2">
                  <Avatar src={c.user.avatar} name={c.user.name} size="xs" />
                  <div>
                    <p className="text-xs font-medium text-foreground">{c.user.name}</p>
                    <p className="text-[10px] text-primary">{c.role}</p>
                  </div>
                </div>
                <button onClick={() => handleRemove(c.id)} className="p-1 hover:bg-red-500/10 rounded-lg text-red-500 cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/20 mt-3">
        <button onClick={onClose} className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-medium cursor-pointer">
          Done
        </button>
      </div>
    </div>
  );
}
