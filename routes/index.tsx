import { CSS } from "@deno/gfm";
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import NotesContainer from "../islands/NotesContainer.tsx";
import { getNotes, NoteT } from "../utils/notes.ts";
import { State } from "../utils/state.ts";
import NotesNotFound from "../components/NotesNotFound.tsx";

export interface Data extends State {
  notes: NoteT[];
}

export const handler: Handlers<Data, State> = {
  async GET(_req, ctx) {
    const notes = await getNotes();
    return ctx.render({ ...ctx.state, notes });
  },
};

export default function Home(props: PageProps<Data>) {
  const { notes } = props.data;

  if (notes.length === 0) {
    return <NotesNotFound />;
  }

  return (
    <>
      <Head>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <div class="text-white bg-black flex items-center justify-center">
        <NotesContainer notes={notes} />
      </div>
    </>
  );
}
