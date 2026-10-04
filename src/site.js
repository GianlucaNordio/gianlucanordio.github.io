import { getCollection } from 'astro:content';

// Site-wide text, used by the layout, the RSS feed and the meta tags.
export const SITE = {
  title: 'Gianluca Nordio',
  description: 'Notes on robotics, personal projects, books and endurance sport.',
};

// All notes, newest first. Drafts are included only in `npm run dev`.
export async function getNotes() {
  const notes = await getCollection('notes', ({ data }) => import.meta.env.DEV || !data.draft);
  return notes.sort((a, b) => b.data.date - a.data.date);
}

// All projects, newest first. Drafts are included only in `npm run dev`.
export async function getProjects() {
  const projects = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
  return projects.sort((a, b) => b.data.year - a.data.year || a.data.title.localeCompare(b.data.title));
}

// 2026-10-03. Dates in frontmatter are read as UTC, so format them as UTC.
export function formatDate(date) {
  return date.toISOString().slice(0, 10);
}
