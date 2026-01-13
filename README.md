# Blogpost — Minimal Next.js App
# live link- https://myblogpost-4h39.onrender.com
This repository is a small demo blog built with the Next.js App Router. It provides a minimal UI for creating, listing, viewing, editing and deleting posts.

Key ideas
- App Router-based project (files under `app/`).
- Posts are stored in the browser `localStorage` (client-side) for this demo — no database required.
- Routes provided: home (`/`), create post (`/post/new`), post detail (`/post/[id]`), edit (`/post/[id]/edit`).

What you get
- A homepage that lists posts stored in the browser.
- A create-post page (client) that saves new posts to `localStorage`.
- A post detail page that shows the full post and links to edit/delete.
- An edit page that loads a post from `localStorage`, lets you update it, and saves back to `localStorage`.
- Client-side delete that removes the post from `localStorage` and returns to the homepage.

Project layout (important files)
- `app/page.tsx` — homepage (renders a client posts list component).
- `app/post/new/page.tsx` — create-post form (client component).
- `app/post/[...slug]/page.tsx` or `app/post/[id]/page.tsx` — post detail (may be server or client depending on edits).
- `app/post/[id]/edit/page.tsx` — edit page (client component that updates localStorage).
- `components/PostForm.tsx` — reusable form used for create/edit.
- `components/PostsClient.tsx` — client list that reads posts from localStorage.
- `components/PostCard.tsx` — UI for a single post preview.
- `data/posts.ts` — lightweight server helpers (types and server helpers). Note: in this demo they are not the authoritative storage for client-created posts.

How to run
1. Install dependencies (this project uses `pnpm` in examples):

```bash
pnpm install
```

2. Start the development server:

```bash
pnpm dev
# or
npm run dev
```

3. Open http://localhost:3000 in your browser.

Usage notes
- Create a post: Click the "Create Post" button in the nav, fill the form and submit. The post is saved to localStorage and the app redirects to the homepage.
- Edit a post: From a post detail or the list, click Edit — you are taken to an edit form that loads the post from localStorage and saves updates back to localStorage.
- Delete a post: Use the Delete button on the post detail or in the list. The client delete removes the post from localStorage and refreshes the UI.


