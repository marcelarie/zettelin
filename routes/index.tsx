import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import NotesContainer from "../islands/NotesContainer.tsx";
import { getNotes, Note } from "../utils/notes.ts";
import { State } from "../utils/state.ts";

export interface Data extends State {
  notes: Note[];
}

export const handler: Handlers<Data, State> = {
  async GET(_req, ctx) {
    const notes = await getNotes();
    return ctx.render({ ...ctx.state, notes });
  },
};

export default function Home(props: PageProps<Data>) {
  const { notes } = props.data;

  return (
    <div class="h-screen text-white bg-black flex items-center justify-center">
      <NotesContainer notes={notes} />
    </div>
  );
}
