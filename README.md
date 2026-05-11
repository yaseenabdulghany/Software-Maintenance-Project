# EduManage – Student Management System

A single-page React application for managing students. Browse a dashboard of metrics, search and filter the student roster, and add, edit, or delete records — all with a polished light/dark UI built on Tailwind CSS.

## Features

- Dashboard with live counts: total students, active, inactive, and unique grades
- Full CRUD: add, view, edit, and delete students
- Real-time name search and grade filter on the students list
- Sort by name, age, or grade (ascending or descending)
- Export the full roster to a downloadable JSON file
- Loading skeletons on first render of the students list
- Form validation with inline error messages and a disabled-while-invalid submit
- Confirmation dialog (with ESC-to-cancel) before destructive deletes
- Light / dark theme toggle that respects the OS preference and persists across reloads
- LocalStorage-backed persistence — your data survives page refreshes
- Fully responsive layout (mobile, tablet, desktop) with a hamburger menu on small screens
- 404 page for unknown routes
- Keyboard-friendly with visible focus rings on every interactive element

## Tech Stack

- React 19 (functional components + hooks)
- Vite (dev server and bundler)
- React Router DOM v6 (client-side routing)
- Tailwind CSS v3 (utility-first styling, custom "Indigo Pro" theme, `darkMode: 'class'`)
- Context API (global state for theme + students)
- LocalStorage (persistence)

## Screenshots

- Light mode: `./docs/screenshot-light.png` *(placeholder)*
- Dark mode: `./docs/screenshot-dark.png` *(placeholder)*

## Setup

```bash
git clone <repo>
cd student-management
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

To produce a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── ThemeToggle.jsx
│   ├── SearchBar.jsx
│   ├── DashboardCard.jsx
│   ├── StudentCard.jsx
│   ├── StudentForm.jsx
│   └── ConfirmDialog.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Students.jsx
│   ├── AddStudent.jsx
│   ├── StudentDetails.jsx
│   ├── EditStudent.jsx
│   └── NotFound.jsx
├── context/
│   ├── ThemeContext.jsx
│   └── StudentContext.jsx
├── data/
│   └── students.json
├── hooks/
│   └── useLocalStorage.js
├── App.jsx
├── main.jsx
└── index.css
```

## Color Palette — Indigo Pro

| Token              | Light     | Dark      |
|--------------------|-----------|-----------|
| `bg`               | `#FFFFFF` | `#0F172A` |
| `surface`          | `#F1F5F9` | `#1E293B` |
| `surface.hover`    | `#E2E8F0` | `#334155` |
| `primary`          | `#4F46E5` | `#6366F1` |
| `primary.hover`    | `#4338CA` | `#818CF8` |
| `accent`           | `#818CF8` | `#A5B4FC` |
| `content`          | `#0F172A` | `#F1F5F9` |
| `content.muted`    | `#64748B` | `#94A3B8` |
| `edge` (borders)   | `#E2E8F0` | `#334155` |

The palette lives in [`tailwind.config.js`](./tailwind.config.js) and reusable component classes (`btn-primary`, `card`, `input-field`, etc.) are defined under `@layer components` in [`src/index.css`](./src/index.css).

## Future Improvements

- Smooth fade-in animations on route transitions
- Optional notes field on each student
- Bulk actions (multi-select delete)
- Pagination or virtualization for very large rosters
- Import from a JSON file (the inverse of Export)
