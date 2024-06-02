import { render } from "@deno/gfm";
import { NoteT } from "../utils/notes.ts";

type Props = {
  note: NoteT;
};

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

export default function Note({ note }: Props) {
  return (
    <>
      <style>
        {`.markdown-body { padding-left: 3rem; padding-right: 3rem; }`}
      </style>
      <div class="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
        <div class="flex justify-left items-center mb-4">
          <div class="flex justify-left items-center mr-4">
            <p class="mr-1">Created at:</p>
            <p class="text-gray-400">{formatDate(note.publishedAt)}</p>
          </div>
          <div class="flex justify-left items-center">
            <p class="mr-1">Modified at:</p>
            <p class="text-gray-400">{formatDate(note.modifiedAt)}</p>
          </div>
        </div>

        <div
          class="markdown-body bg-gray-800 text-white text-lg font-sans p-4 rounded-lg shadow-lg overflow-x-auto"
          data-color-mode="dark"
          data-dark-theme="dark"
          dangerouslySetInnerHTML={{ __html: render(note.content) }}
        />
      </div>
    </>
  );
}
