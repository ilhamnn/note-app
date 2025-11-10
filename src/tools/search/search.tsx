import { Note } from "@/lib/notes-api";
import { Kartu } from "@/components/kartu";

type SearchTabProps = {
  query: string;
  notes: Note[];
};

export const SearchTab = ({ query, notes }: SearchTabProps) => {
  // Filter notes berdasarkan query
  const filteredNotes = notes.filter((note) => {
    const searchQuery = query.toLowerCase().trim();
    const titleMatch = note.title.toLowerCase().includes(searchQuery);
    const bodyMatch = note.body.toLowerCase().includes(searchQuery);
    return titleMatch || bodyMatch;
  });

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Search Results</h2>
        {query ? (
          <p className="text-muted-foreground">
            Searching for: <span className="font-semibold">"{query}"</span>
            <span className="ml-2">
              ({filteredNotes.length} {filteredNotes.length === 1 ? 'result' : 'results'} found)
            </span>
          </p>
        ) : (
          <p className="text-muted-foreground">
            Use the search box in the sidebar to find notes
          </p>
        )}
      </div>

      {/* Display filtered notes */}
      {query && filteredNotes.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {filteredNotes.map((note) => (
            <Kartu
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              color="bg-yellow-300" // Default color karena API ga return color
              createdAt={note.createdAt}
            />
          ))}
        </div>
      )}

      {/* No results message */}
      {query && filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No notes found matching "{query}"
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Try different keywords or check your spelling
          </p>
        </div>
      )}
    </div>
  );
};