const BASE_URL = "https://notes-api.dicoding.dev/v2";

export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  archived: boolean;
};

export type ApiResponse<T> = {
  status: string;
  message: string;
  data: T;
};

// Create Note
export async function createNote(title: string, body: string): Promise<Note> {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });
  
  const result: ApiResponse<Note> = await response.json();
  if (result.status !== "success") {
    throw new Error(result.message);
  }
  return result.data;
}

// Get Notes (non-archived)
export async function getNotes(): Promise<Note[]> {
  const response = await fetch(`${BASE_URL}/notes`);
  const result: ApiResponse<Note[]> = await response.json();
  if (result.status !== "success") {
    throw new Error(result.message);
  }
  return result.data;
}

// Get Archived Notes
export async function getArchivedNotes(): Promise<Note[]> {
  const response = await fetch(`${BASE_URL}/notes/archived`);
  const result: ApiResponse<Note[]> = await response.json();
  if (result.status !== "success") {
    throw new Error(result.message);
  }
  return result.data;
}

// Get Single Note
export async function getNote(id: string): Promise<Note> {
  const response = await fetch(`${BASE_URL}/notes/${id}`);
  const result: ApiResponse<Note> = await response.json();
  if (result.status !== "success") {
    throw new Error(result.message);
  }
  return result.data;
}

// Archive Note
export async function archiveNote(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });
  const result: ApiResponse<null> = await response.json();
  if (result.status !== "success") {
    throw new Error(result.message);
  }
}

// Unarchive Note
export async function unarchiveNote(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });
  const result: ApiResponse<null> = await response.json();
  if (result.status !== "success") {
    throw new Error(result.message);
  }
}

// Delete Note
export async function deleteNote(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
  const result: ApiResponse<null> = await response.json();
  if (result.status !== "success") {
    throw new Error(result.message);
  }
}