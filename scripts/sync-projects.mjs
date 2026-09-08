import { cp, mkdir } from 'node:fs/promises';
const source = new URL('../BarCesar/', import.meta.url);
const destination = new URL('../public/projects/bar-cesar/', import.meta.url);
await mkdir(destination, { recursive: true });
for (const file of ['index.html', 'style.css', 'concept-two.css', 'app.js', 'motion.js', 'assets']) {
  await cp(new URL(file, source), new URL(file, destination), { recursive: true });
}
console.log('Bar César front page synced.');
