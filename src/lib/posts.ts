import { getCollection, render, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

// 全站唯一文章出口：过滤草稿 + 按日期倒序。
// 首页、标签、归档、RSS、sitemap 只准用它，任何地方不得直接 getCollection('posts')。
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// 汇总所有已发布文章的标签：[{ tag: '随笔', count: 2 }]，按文章数降序。
export function collectTags(posts: Post[]): { tag: string; count: number }[] {
  const map = new Map<string, { tag: string; count: number }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const key = tag.toLowerCase();
      const hit = map.get(key);
      if (hit) hit.count += 1;
      else map.set(key, { tag, count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

// 标签页路径用的 key（小写化），返回原文用于展示。
export function tagKey(tag: string): string {
  return tag.toLowerCase();
}

export async function renderPost(post: Post) {
  return render(post);
}
