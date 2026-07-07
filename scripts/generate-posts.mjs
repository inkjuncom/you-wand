/**
 * 构建预处理脚本：把 content/{locale}/*.md 编译成 JSON
 * ------------------------------------------------------------------
 * 在 next build 之前运行。读取所有 Markdown 文章，解析 frontmatter，
 * 用 remark 渲染正文、Shiki 高亮代码，输出为 src/data/posts-generated.json。
 *
 * 为什么需要这一步：
 * Cloudflare Worker 运行时没有 Node 文件系统，无法用 fs 读 content/ 目录。
 * 把文章预编译成 JSON 后，应用代码改为 import 这个 JSON，
 * 它会被打包进 Worker bundle，运行时直接可用，不依赖 fs。
 *
 * 运行：node scripts/generate-posts.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import {
	createHighlighterCore,
} from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const OUTPUT_DIR = path.join(ROOT, "src", "data");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "posts-generated.json");

const LOCALES = ["zh", "en"];

// 复用 Shiki 高亮器（与 posts.ts 保持一致的逻辑）
const highlighter = await createHighlighterCore({
	themes: [import("@shikijs/themes/github-light")],
	langs: [
		import("@shikijs/langs/bash"),
		import("@shikijs/langs/javascript"),
		import("@shikijs/langs/typescript"),
		import("@shikijs/langs/json"),
	],
	engine: createOnigurumaEngine(import("shiki/wasm")),
});

function highlightCodeBlocks(markdown) {
	const regex = /```([\w-]*)\n([\s\S]*?)```/g;
	return markdown.replace(regex, (_match, lang, code) => {
		const language = lang || "text";
		const trimmed = code.replace(/\n$/, "");
		try {
			return highlighter.codeToHtml(trimmed, {
				lang: language,
				theme: "github-light",
			});
		} catch {
			return highlighter.codeToHtml(trimmed, {
				lang: "text",
				theme: "github-light",
			});
		}
	});
}

async function renderMarkdown(content) {
	const withHighlights = highlightCodeBlocks(content);
	const processed = await remark()
		.use(remarkGfm)
		.use(remarkHtml, { sanitize: false })
		.process(withHighlights);
	return processed.toString();
}

async function processLocale(locale) {
	const dir = path.join(CONTENT_DIR, locale);
	if (!fs.existsSync(dir)) return [];

	const files = fs
		.readdirSync(dir)
		.filter((f) => f.endsWith(".md"))
		.sort((a, b) => a.localeCompare(b));

	const posts = [];
	for (const file of files) {
		const slug = file.replace(/\.md$/, "");
		const raw = fs.readFileSync(path.join(dir, file), "utf8");
		const { data, content } = matter(raw);
		const contentHtml = await renderMarkdown(content);
		posts.push({
			slug,
			title: String(data.title ?? slug),
			date: String(data.date ?? ""),
			excerpt: String(data.excerpt ?? ""),
			tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
			contentHtml,
		});
	}

	// 按日期倒序
	return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 主流程
const result = {};
for (const locale of LOCALES) {
	result[locale] = await processLocale(locale);
	console.log(`  ✓ ${locale}: ${result[locale].length} 篇文章`);
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, "\t"));
console.log(`\n已生成 ${path.relative(ROOT, OUTPUT_FILE)}`);
