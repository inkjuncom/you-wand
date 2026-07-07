---
title: Building a Personal Blog with AI
date: 2026-07-07 19:57
excerpt: The journey from buying a domain to going live on Cloudflare, why I changed my name to 芋泥, and why this is the only site I'll run from now on.
tags: [Hands-on, AI Tools]
---

## Who I Am

My name is 芋泥 (Yùní). If you've come across "印刻君" (InkJun) somewhere on the Chinese internet — that was me too.

I've published articles on Juejin, written answers on Zhihu, built several iterations of personal blogs, and run a WeChat public account. Over the years, I've left traces all over the internet.

But that was also the problem: **I was everywhere, but nowhere was truly my own.**

## Making a Decision

This time, I've made up my mind.

From now on, I'm running one site and one site only — right here: **芋泥魔杖 (YouWand)**.

There's a small story behind the name. "YouWand" is a homophone for "You want." The original Chinese name was "予你魔杖" — "granting you a wand." But 予你 was hard to remember and harder to spread. After talking with friends, we switched to "芋泥" — taro paste. It's warm, cute, and sticks in your head instantly.

I changed my author name to 芋泥 as well. Fresh start.

## A Pipeline That Works

After all these years of experimenting, the biggest thing I've figured out is a complete pipeline built entirely on Cloudflare:

1. **Domain**: Cloudflare Registrar — at-cost pricing, SSL and CDN included
2. **Code**: Next.js for the first version, styled with Tailwind CSS, writing in Markdown
3. **Deployment**: Cloudflare Workers — global edge network, fast everywhere
4. **Migration**: Used AI to migrate the entire project from Next.js to TanStack Start

```bash
# Initial build
npx create-next-app@latest you-wand --typescript --tailwind --app

# AI-assisted migration to TanStack Start
# Routes, i18n, styles, components — ported over intact
```

Once this pipeline is set up, running a personal site becomes incredibly lightweight. No servers, no maintenance, no hassle. A domain costs a few dollars a year, deployment is free, and every article renders straight to HTML.

## What I'll Write Here

Two directions.

**First: AI tools and productivity.** I use AI every day — writing code, drafting articles, organizing thoughts. Sharing what I learn might save you some time.

**Second: the how-to of building and deploying.** Like this article — documenting the pitfalls and the pipelines so you don't have to retrace my steps.

---

After all these years, I finally have a quiet corner to write in. Welcome.
