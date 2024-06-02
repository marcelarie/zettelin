# zettelin

The Zettelin is a simple note visualizer that renders all the Mardkown files in 
the specified directory.

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
- [ ] Markdown code block syntax highlighting
- [ ] Better CSS
- [ ] Allow to manage the notes from the frontend 
    - [ ] Check https://docs.deno.com/runtime/manual/basics/permissions
    - [ ] Open editor with deno
    - [ ] Save changes
    - [ ] Create new note
- [ ] Search
- [ ] Tags
