import rss from '@astrojs/rss';
import { SITE, getNotes } from '../site.js';

export async function GET(context) {
  const notes = await getNotes();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: notes.map((note) => ({
      title: note.data.title,
      pubDate: note.data.date,
      description: note.data.description,
      categories: note.data.tags,
      link: `/notes/${note.id}/`,
    })),
  });
}
