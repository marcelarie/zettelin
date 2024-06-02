import { NoteT } from "../utils/notes.ts";
import CopyButton from "../islands/CopyButton.tsx";
import { htmlWithSyntax } from "../utils/markdown.ts";
import { formatDate } from "../utils/date.ts";

type Props = {
  note: NoteT;
};

export default function Note({ note }: Props) {
  const syntaxHighlightedHtml = htmlWithSyntax(note.content);
  // const codeWithNoBackticks = note.content.replace(/```/g, "");

  return (
    <>
      <div class="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
        <div
          class="markdown-body bg-gray-800 text-white text-lg font-sans p-4 rounded shadow-lg overflow-x-auto"
          data-color-mode="dark"
          data-dark-theme="dark"
          dangerouslySetInnerHTML={{ __html: syntaxHighlightedHtml }}
        />
        <div class="flex justify-between items-center mt-4">
          <div>
            <CopyButton buttonText="Copy note" textToCopy={note.content} />
          </div>
          <div class="flex justify-between items-center">
            <div class="flex justify-center items-center mr-4">
              <p class="mr-1">Created at:</p>
              <p class="text-gray-400">{formatDate(note.publishedAt)}</p>
            </div>
            <div class="flex justify-right items-center">
              <p class="mr-1">Modified at:</p>
              <p class="text-gray-400">{formatDate(note.modifiedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
