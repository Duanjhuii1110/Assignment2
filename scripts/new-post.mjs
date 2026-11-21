// 用法：npm run new -- "文章标题" [--tags 标签1,标签2] [--publish]
// 生成 src/content/posts/<slug>/index.md，默认 draft: true（不发布）。
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);
const flags = { tags: [], publish: false };
const positional = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--tags') {
    flags.tags = (args[++i] ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  } else if (args[i] === '--publish') {
    flags.publish = true;
  } else {
    positional.push(args[i]);
  }
}

const title = positional.join(' ').trim();
if (!title) {
  console.error('用法：npm run new -- "文章标题" [--tags 标签1,标签2] [--publish]');
  process.exit(1);
}

// slug：转小写、空格转短横线，保留中文
const slug =
  title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{Letter}\p{Number}-]+/gu, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'untitled';

const dir = join(process.cwd(), 'src', 'content', 'posts', slug);
if (existsSync(dir)) {
  console.error(`已存在同名文章目录：src/content/posts/${slug}`);
  process.exit(1);
}
mkdirSync(dir, { recursive: true });

const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai' }).format(new Date());

const frontmatter = [
  '---',
  `title: "${title.replaceAll('"', '\\"')}"`,
  'description: ""',
  `date: "${today}"`,
  `tags: [${flags.tags.map((t) => `"${t}"`).join(', ')}]`,
  `draft: ${flags.publish ? 'false' : 'true'}`,
  '---',
  '',
  '正文从这里开始。',
  '',
].join('\n');

writeFileSync(join(dir, 'index.md'), frontmatter, 'utf8');
console.log(`已创建：src/content/posts/${slug}/index.md（图片也放这个目录，正文里写 ![](./图片名.png)）`);
if (!flags.publish) console.log('当前为草稿（draft: true），本地可见、线上不发布。想发布把 draft 改成 false 再推送。');
