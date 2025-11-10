import { useState } from "react";
import { createNote } from "@/lib/notes-api";

type CreateTabProps = {
  selectedColor: string;
  onColorChange: (color: string) => void;
  onNoteCreated: () => void;
  onNavigateHome: () => void; // ← Tambah prop baru untuk navigate ke home
};

const colorOptions = [
  { name: "Red", color: "bg-red-400" },
  { name: "Blue", color: "bg-blue-400" },
  { name: "Green", color: "bg-green-300" },
  { name: "Yellow", color: "bg-yellow-300" },
  { name: "Indigo", color: "bg-indigo-400" },
  { name: "Violet", color: "bg-violet-300" },
  { name: "Teal", color: "bg-teal-300" },
  { name: "Fuchsia", color: "bg-fuchsia-300" },
];

export const CreateTab = ({ 
  selectedColor, 
  onColorChange, 
  onNoteCreated,
  onNavigateHome 
}: CreateTabProps) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const saveNote = async () => {
    if (!title && !body) {
      setError("Please fill in at least title or body");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createNote(title, body);
      setTitle("");
      setBody("");
      setSuccess(true);
      
      // Refresh notes list
      onNoteCreated();
      
      // Redirect ke home setelah 1 detik (biar user sempat lihat success message)
      setTimeout(() => {
        setSuccess(false);
        onNavigateHome();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create note");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="max-w-screen">
        <div className={`${selectedColor} rounded-lg p-4 shadow-md`}>
          <h2 className="text-black font-bold mb-3">Create New Note</h2>
          
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1.5 text-black">Choose Color:</label>
            <div className="flex gap-1.5 flex-wrap">
              {colorOptions.map((colorItem) => (
                <button
                  key={colorItem.color}
                  onClick={() => onColorChange(colorItem.color)}
                  disabled={isLoading}
                  className={`w-4 h-4 rounded-full ${colorItem.color} hover:ring-1 ring-white transition-all disabled:opacity-50 ${
                    selectedColor === colorItem.color ? 'ring-2 ring-accent' : ''
                  }`}
                  title={colorItem.name}
                />
              ))}
            </div>
          </div>

          <input
            type="text"
            placeholder="Note title..."
            className="w-full p-2 rounded mb-2 text-sm text-gray-900"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
          <textarea
            placeholder="Note content..."
            className="w-full p-2 rounded mb-2 min-h-20 text-sm text-gray-900 resize-none"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={isLoading}
          />
          
          {error && (
            <div className="mb-2 p-2 bg-gray-400 text-black text-xs rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-2 p-2 bg-gray-200 text-black text-xs rounded flex items-center gap-2">
              <span>✓ Note created! Redirecting...</span>
            </div>
          )}
          
          <button
            onClick={saveNote}
            disabled={isLoading}
            className="w-full px-4 py-2 text-black text-sm rounded hover:bg-gray-200 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-600"
          >
            {isLoading ? "Saving..." : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
};