import { getCollection } from 'astro:content';

// Site-wide text, used by the layout, the RSS feed and the meta tags.
export const SITE = {
  title: 'Gianluca Nordio',
  description: 'Gianluca Nordio, robotics software engineer: projects, CV and contact.',
};

// All projects, newest first. Drafts are included only in `npm run dev`.
export async function getProjects() {
  const projects = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
  return projects.sort((a, b) => b.data.year - a.data.year || a.data.title.localeCompare(b.data.title));
}
