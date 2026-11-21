# blog

Duanjhuii1110 的个人博客（《新媒体交互设计》作业2）。Astro + GitHub Pages，推送即上线。

- 线上地址：https://duanjhuii1110.github.io/blog/
- 仓库：https://github.com/Duanjhuii1110/blog

## 日常只做三件事

### 1. 写新文章

```
npm run new -- "文章标题" --tags 标签1,标签2
```

会生成 `src/content/posts/<标题>/index.md`，默认 `draft: true`（不发布）。

### 2. 放图片

图片和文章放**同一个目录**，正文里写 `![](./图片名.png)`。构建时会自动压缩优化。

### 3. 发布

```
git add .
git commit -m "新增：文章标题"
git push
```

推送后约 1 分钟自动上线，无需其他操作。

## 三条规则

1. **草稿不会被发布**：`draft: true` 的文章只在本地 `npm run dev` 可见，线上不出现。
2. **图片必须同目录**：一篇文章的图片放它自己的文件夹里，不要堆到别处。
3. **文章地址不可改**：文章网址 = 目录名（`/posts/<目录名>/`），建好后不要重命名目录。

## 本地命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地预览 http://localhost:4321/blog/ |
| `npm run build` | 构建到 dist/（发布失败时先跑这个定位问题） |
| `npm run preview` | 预览构建产物 |
| `npm run new -- "标题"` | 新建文章 |

## 注意事项

- frontmatter 的 `date` 必须加引号：`date: "2026-11-21"`，不写引号会导致构建错误。
- 站点名称、简介、导航在 `src/consts.ts` 里改。
- `draft: true` 的文章线上不可见；`--publish` 参数可直接建为发布状态。
- 发布失败看 GitHub 仓库的 Actions 日志定位文件，修复后重推即可。

## 部署机制

`.github/workflows/deploy.yml`：推送 main 分支 → 自动构建 → 发布到 GitHub Pages。首次部署需要先在仓库 **Settings → Pages → Source** 选择 **GitHub Actions**。
