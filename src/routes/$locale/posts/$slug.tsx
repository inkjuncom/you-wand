import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { Locale } from "#/i18n/settings";
import { getDict } from "#/i18n/dict";
import { serifStack } from "#/lib/fonts";
import { getPost, getPostMeta } from "#/lib/posts";

export const Route = createFileRoute("/$locale/posts/$slug")({
	component: PostPage,
	head: ({ params }) => {
		const { locale, slug } = params;
		const post = getPostMeta(locale as Locale, slug);
		if (!post) return {};
		return {
			meta: [
				{ title: post.title },
				{ name: "description", content: post.excerpt },
			],
			links: [
				{ rel: "alternate", hrefLang: "zh", href: `/zh/posts/${slug}` },
				{ rel: "alternate", hrefLang: "en", href: `/en/posts/${slug}` },
			],
		};
	},
});

function PostPage() {
	const { locale, slug } = Route.useParams();
	const t = getDict(locale as Locale);
	const post = getPost(locale as Locale, slug);

	if (!post) {
		throw notFound();
	}

	// 检查另一语言版本是否存在
	const otherLocale: Locale = locale === "zh" ? "en" : "zh";
	const otherExists = Boolean(getPostMeta(otherLocale, slug));

	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1 mx-auto w-full max-w-3xl px-6">
				<article className="card mt-6 mb-10">
					{/* 头部：日期 + 标签 */}
					<div className="flex items-center gap-3 mb-4 flex-wrap">
						<time
							className="text-xs text-muted tabular-nums shrink-0"
							style={{ fontFamily: serifStack }}
						>
							{post.date}
						</time>
						{post.tags.length > 0 && (
							<div className="flex gap-2 flex-wrap">
								{post.tags.map((tag) => (
									<span
										key={tag}
										className="text-[11px] text-accent/80"
									>
										#{tag}
									</span>
								))}
							</div>
						)}
					</div>
					<h1
						className="text-3xl sm:text-4xl leading-tight mb-4"
						style={{
							fontFamily: serifStack,
							fontWeight: 700,
							letterSpacing: "0.01em",
						}}
					>
						{post.title}
					</h1>
					<span className="soft-divider mb-8" aria-hidden="true" />

					{/* 正文 HTML */}
					<div
						// biome-ignore lint/security/noDangerouslySetInnerHtml: 内容由构建脚本预编译，来源为本仓库 content/ 目录下的可信文件
						dangerouslySetInnerHTML={{ __html: post.contentHtml }}
						className="prose-warm"
					/>
				</article>

				{/* 另一语言版本提示 */}
				{!otherExists && (
					<p className="text-xs text-muted text-center pb-8">
						{t.post.noTranslation}
					</p>
				)}

				{/* 返回首页 */}
				<div className="text-center pb-12">
					<Link
						to="/$locale/"
						params={{ locale }}
						className="pill-button inline-flex"
					>
						← {t.post.back}
					</Link>
				</div>
			</main>
		</div>
	);
}
