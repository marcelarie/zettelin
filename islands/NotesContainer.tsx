import { Note } from "../utils/notes.ts";

type Props = {
  notes: Note[];
};

export default function NotesContainer({ notes }: Props) {
  return (
    <div class="bg-gray-900 p-6">
      {notes.map((note: Note) => (
        <div class="bg-gray-800 p-4 mb-4">
          <h2 class="text-2xl font-bold">{note.title}</h2>
          <body>{note.content}</body>
          <p class="text-gray-400">This is a note</p>
        </div>
      ))}
    </div>
  );
}
