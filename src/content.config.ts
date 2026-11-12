import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every Markdown file in src/content/notes/ is a note. The file name becomes
// the URL: my-note.md -> /notes/my-note/. The build fails with a clear error
// if a note's frontmatter does not match this schema.
const notes = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'it']).default('en'),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Every Markdown file in src/content/projects/ is an entry on /projects/.
// The text below the frontmatter is shown there; `description` is the one
// line used on the home page.
const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    year: z.number(),
    description: z.string(),
    tech: z.array(z.string()).default([]),
    repo: z.url().optional(),
    link: z.url().optional(),
    note: z.string().optional(),
    // Link to a LinkedIn post: its photos and video are embedded on /projects/.
    linkedin: z.url().optional(),
    // Pictures shown below the text, from src/content/projects/images/.
    images: z
      .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
      .default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes, projects };
