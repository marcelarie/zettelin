import { render } from "@deno/gfm";
import hljs from "npm:highlight.js@11.9.0";
import { NoteT } from "../utils/notes.ts";

type Props = {
  note: NoteT;
};

const padWithZeros = (n: number) => String(n).padStart(2, "0");

function formatDate(date: Date) {
  const day = padWithZeros(date.getDate());
  const month = padWithZeros(date.getMonth() + 1); // Months are zero-indexed
  const year = date.getFullYear();
  const hours = padWithZeros(date.getHours());
  const minutes = padWithZeros(date.getMinutes());

  return `${day}/${month}/${year} - ${hours}:${minutes}`;
}

const extractCodeBlocks = (html: string) => {
  const codeBlocks = html.match(/<pre><code>[\s\S]*?<\/code><\/pre>/g) || [];
  return codeBlocks
    .map((codeBlock) => {
      const code = codeBlock.match(/<code>([\s\S]*?)<\/code>/)![1];
      return code;
    })
    .filter(Boolean);
};

const cleanHtmlSigns = (html: string) => {
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
};

const htmlWithSyntax = (markdown: string) => {
  let html = render(markdown);
  const codeBlocks = extractCodeBlocks(html);
  const hasCodeBlocks = codeBlocks.length > 0;

  if (hasCodeBlocks) {
    codeBlocks.forEach((codeBlock) => {
      const cleanedCodeBlock = cleanHtmlSigns(codeBlock);
      const highlightResult = hljs.highlightAuto(cleanedCodeBlock);
      const highlightedCode = highlightResult.value.trim();
      const language = highlightResult.language;

      console.log(highlightedCode);

      html = html.replace(
        codeBlock,
        `<pre><code class="language-${language}">${highlightedCode}</code></pre>`,
      );
    });
  }
  return html;
};

export default function Note({ note }: Props) {
  const syntaxHighlightedHtml = htmlWithSyntax(note.content);

  return (
    <>
      <div class="bg-gray-800 p-4 mb-4 rounded-lg shadow-lg">
        <div
          class="markdown-body bg-gray-800 text-white text-lg font-sans p-4 rounded shadow-lg overflow-x-auto"
          data-color-mode="dark"
          data-dark-theme="dark"
          dangerouslySetInnerHTML={{ __html: syntaxHighlightedHtml }}
        />
        <div class="flex justify-right items-center mt-4">
          <div class="flex justify-left items-center mr-4">
            <p class="mr-1">Created at:</p>
            <p class="text-gray-400">{formatDate(note.publishedAt)}</p>
          </div>
          <div class="flex justify-left items-center">
            <p class="mr-1">Modified at:</p>
            <p class="text-gray-400">{formatDate(note.modifiedAt)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
