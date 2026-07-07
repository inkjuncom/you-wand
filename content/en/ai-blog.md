---
title: Building a Personal Blog with AI
date: 2026-07-07 19:57
excerpt: From buying a domain to going live — all with AI assistance. Cloudflare + Next.js + TanStack Start, done in a weekend.
tags: [Hands-on, AI Tools]
---

I've always wanted my own blog. Not on Medium, not on Dev.to — my own domain, my own design, my own voice. I put it off for a long time, and then finally decided: **let AI help me build it.**

## Step 1: Buying a Domain

A domain is where everything starts. I went with [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) — at-cost pricing, no markup, free SSL and CDN built in.

Spent about $9 on a domain I liked. The whole process took under ten minutes: search, add to cart, pay, verify email. Cloudflare's interface is clean, no "add privacy protection for $14.99" dark patterns.

Once the domain was mine, it felt real. This was my place now.

## Step 2: Building with Next.js

Next came the code. I chose Next.js — mature, great ecosystem, thorough docs, and I was already comfortable with the App Router.

```bash
npx create-next-app@latest you-wand --typescript --tailwind --app
```

Styled with Tailwind CSS, and used LXGW WenKai for the handwritten Chinese font. The design is "Twilight Purple" — warm lavender background with violet accents, aiming for that warm, restrained magazine feel.

Articles are written in Markdown, compiled to JSON at build time via `gray-matter` + `remark`, with `shiki` handling syntax highlighting. Since the site deploys to Cloudflare Workers (no Node.js filesystem at runtime), everything has to be pre-built. I also rolled my own lightweight i18n for Chinese/English switching.

By the end of a weekend, the basics were done: article listing on the homepage, post detail pages, language toggle, and dark mode.

## Step 3: Letting AI Migrate It to TanStack Start

After the Next.js version was live, I came across TanStack Start — a newer framework built on TanStack Router, with type-safe file-based routing and native Vite builds. It felt different from Next.js's "black box" approach.

The migration idea was simple: **move every feature and design over, but swap the foundation to TanStack Start.**

I described the task to AI:

> "Help me migrate all features from you-wand to tanstack-you-wand. If there's a better approach or tech along the way, ask me."

Here's what the AI did:

1. **Dependencies**: installed `gray-matter`, `remark`, `shiki`, `lxgw-wenkai-webfont`
2. **Route restructuring**: Next.js `[locale]` directory routes → TanStack Router `$locale` param routes
3. **Middleware migration**: Next.js `middleware.ts` → root route `loader` + `redirect`
4. **Style migration**: ported the entire Twilight Purple theme, adapted for Tailwind v4
5. **Component adaptation**: `Link`, `useRouter`, `generateStaticParams` all converted to TanStack equivalents

Throughout the process, the AI proactively asked:
- Keep the theme or change it? (I said keep Twilight Purple)
- What route structure? (Stick with `/zh/` `/en/` prefixes)
- Migrate all content? (Yes, all of it)

At every step, the AI presented a plan for approval before touching any code. Not a black-box "build me a website" — but **every move was visible and controlled.**

## Looking Back

Across the whole flow, I actually didn't do that much:

- Buying the domain: I did this myself (AI can't replace that)
- Initial build: I wrote the Next.js version myself (wanted to understand every detail)
- Migration to TanStack: **the AI did this**

If I'd done the Next.js → TanStack Start migration on my own, it would've eaten an entire weekend reading docs, hitting edge cases, debugging compatibility. The AI finished it in about half an hour — and explained every change.

---

You don't need to hand your entire site to AI at once. Start with one small task. You'll find: **what AI is best at isn't "doing it for you" — it's "helping you understand faster."**
