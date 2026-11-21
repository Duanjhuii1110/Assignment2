import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/posts';
import { withBase } from '../lib/url';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
  const posts = await getPublishedPosts();
  // site 必须带 /blog/ 前缀，否则 RSS 里的链接全部 404
  const site = new URL(import.meta.env.BASE_URL, context.site);
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: withBase(`/posts/${post.id}/`),
    })),
    customData: '<language>zh-cn</language>',
  });
}
