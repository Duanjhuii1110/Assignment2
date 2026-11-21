import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 日期必须写成加引号的字符串：date: "2026-11-02"。
// 不用 z.coerce.date() —— YAML 会把未加引号的 2026-13-45 解析成 Date 并溢出成 2027-02-14，
// coerce 和 refine 都拦不住。这里用严格字符串 + 正则 + 日历回验，再统一转到东八区零点。
const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'date 必须写成加引号的 "YYYY-MM-DD" 字符串')
  .transform((value, ctx) => {
    const [y, m, d] = value.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: `${value} 不是有效的日历日期` });
      return z.NEVER;
    }
    return new Date(`${value}T00:00:00+08:00`);
  });

// 一篇文章 = 一个目录 + index.md + 同目录配图。
// generateId 把 "hello-world/index.md" 削成 "hello-world"，目录名就是文章网址里的 slug。
const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/index.md',
    generateId: ({ entry }) => entry.replace(/\/?index\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: dateSchema,
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// 独立页面（关于页等）
const pages = defineCollection({
  loader: glob({
    base: './src/content/pages',
    pattern: '**/*.md',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { posts, pages };
