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

export const collections = { notes };
