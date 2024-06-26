import { join } from "$std/path/mod.ts";
import { assertEquals } from "$std/assert/assert_equals.ts";

export interface NoteT {
  content: string;
  modifiedAt: Date;
  publishedAt: Date;
  title: string;
}

const sortByDate = (
  notes: NoteT[],
  mode: "published_at" | "modified_at",
): NoteT[] => {
  if (mode === "published_at") {
    return notes.sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
    );
  } else {
    return notes.sort(
      (a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime(),
    );
  }
};

const getMarkdownTitle = (content: string): string => {
  const match = content.match(/^#\s+(.*)/);
  if (match) {
    return match[1];
  }
  return "";
};

async function getNote(fileName: string): Promise<NoteT | null> {
  const text = await Deno.readTextFile(join("./notes", fileName));
  const stat = await Deno.stat(join("./notes", fileName));
  const modifiedAt = stat.mtime || new Date();
  // TODO: Check why birthtime is the same as mtime
  const publishedAt = stat.birthtime || new Date();
  const title = getMarkdownTitle(text);

  if (!text) {
    return null;
  }

  return {
    content: text,
    modifiedAt: modifiedAt,
    publishedAt: publishedAt,
    title: title,
  };
}

export async function getNotes(): Promise<NoteT[]> {
  const files = Deno.readDir("./notes");
  const promises = [];
  for await (const file of files) {
    if (file.name.endsWith(".md")) {
      promises.push(getNote(file.name));
    }
  }

  const notes = (await Promise.all(promises)) as NoteT[];
  const cleanNotes = notes.filter((note) => note !== null);
  const sortedNotes = sortByDate(cleanNotes, "published_at");

  return sortedNotes;
}

Deno.test("get markdown title", () => {
  const content = "# Title";
  assertEquals(getMarkdownTitle(content), "Title");
});

Deno.test("sort by date", () => {
  const notes = [
    {
      content: "",
      modifiedAt: new Date("2021-01-01"),
      publishedAt: new Date("2021-01-01"),
      title: "",
    },
    {
      content: "",
      modifiedAt: new Date("2021-01-02"),
      publishedAt: new Date("2021-01-02"),
      title: "",
    },
  ];
  const sortedNotes = sortByDate(notes, "published_at");
  assertEquals(sortedNotes[0].publishedAt, new Date("2021-01-02"));
  assertEquals(sortedNotes[1].publishedAt, new Date("2021-01-01"));
});
