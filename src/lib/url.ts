// 项目站点部署在 /blog/ 子路径下。
// 所有内部链接必须经过 withBase() 拼接，否则线上会 404 —— 这是项目站点最常见的坑。

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // '/blog'
  if (!path || path === '/') return `${base}/`;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
