// Creates a new note with today's date:  npm run new "My title"
import { existsSync, writeFileSync } from 'node:fs';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new "Title of the note"');
  process.exit(1);
}

// "Perché corro" -> "perche-corro"
const slug = title
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const file = `src/content/notes/${slug}.md`;
if (existsSync(file)) {
  console.error(`${file} already exists.`);
  process.exit(1);
}

// Today's date in local time, as YYYY-MM-DD.
const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
date: ${date}
tags: []
lang: en
description: ""
draft: true
---

`,
);

console.log(`Created ${file}`);
console.log('It is marked "draft: true": visible in npm run dev, not published.');
console.log('Delete that line (or set it to false) when the note is ready.');
