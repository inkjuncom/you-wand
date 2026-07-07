---
title: 用 AI 搭建一个个人博客
date: 2026-07-07 19:57
excerpt: 从买域名到上线，全程用 AI 辅助。Cloudflare + Next.js + TanStack Start，一个周末搞定的真实记录。
tags: [实战, AI 工具]
---

我一直想有一个自己的博客。不是写在知乎、掘金、Medium 上那种——而是自己的域名、自己的设计、自己的文字。拖延了很久，最后决定：**让 AI 帮我做。**

## 第一步：买域名

域名是一切的起点。我选了 [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)，原因是它按成本价出售，没有加价，而且自带免费的 SSL 和 CDN。

花了大概 60 块钱，买了一个满意的域名。整个过程不超过十分钟——搜索、加入购物车、付款、验证邮箱。Cloudflare 的界面干净利落，没有 GoDaddy 那种「加 99 元买隐私保护」的套路。

域名到手，就有了「这是我自己的地方」的感觉。

## 第二步：用 Next.js 搭骨架

接下来是写代码。我选了 Next.js——成熟、生态好、文档全，而且我对它的 App Router 已经比较熟了。

```bash
npx create-next-app@latest you-wand --typescript --tailwind --app
```

用 Tailwind CSS 做样式，接入了霞鹜文楷做手写字体。设计上选了「暮山紫」配色——暖紫底、紫罗兰点缀，想要那种温暖又克制的杂志感。

文章用 Markdown 写，构建时通过 `gray-matter` + `remark` 编译成 JSON，配合 `shiki` 做代码高亮。因为要部署到 Cloudflare Workers，运行时没有 Node 文件系统，所以必须预编译。国际化也自己写了一套轻量的，中英文双切。

一个周末，基本功能就有了：首页文章列表、详情页、中英切换、暗色模式。

## 第三步：让 AI 帮我迁移到 TanStack Start

Next.js 版本跑起来之后，我注意到 TanStack Start 这个新框架。它基于 TanStack Router，类型安全的文件路由，原生 Vite 构建——和 Next.js 那种「黑盒」感很不一样。

迁移的想法是：**把所有功能和设计原封不动地搬过去，但换成 TanStack Start 的底层。**

我把整个任务描述给 AI：

> 「帮我把 you-wand 中的功能，整体迁移到 tanstack-you-wand 中，过程中如果有更合适的方案、技术，可以及时向我提问。」

然后 AI 做了这些事：

1. **依赖安装**：`gray-matter`、`remark`、`shiki`、`lxgw-wenkai-webfont`
2. **路由重构**：Next.js 的 `[locale]` 目录路由 → TanStack Router 的 `$locale` 参数路由
3. **中间件迁移**：Next.js 的 `middleware.ts` → 根路由的 `loader` + `redirect`
4. **样式迁移**：完整把暮山紫主题 CSS 搬过来，适配了 Tailwind v4
5. **组件适配**：`Link`、`useRouter`、`generateStaticParams` 全部改成 TanStack 的方式

过程中 AI 会主动问我：
- 主题要不要换？（我说保留暮山紫）
- 路由结构怎么设计？（我说保持 `/zh/` `/en/` 前缀）
- 内容要不要迁移？（我说全搬）

每一步 AI 都先出了方案让我确认，然后再动手。不是黑盒式的「帮我做一个网站」，而是**每一步都可控**。

## 回过头看

整个流程下来，我做的事情其实不多：

- 买域名：我自己动手（这个 AI 替不了）
- 初版搭建：我也自己写了 Next.js 版本（想理解每个细节）
- 迁移到 TanStack：**这个是 AI 帮我做的**

从 Next.js 到 TanStack Start 的迁移，如果我自己做，估计要花一整个周末去读文档、踩坑、调兼容性。AI 帮我在半小时内就完成了——而且每个变更都有解释。

---

你不需要一次性把整个网站交给 AI。先从一个小任务开始，你会发现：**AI 最擅长的不是「替你做」，而是「帮你更快地理解」。**
