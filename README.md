# React Todo App

A clean, minimal todo app built with React and Tailwind CSS. Started as a basic CRUD exercise and ended up being a pretty good lesson in UI design fundamentals.

## What it does

- Add, edit, and delete tasks
- Mark tasks complete (or undo that)
- Filter by All / Pending / Completed
- Persists to `localStorage` so your list survives a page refresh
- Press `Enter` to add a task without touching the mouse

## Stack

- React (functional components + hooks)
- Tailwind CSS
- `react-icons` for the action buttons

## Getting started

```bash
git clone https://github.com/DrashtiPatel-06/ToDoApp.git
cd ToDoApp
npm install
npm run dev
```

Needs Node 18+. That's it, no backend, no database.

## Project structure

```
src/
└── pages/
    └── ToDoPage.jsx   # everything lives here for now
```

It's intentionally one file. The logic is simple enough that splitting it felt like over-engineering.

## Design decisions worth noting

**Buttons are gray by default.** Color only appears on hover, Green for complete, red for delete, indigo for edit. The idea is that color should signal something, not just fill space.

**Edit is disabled on completed tasks.** If a task is done, there's nothing to edit. The pencil icon grays out instead of doing nothing when clicked.

**Empty states are context-aware.** "No pending tasks, You're all caught up!" is different from "Add a task above to get started." Small thing, but it makes the app feel less generic.

**Status is a badge, not plain text.** "Completed" and "Incomplete" as raw strings in a table column are hard to scan. A green/amber pill is readable at a glance.

## Known limitations

- No drag-to-reorder
- No due dates or priorities
- Single list only (no projects/categories)
- `localStorage` means data doesn't sync across devices or browsers

These are all solvable. Just out of scope for what this was meant to be.
