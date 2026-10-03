import { defineConfig, fontProviders } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeFigure from './src/plugins/rehype-figure.mjs';
import codeTheme from './src/styles/code-theme.mjs';

export default defineConfig({
  // Public address of the site. Used for the sitemap, RSS and canonical URLs.
  site: 'https://gianlucanordio.github.io',

  integrations: [sitemap()],

  // Fonts are downloaded from Fontsource at build time and served from this
  // site (no request to a third party at runtime). Each font is exposed as a
  // CSS variable, used in src/styles/global.css.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Source Serif 4',
      cssVariable: '--font-body',
      weights: ['400 700'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: ['400 700'],
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
      rehypePlugins: [rehypeKatex, rehypeFigure],
    }),
    shikiConfig: { theme: codeTheme },
  },
});
