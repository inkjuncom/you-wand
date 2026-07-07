import type { Locale } from "#/i18n/settings";
// 文章数据由 scripts/generate-posts.mjs 在构建前预编译为 JSON。
// 这样运行时不依赖 fs，直接从打包进 bundle 的 JSON 读取，
// 在 Cloudflare Worker 环境也能正常工作。
import postsData from "#/data/posts-generated.json";

/**
 * 文章数据层
 * ------------------------------------------------------------------
 * 数据来源：src/data/posts-generated.json（构建前由 scripts/generate-posts.mjs
 * 从 content/{locale}/*.md 预编译而来，含渲染后的 HTML 正文）。
 *
 * 这样设计的原因：Cloudflare Worker 运行时没有 Node 文件系统，
 * 无法用 fs 读 content/ 目录。预编译成 JSON 后被打包进 Worker bundle，
 * 运行时直接 import 即可，不依赖 fs。
 */

/** frontmatter 的结构 */
export interface PostFrontmatter {
	title: string;
	date: string;
	excerpt: string;
	tags: string[];
}

/** 列表用：不含正文的元数据 */
export interface PostMeta extends PostFrontmatter {
	slug: string;
}

/** 详情用：含渲染后的 HTML 正文 */
export interface Post extends PostMeta {
	contentHtml: string;
}

// 运行时数据结构（JSON 的形态）
type PostsData = Record<string, Post[]>;

const data = postsData as PostsData;

// ─── 公开 API ───────────────────────────────────────────────────

/** 某语言下所有文章的 slug */
export function getAllSlugs(locale: Locale): string[] {
	return (data[locale] ?? []).map((p) => p.slug);
}

/** 所有 (locale, slug) 组合 —— 供路由参数生成使用 */
export function getAllLocaleSlugPairs(): { locale: string; slug: string }[] {
	const pairs: { locale: string; slug: string }[] = [];
	for (const locale of Object.keys(data)) {
		for (const post of data[locale] ?? []) {
			pairs.push({ locale, slug: post.slug });
		}
	}
	return pairs;
}

/** 某语言下所有文章的元数据（不含正文），已按日期倒序 */
export function getAllPosts(locale: Locale): PostMeta[] {
	return (data[locale] ?? []).map(
		({ contentHtml: _contentHtml, ...meta }) => meta,
	);
}

/** 仅读元数据 —— 列表页用 */
export function getPostMeta(locale: Locale, slug: string): PostMeta | null {
	const post = (data[locale] ?? []).find((p) => p.slug === slug);
	if (!post) return null;
	const { contentHtml: _contentHtml, ...meta } = post;
	return meta;
}

/** 读完整文章（含渲染后的 HTML 正文）—— 详情页用 */
export function getPost(locale: Locale, slug: string): Post | null {
	return (data[locale] ?? []).find((p) => p.slug === slug) ?? null;
}
