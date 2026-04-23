# Task Management Dashboard

A minimal, polished task management app built with React 19, Vite, and Tailwind CSS v4.

**Live demo → [https://task-management-dashboard-rho-gold.vercel.app/](https://task-management-dashboard-rho-gold.vercel.app/)**

---

## Tech stack

| Layer      | Choice                                         |
| ---------- | ---------------------------------------------- |
| Framework  | React 19                                       |
| Build tool | Vite 8                                         |
| Language   | TypeScript 6                                   |
| Styling    | Tailwind CSS v4                                |
| Compiler   | React Compiler (`babel-plugin-react-compiler`) |
| Font       | Inter Variable (`@fontsource-variable/inter`)  |
| Deployment | Vercel                                         |

---

## Getting started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Install and run

```bash
# Clone the repo
git clone <repo-url>
cd dashboard

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other scripts

```bash
npm run build      # Type-check and build for production (output: dist/)
npm run preview    # Serve the production build locally
npm run lint       # Run ESLint
```

---

## Design decisions

### React over Next.js

This project is a purely client-side, single-page app. All data lives in `localStorage` — there is no backend, no API routes, no server-rendered pages, and no SEO requirement. Next.js is built around server-side rendering, file-system routing, and server components, none of which add value here. Reaching for it would introduce unnecessary complexity (server/client component boundaries, a Node.js runtime in production, a heavier build pipeline) for a task that plain React handles perfectly. Using React directly via Vite keeps the stack minimal and every part of it purposeful.

### Vite as the build tool

Vite was chosen because it starts the dev server almost instantly regardless of project size — it serves source files as native ES modules and only transforms what the browser actually requests. HMR updates apply in milliseconds since only the changed module is reprocessed, not the entire bundle. For production, Vite uses Rollup under the hood to produce optimised, tree-shaken output. Compared to older bundler-first tools (e.g. webpack-based CRA), this means faster feedback during development and a leaner build pipeline with minimal configuration.

### React Compiler

The project was bootstrapped with the React Compiler option enabled (`babel-plugin-react-compiler` via `@rolldown/plugin-babel`). The compiler statically analyses every component and hook at build time and inserts memoization automatically — equivalent to hand-written `useMemo` / `useCallback`, but without the maintenance burden.

As a result, **no manual `useMemo` or `useCallback` calls are used in this codebase**. Functions are written as plain `const` expressions and the compiler handles stability.

### Tailwind CSS v4

Tailwind was chosen to keep styling co-located with markup — no separate CSS files to maintain, no naming conventions to invent, and no dead styles to prune. Every style is expressed as a utility class directly on the element, making it easy to read what an element looks like without jumping between files. Tailwind v4 introduces a native CSS `@theme` block, which is how this project maps design tokens straight into Tailwind utilities without a `tailwind.config.js` file at all.

### TypeScript

The entire codebase is written in TypeScript. Strong typing on task data, filter state, component props, and storage helpers catches mistakes at compile time rather than at runtime in the browser. It also makes refactoring safer — renaming a field or changing a prop signature produces errors everywhere it needs to be updated, rather than silent bugs.

### CSS custom property tokens

All colours live in `src/theme/tokens.css` as `--ds-*` custom properties on `:root` and `.dark`. Tailwind's `@theme` block in `index.css` maps each token to a Tailwind colour utility (e.g. `--color-brand: var(--ds-brand)`).

This means:

- The entire colour palette swaps between light and dark by toggling a single `.dark` class on `<html>`.
- Tailwind utilities (`bg-brand`, `text-fg-muted`, etc.) read live CSS variables at runtime — no purge-time duplication.
- To change or extend the palette, edit only `tokens.css`; Tailwind picks up the change automatically.

### Animations

All animations are built with pure CSS keyframes — no external animation library is used.

---

## Deployment

The app is deployed on Vercel. Any push to `main` triggers an automatic production deployment.

```bash
npm run build   # produces dist/
```

The `dist/` folder is a fully static site — no server required.

---

## Features

- Create, edit, and delete tasks with title, description, priority, and due date with both light and dark mode
  <img width="1723" height="949" alt="Screenshot 2026-04-23 at 8 24 53 AM" src="https://github.com/user-attachments/assets/ec1199fd-9c5b-452f-bcfd-3aaac5da8eca" />

  <img width="1728" height="950" alt="Screenshot 2026-04-23 at 8 25 20 AM" src="https://github.com/user-attachments/assets/f887b0ba-2eea-4c7d-adf1-e96d57839b29" />

- Mark tasks as completed / pending
  <img width="1723" height="916" alt="Screenshot 2026-04-23 at 8 28 18 AM" src="https://github.com/user-attachments/assets/d1320431-574e-4e7d-adf8-b32c78abcd26" />

- Filter by search text, status (All / Pending / Completed), and priority
  <img width="1728" height="919" alt="Screenshot 2026-04-23 at 8 30 08 AM" src="https://github.com/user-attachments/assets/09e62319-d87c-4ff6-92d1-854cfc5e2f2c" />

- List view and card grid view (card view available on wider screens)
  <img width="1728" height="898" alt="Screenshot 2026-04-23 at 8 30 36 AM" src="https://github.com/user-attachments/assets/469a4eea-3459-42bb-bf8c-c1b259917520" />

- Light and dark mode with a toggle — preference persisted to `localStorage`
- Tasks persisted to `localStorage`; tabs stay in sync via the `storage` event
- Toast notifications for create, edit, delete, and status-change actions
  <img width="1726" height="961" alt="Screenshot 2026-04-23 at 8 32 28 AM" src="https://github.com/user-attachments/assets/657e1d6a-58e7-4367-9888-3e971c718463" />
  <img width="1728" height="915" alt="Screenshot 2026-04-23 at 8 33 04 AM" src="https://github.com/user-attachments/assets/82048e5f-3ee3-43f7-9c2c-e48cc668835c" />

- Fully keyboard-accessible modals and filter panel (Escape to close, focus trap)
- Entrance animations on task cards and list rows; respects `prefers-reduced-motion`
- Mobile Screensorts:
  <img width="382" height="821" alt="Screenshot 2026-04-23 at 8 31 42 AM" src="https://github.com/user-attachments/assets/3d4f8b2c-8ad7-4f09-983d-733a1d04724b" />
<img width="380" height="818" alt="Screenshot 2026-04-23 at 8 31 31 AM" src="https://github.com/user-attachments/assets/0b2bd138-fed0-4112-8258-06259310a42e" />


---

## Project structure

```
src/
├── components/
│   ├── common/          # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Checkbox.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── Field.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   ├── Modal.tsx
│   │   ├── Select.tsx
│   │   ├── TextArea.tsx
│   │   ├── ToastProvider.tsx
│   │   └── styles.ts        # Shared control class strings
│   └── tasks/           # Feature components
│       ├── TaskCardView.tsx
│       ├── TaskCreateForm.tsx
│       ├── TaskCreateModal.tsx
│       ├── TaskEditModal.tsx
│       ├── TaskEmptyState.tsx
│       ├── TaskFilters.tsx
│       ├── TaskItem.tsx
│       ├── TaskListView.tsx
│       ├── TaskStatusChips.tsx
│       └── TaskViewToggle.tsx
├── hooks/
│   ├── useMinWidthSm.ts     # Responsive breakpoint listener
│   ├── useTaskViewMode.ts   # Persisted list/card view preference
│   └── useTasks.ts          # CRUD + localStorage sync
├── icons/                   # Hand-rolled SVG icon components
├── lib/
│   ├── filterTasks.ts       # Pure filter/sort logic
│   ├── taskCounts.ts        # Pending / completed counts
│   ├── taskDisplay.ts       # Badge classes, due-date formatting
│   └── taskStorage.ts       # localStorage read/write helpers
├── theme/
│   ├── ThemeProvider.tsx    # Applies .dark class to <html>
│   └── tokens.css           # All CSS custom properties (:root + .dark)
├── types/
│   └── task.ts              # Task, NewTaskFields, priority constants
├── App.tsx                  # Root layout and state
├── index.css                # Tailwind @theme mapping + global animations
└── main.tsx
```
