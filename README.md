# Zettelin

Zettelin is a simple web application that renders all the Markdown files in a
specified directory.   
It provides an easy way to view and manage your notes
directly from the web browser.

I point it to my notes directory with a symlink.

```bash
git clone https://github.com/marcelarie/zettelin
cd zeppelin
ln -s ~/your-notes/ notes
deno task start
```

Still in really early development.

## Todo

- [x] Show notes in the landing page
- [x] Markdown code block syntax highlighting
- [ ] Better CSS
- [ ] Allow to manage the notes from the frontend
  - [ ] Check https://docs.deno.com/runtime/manual/basics/permissions
  - [ ] Open editor with deno
  - [ ] Save changes
  - [ ] Create new note
- [ ] Search
- [ ] Tags
