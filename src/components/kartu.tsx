import { useState } from "react";
import { Archive, ArchiveRestore, Trash2, Edit2, Check, X } from "lucide-react";
import { archiveNote, unarchiveNote, deleteNote, createNote } from "@/lib/notes-api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface KartuProps {
  id: string;
  title: string;
  body: string;
  color?: string;
  createdAt: string;
  isArchived?: boolean;
  onActionComplete?: () => void;
}

export function Kartu({ 
  id, 
  title, 
  body, 
  color = "bg-yellow-300", 
  createdAt, 
  isArchived = false,
  onActionComplete 
}: KartuProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body);

  const handleArchive = async () => {
    setIsLoading(true);
    try {
      await archiveNote(id);
      if (onActionComplete) onActionComplete();
    } catch (error) {
      console.error("Failed to archive note:", error);
      alert("Failed to archive note");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnarchive = async () => {
    setIsLoading(true);
    try {
      await unarchiveNote(id);
      if (onActionComplete) onActionComplete();
    } catch (error) {
      console.error("Failed to unarchive note:", error);
      alert("Failed to unarchive note");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteNote(id);
      if (onActionComplete) onActionComplete();
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Failed to delete note:", error);
      alert("Failed to delete note");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(title);
    setEditBody(body);
  };

  const handleSaveEdit = async () => {
    if (!editTitle && !editBody) {
      alert("Title or body cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      // Karena API tidak support update, kita delete + create
      await deleteNote(id);
      await createNote(editTitle, editBody);
      
      setIsEditing(false);
      if (onActionComplete) onActionComplete();
    } catch (error) {
      console.error("Failed to update note:", error);
      alert("Failed to update note");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(title);
    setEditBody(body);
  };

  return (
    <>
      <Card className={`${color} w-64 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex flex-col relative group`}>
        {/* Action Buttons */}
        {!isEditing && (
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Edit button */}
            <button
              onClick={handleEdit}
              disabled={isLoading}
              className="p-1.5 bg-blue-600/80 hover:bg-blue-600 rounded-lg transition-colors disabled:opacity-50"
              title="Edit note"
            >
              <Edit2 className="w-4 h-4 text-white" />
            </button>

            {!isArchived ? (
              <button
                onClick={handleArchive}
                disabled={isLoading}
                className="p-1.5 bg-black/70 hover:bg-black rounded-lg transition-colors disabled:opacity-50"
                title="Archive note"
              >
                <Archive className="w-4 h-4 text-white" />
              </button>
            ) : (
              <button
                onClick={handleUnarchive}
                disabled={isLoading}
                className="p-1.5 bg-black/70 hover:bg-black rounded-lg transition-colors disabled:opacity-50"
                title="Unarchive note"
              >
                <ArchiveRestore className="w-4 h-4 text-white" />
              </button>
            )}
            
            <button
              onClick={() => setShowDeleteDialog(true)}
              disabled={isLoading}
              className="p-1.5 bg-red-600/80 hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50"
              title="Delete note"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        {/* Edit Mode Buttons */}
        {isEditing && (
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={handleSaveEdit}
              disabled={isLoading}
              className="p-1.5 bg-green-600/90 hover:bg-green-600 rounded-lg transition-colors disabled:opacity-50"
              title="Save changes"
            >
              <Check className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="p-1.5 bg-gray-600/90 hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
              title="Cancel"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        )}

        <CardHeader className="pb-3 shrink-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-1 text-sm font-semibold bg-white/50 rounded border border-black/20 text-black"
              placeholder="Note title..."
              disabled={isLoading}
            />
          ) : (
            <CardTitle className="text-black font-semibold line-clamp-2 wrap-break-word pr-20">
              {title || "Untitled"}
            </CardTitle>
          )}
        </CardHeader>
        
        <CardContent className="text-sm text-black/80 grow overflow-auto wrap-break-word whitespace-pre-wrap">
          {isEditing ? (
            <textarea
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              className="w-full h-full min-h-[100px] p-1 text-sm bg-white/50 rounded border border-black/20 text-black resize-none"
              placeholder="Note content..."
              disabled={isLoading}
            />
          ) : (
            body || "No content"
          )}
        </CardContent>
        
        <CardFooter className="pt-3 text-xs text-black/60 justify-between shrink-0 border-t border-black/10">
          <span>
            {new Date(createdAt).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </span>
          {isArchived && (
            <span className="text-xs font-medium bg-black/20 px-2 py-0.5 rounded">
              Archived
            </span>
          )}
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Note</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{title || 'this note'}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}