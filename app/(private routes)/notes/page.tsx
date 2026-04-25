import { fetchNotes } from "@/lib/api/serverApi";

export default async function NotesPage() {
 const data = await fetchNotes("", 1);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {data.notes?.map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
    </div>
  );
}