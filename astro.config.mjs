import { defineConfig, fontProviders } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
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

  // Images in notes are resized to several widths, so phones download a
  // smaller file than desktops.
  image: { layout: 'constrained' },

  // Fonts are downloaded from Fontsource at build time and served from this
  // site (no request to a third party at runtime). Each font is exposed as a
  // CSS variable, used in src/styles/global.css.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Source Serif 4',
      cssVariable: '--font-body',
      // Regular for text, semibold for headings and bold. Separate small
      // files load faster than the single variable font (about 120 kB).
      weights: [400, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [400, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],

  markdown: {
    // Astro 7 defaults to its own Markdown engine (Sätteri). The classic
    // remark/rehype pipeline is used here because math needs its plugins.
    // GFM (tables, footnotes, task lists) is on by default.
    processor: unified({
      // As in LaTeX: -- is an en dash, --- is an em dash.
      smartypants: { dashes: 'oldschool' },
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, rehypeFigure, rehypeTaskList],
    }),
    shikiConfig: { theme: codeTheme },
  },
});
