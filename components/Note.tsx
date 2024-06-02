import { render } from "@deno/gfm";
import { NoteT } from "../utils/notes.ts";

type Props = {
  note: NoteT;
};

export default function Note({ note }: Props) {
  return (
    <div class="bg-gray-800 p-4 mb-4">
      <div
        class="markdown-body bg-gray-800 text-white text-lg font-sans p-4 rounded-lg shadow-lg overflow-x-auto"
        data-color-mode="dark"
        data-dark-theme="dark"
        dangerouslySetInnerHTML={{ __html: render(note.content) }}
      />
    </div>
  );
}
