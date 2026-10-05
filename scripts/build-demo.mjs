// Run locally with the owner's unzipped Facebook export as the only argument.
// Publishes the structured dashboard result, never the source JSON or media.
import {readFile, readdir, writeFile} from 'node:fs/promises';
import {join, resolve, basename} from 'node:path';
import {fileURLToPath} from 'node:url';
import {identify, createResult, analyzeDataset, finalize} from '../static/js/metadata-engine.mjs';

const exportFolder = process.argv[2];
if (!exportFolder) throw new Error('Usage: node scripts/build-demo.mjs /path/to/unzipped-facebook-export');

const root = resolve(exportFolder);
const reactionFolder = 'your_facebook_activity/comments_and_reactions';
const required = [
  'logged_information/search/your_search_history.json',
  'connections/friends/your_friends.json',
  'logged_information/activity_messages/people_and_friends.json',
  'personal_information/profile_information/profile_update_history.json',
  `${reactionFolder}/comments.json`,
];
const reactionFiles = (await readdir(join(root, reactionFolder)))
  .filter(name => /^likes_and_reactions(?:_\d+)?\.json$/.test(name))
  .sort();
const paths = [...required, ...reactionFiles.map(name => `${reactionFolder}/${name}`)];
const selected = identify(paths.map(relative => ({path: `${basename(root)}/${relative}`, name: basename(relative)})));
if (selected.platform !== 'Facebook' || selected.matches.length !== paths.length) throw new Error('Unexpected Facebook export structure');

const result = createResult('Facebook');
for (const dataset of selected.matches) {
  analyzeDataset(result, dataset, JSON.parse(await readFile(join(root, dataset.relative), 'utf8')));
}
const report = finalize(result);
report.demoSource = 'Public analysis results from the site owner’s Facebook export';
const destination = fileURLToPath(new URL('../static/demo/facebook.json', import.meta.url));
await writeFile(destination, `${JSON.stringify(report)}\n`, {flag: 'w', mode: 0o644});
console.log(`Generated Facebook demo: ${report.datasets.length} dataset files, ${report.sections.length} sections`);
