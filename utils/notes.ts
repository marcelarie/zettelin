import { extract } from "https://deno.land/std@0.145.0/encoding/front_matter.ts";
import { join } from "$std/path/mod.ts";

export interface Note {
  slug: string;
  title: string;
  published_at: Date;
  content: string;
  snippet: string;
}

async function getNote(slug: string): Promise<Note | null> {
  const text = await Deno.readTextFile(join("./notes", `${slug}.md`));
  const { attrs, body } = extract<Note>(text);

  return {
    slug,
    title: attrs.title,
    published_at: new Date(attrs.published_at),
    content: body,
    snippet: attrs.snippet,
  };
}

export async function getNotes(): Promise<Note[]> {
  const files = Deno.readDir("./notes");
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getNote(slug));
  }
  const notes = (await Promise.all(promises)) as Note[];
  notes.sort((a, b) => b.published_at.getTime() - a.published_at.getTime());
  return notes;
}
