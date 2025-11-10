import { Note } from "@/lib/notes-api";
import { Kartu } from "@/components/kartu";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

type HeroProps = {
  notes: Note[];
  isLoading: boolean;
  onRefresh?: () => void;
  onNavigateToCreate?: () => void;
};

export function Hero({ notes, isLoading, onRefresh, onNavigateToCreate }: HeroProps) {
  // Jika tidak ada notes, tampilkan welcome screen
  if (!isLoading && notes.length === 0) {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <div className="text-center">
          <p className="text-4xl font-bold mb-10">
            get started, <span className="font-normal">note app</span>
          </p>
           <InteractiveHoverButton onClick={onNavigateToCreate} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">My Notes</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {notes.length} {notes.length === 1 ? 'note' : 'notes'} available
          </p>
        </div>
        
        {/* Refresh button */}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Refresh"}
          </button>
        )}
      </div>

      {isLoading && notes.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading notes...</p>
          </div>
        </div>
      )}

      {!isLoading && notes.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {notes.map((note) => (
            <Kartu
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              color="bg-yellow-300"
              createdAt={note.createdAt}
              isArchived={false}
              onActionComplete={onRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}