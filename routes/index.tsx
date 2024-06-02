import { CSS } from "@deno/gfm";
import { css } from "@twind/core";
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";
import NotesContainer from "../components/NotesContainer.tsx";
import { getNotes, NoteT } from "../utils/notes.ts";
import { State } from "../utils/state.ts";
import NotesNotFound from "../components/NotesNotFound.tsx";

export interface Data extends State {
  notes: NoteT[];
}

// TODO: Check why this part does not work using twind css
const CustomCSS = CSS.concat(
  `.markdown-body .highlight pre, .markdown-body pre  {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    padding-bottom: 0.3rem;
  }`,
);

const twindCSS = css({
  ".markdown-body": {
    paddingLeft: "3rem",
    paddingRight: "3rem",
  },
  ".markdown-body code": {
    whiteSpace: "pre",
  },
  ".markdown-body > pre:hover": {
    border: "1px solid #3498db",
  },
  ".markdown-body > pre": {
    border: "1px solid #333",
  },
});

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
        <style dangerouslySetInnerHTML={{ __html: CustomCSS }} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/dark.min.css"
        />
      </Head>
      <div class={`${twindCSS} bg-gray-900 min-h-screen`}>
        <div class="text-white bg-black flex items-center justify-center max-w-lg mx-auto">
          <NotesContainer notes={notes} />
        </div>
      </div>
    </>
  );
}
