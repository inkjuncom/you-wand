---
title: Building a Personal Blog with AI
date: 2026-07-07 19:57
excerpt: The journey from buying a domain to going live on Cloudflare, why I changed my name to 芋泥, and why I'll primarily run this site from now on.
tags: [Hands-on, AI Tools]
---

## Who I Am

My name is 芋泥 (Yùní). If you've come across "印刻君" (InkJun) somewhere on the Chinese internet, that was me too.

I've published articles on Juejin, written answers on Zhihu, built several iterations of personal blogs, and run a WeChat public account. Over the years, I've left traces all over the internet.

But that was also the problem: **I was everywhere, but nowhere was truly my own.**

## Making a Decision

This time, I've made up my mind.

From now on, this is the site I'll primarily run: **芋泥魔杖 (YouWand)**.

There's a small story behind the name. The original Chinese name was "予你魔杖", meaning "granting you a wand." But 予你 was hard to remember and harder to spread. After talking with friends, I switched to "芋泥", which sounds similar but is warmer and cuter. It sticks in your head instantly.

I changed my author name to 芋泥 as well. A fresh start.

## A Pipeline That Works

After all these years of experimenting, the biggest thing I've figured out is a complete pipeline built entirely on Cloudflare:

1. **Domain**: I bought it on Cloudflare Registrar. It sells at cost, with SSL and CDN included.
2. **Code**: I built the first version with Next.js, styled it with Tailwind CSS, and wrote articles in Markdown.
3. **Deployment**: I deployed it to Cloudflare Workers. It runs on the global edge network, fast everywhere.
4. **Migration**: I used AI to migrate the entire project from Next.js to TanStack Start.

```bash
# Initial build
npx create-next-app@latest you-wand --typescript --tailwind --app

# AI-assisted migration to TanStack Start
# Routes, i18n, styles, components, all ported over intact
```

Once this pipeline is set up, running a personal site becomes incredibly lightweight. You don't need a server, you don't need maintenance, you don't need to deal with operations. A domain costs a few dollars a year, deployment is free, and every article renders straight to HTML.

## What I'll Write Here

I plan to write in two directions.

**First: AI tools and productivity.** I use AI every day, writing code, drafting articles, organizing thoughts. I write down what I learn. It might save you some time.

**Second: the how-to of building and deploying.** Like this article, I document the pitfalls and the pipelines so you don't have to retrace my steps.

---

After all these years, I finally have a quiet corner to write in. Welcome.
