import { defineConfig, fontProviders } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import rehypeFigure from './src/plugins/rehype-figure.mjs';
import rehypeTaskList from './src/plugins/rehype-task-list.mjs';
import codeTheme from './src/styles/code-theme.mjs';

export default defineConfig({
  // Public address of the site. Used for the sitemap, RSS and canonical URLs.
  site: 'https://gianlucanordio.github.io',

  integrations: [sitemap()],

  // Put the CSS inside each page instead of a separate file: one request
  // fewer before the first paint.
  build: { inlineStylesheets: 'always' },

  // Images are resized to several widths, so phones download a
  // smaller file than desktops.
  image: { layout: 'constrained' },

  // Fonts are downloaded from Fontsource at build time and served from this
  // site (no request to a third party at runtime). Each font is exposed as a
  // CSS variable, used in src/styles/global.css.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Fraunces',
      cssVariable: '--font-body',
      // Light for large ledes, regular for text, semibold for headings.
      weights: [300, 400, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      // Labels, the yellow "tape", navigation and code.
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      weights: [400, 500, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],

  markdown: {
    // The classic remark/rehype pipeline, for the two small rehype plugins.
    // GFM (tables, footnotes, task lists) is on by default.
    processor: unified({
      // As in LaTeX: -- is an en dash, --- is an em dash.
      smartypants: { dashes: 'oldschool' },
      rehypePlugins: [rehypeFigure, rehypeTaskList],
    }),
    shikiConfig: { theme: codeTheme },
  },
});
