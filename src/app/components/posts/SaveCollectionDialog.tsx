import { useState } from "react";
import { Bookmark, FolderPlus, Check, X, Lock } from "lucide-react";
import { toast } from "sonner";

interface SaveCollectionDialogProps {
  postId: string;
  onClose: () => void;
}

export function SaveCollectionDialog({ postId, onClose }: SaveCollectionDialogProps) {
  const [collections, setCollections] = useState([
    { id: "1", name: "UI/UX & Design Inspiration", count: 12 },
    { id: "2", name: "Startup Strategy & Growth", count: 8 },
    { id: "3", name: "Engineering & Architecture", count: 15 },
  ]);
  const [selectedCol, setSelectedCol] = useState<string | null>("1");
  const [newColName, setNewColName] = useState("");
  const [showCreate, setShowShowCreate] = useState(false);
  const [privateNote, setPrivateNote] = useState("");

  const handleCreate = () => {
    if (!newColName.trim()) return;
    const newCol = { id: `col_${Date.now()}`, name: newColName.trim(), count: 1 };
    setCollections([...collections, newCol]);
    setSelectedCol(newCol.id);
    setNewColName("");
    setShowShowCreate(false);
    toast.success(`Collection "${newCol.name}" created`);
  };

  const handleSave = () => {
    toast.success("Post saved to collection");
    onClose();
  };

  return (
    <div className="p-4 bg-card border border-border/30 rounded-2xl shadow-xl max-w-md w-full">
      <div className="flex items-center justify-between pb-3 border-b border-border/20">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-primary fill-primary/20" />
          <h3 className="text-sm font-semibold text-foreground">Save to Collection</h3>
        </div>
        <button onClick={onClose} className="p-1.5 hover:bg-muted/50 rounded-xl cursor-pointer">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {/* Privacy Note */}
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-muted/20 p-2 rounded-xl">
          <Lock className="w-3 h-3 text-emerald-500 shrink-0" />
          <span>Saved posts & private notes are strictly visible to you.</span>
        </div>

        {/* Collections List */}
        <div className="space-y-1.5 max-h-[180px] overflow-y-auto">
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => setSelectedCol(col.id)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                selectedCol === col.id
                  ? "bg-primary/10 border-primary/40 text-foreground font-medium"
                  : "bg-muted/10 border-border/20 text-muted-foreground hover:bg-muted/30"
              }`}
            >
              <span className="text-xs truncate">{col.name}</span>
              <span className="text-[10px] text-muted-foreground">{col.count} items</span>
            </button>
          ))}
        </div>

        {/* Create new collection */}
        {!showCreate ? (
          <button
            onClick={() => setShowShowCreate(true)}
            className="flex items-center gap-1.5 text-xs text-primary font-medium cursor-pointer hover:underline pt-1"
          >
            <FolderPlus className="w-3.5 h-3.5" /> Create New Collection
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              value={newColName}
              onChange={(e) => setNewColName(e.target.value)}
              placeholder="Collection name..."
              className="flex-1 px-3 py-1.5 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
            />
            <button onClick={handleCreate} className="px-3 py-1.5 bg-primary text-white text-xs rounded-xl cursor-pointer">
              Add
            </button>
          </div>
        )}

        {/* Private Note */}
        <div>
          <label className="text-xs font-medium text-foreground block mb-1">Private Note (Optional)</label>
          <input
            value={privateNote}
            onChange={(e) => setPrivateNote(e.target.value)}
            placeholder="Add private note for reference..."
            className="w-full px-3 py-2 bg-muted/30 border border-border/20 rounded-xl text-xs focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-border/20 mt-4">
        <button onClick={onClose} className="px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted/40 rounded-xl cursor-pointer">
          Cancel
        </button>
        <button onClick={handleSave} className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-medium hover:bg-primary/90 cursor-pointer transition-colors flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5" />
          Save
        </button>
      </div>
    </div>
  );
}
