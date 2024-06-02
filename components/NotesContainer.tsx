import { NoteT } from "../utils/notes.ts";
import Note from "../components/Note.tsx";

type Props = {
  notes: NoteT[];
};

export default function NotesContainer({ notes }: Props) {
  return (
    <div class="bg-gray-900 p-6">
      {notes.map((note: NoteT) => <Note note={note} />)}
    </div>
  );
}
