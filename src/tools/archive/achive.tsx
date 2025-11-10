import { Note } from "@/lib/notes-api";
import { Kartu } from "@/components/kartu";

type ArchiveTabProps = {
  archivedNotes: Note[];
  onRefresh: () => void;
};

export const ArchiveTab = ({ archivedNotes, onRefresh }: ArchiveTabProps) => {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Archived Notes</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {archivedNotes.length} {archivedNotes.length === 1 ? 'note' : 'notes'} archived
          </p>
        </div>
        
        {/* Refresh button */}
        {archivedNotes.length > 0 && (
          <button
            onClick={onRefresh}
            className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Refresh
          </button>
        )}
      </div>

      {/* Display archived notes */}
      {archivedNotes.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {archivedNotes.map((note) => (
            <Kartu
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              color="bg-gray-300" // Warna berbeda untuk archived notes
              createdAt={note.createdAt}
              isArchived={true}
              onActionComplete={onRefresh}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No archived notes yet</p>
          <p className="text-muted-foreground text-sm mt-2">
            Archive notes to move them here
          </p>
        </div>
      )}
    </div>
  );
};