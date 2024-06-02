import hljs from "npm:highlight.js@11.9.0";
import { render } from "@deno/gfm";
import { assertEquals } from "$std/assert/assert_equals.ts";

export const extractCodeBlocks = (html: string) => {
  const codeBlocks = html.match(/<pre><code>[\s\S]*?<\/code><\/pre>/g) || [];
  return codeBlocks
    .map((codeBlock) => {
      const code = codeBlock.match(/<code>([\s\S]*?)<\/code>/)![1];
      return code;
    })
    .filter(Boolean);
};

export const cleanHtmlSigns = (html: string) => {
  return html
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
};

export const htmlWithSyntax = (markdown: string) => {
  let html = render(markdown);
  const codeBlocks = extractCodeBlocks(html);
  const hasCodeBlocks = codeBlocks.length > 0;

  if (hasCodeBlocks) {
    codeBlocks.forEach((codeBlock) => {
      const cleanedCodeBlock = cleanHtmlSigns(codeBlock);
      const highlightResult = hljs.highlightAuto(cleanedCodeBlock);
      const highlightedCode = highlightResult.value.trim();
      const language = highlightResult.language;

      html = html.replace(
        codeBlock,
        `<pre><code class="language-${language}">${highlightedCode}</code></pre>`,
      );
    });
  }
  return html;
};

Deno.test("extract code blocks", () => {
  const html = `
    <pre><code>const a = 1;</code></pre>
    <pre><code>const b = 2;</code></pre>
  `;
  assertEquals(extractCodeBlocks(html), ["const a = 1;", "const b = 2;"]);
});

Deno.test("clean html signs", () => {
  const html = "&lt;div&gt;&lt;/div&gt;";
  assertEquals(cleanHtmlSigns(html), "<div></div>");
});

Deno.test("html with syntax", () => {
  const markdown = `
    \`\`\`typescript
    const a = 1;
    \`\`\`
  `;
  const html = htmlWithSyntax(markdown);
  assertEquals(html.includes("hljs-string"), true);
});
