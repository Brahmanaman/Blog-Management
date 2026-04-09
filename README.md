# Blog Management

A React + Vite blog management application with authentication, dashboard controls, blog creation/editing, and dark mode support.

## Key Features

- User authentication and role-based dashboard access
- Create, edit, publish, unpublish, and delete blog posts
- Blog preview and detail pages
- Tag management for posts
- Dark mode toggle with Tailwind CSS support
- Local storage persistence for posts, users, and theme preference

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router
- React Markdown
- React Hook Form
- `uniqid` for unique IDs

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app in your browser at the address shown by Vite (usually `http://localhost:5173`).

## Project Structure

- `src/App.jsx` — root application
- `src/main.jsx` — renders the app and context provider
- `src/routes/BlogRoute.jsx` — application routes
- `src/context/BlogContext.jsx` — shared state and local storage persistence
- `src/components/` — reusable UI components
- `src/pages/` — page-level views like `Home`, `Dashboard`, `Create`, and `Edit`
- `src/utils/localstorage.js` — helpers for storing data in `localStorage`
- `src/index.css` — Tailwind and global styles

## Notes

- The app stores blog data in browser local storage, so refreshing or closing the browser keeps the current posts and user session.
- Dark mode is toggled in the navbar and stored across sessions.
- The edit page loads existing post data for updates and saves changes back to local storage.

## Useful Commands

- `npm run dev` — start development server
- `npm run build` — build production files
- `npm run preview` — preview production build

## Customization

You can extend the app by adding:

- real backend API integration
- authentication with tokens
- server persistence instead of local storage
- a richer editor for blog content
- validation for forms and tags
