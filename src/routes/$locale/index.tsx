import { createFileRoute, Link } from "@tanstack/react-router";
import type { Locale } from "#/i18n/settings";
import { getDict } from "#/i18n/dict";
import { serifStack } from "#/lib/fonts";
import { getAllPosts } from "#/lib/posts";

export const Route = createFileRoute("/$locale/")({
	component: HomePage,
	head: ({ params }) => {
		const locale = params.locale as Locale;
		const t = getDict(locale);
		return {
			meta: [
				{ title: t.metadata.title },
				{ name: "description", content: t.metadata.description },
			],
			links: [
				{ rel: "alternate", hrefLang: "zh", href: "/zh" },
				{ rel: "alternate", hrefLang: "en", href: "/en" },
				{ rel: "alternate", hrefLang: "x-default", href: "/" },
			],
		};
	},
});

function HomePage() {
	const { locale } = Route.useParams();
	const t = getDict(locale as Locale);
	const posts = getAllPosts(locale as Locale);

	return (
		<div className="min-h-screen flex flex-col">
			<main className="flex-1 mx-auto w-full max-w-3xl px-6">
				{/* Hero 区：标题 + 装饰线 */}
				<section className="pt-12 pb-16 sm:pt-20 sm:pb-24">
					<h1
						className="text-4xl sm:text-5xl leading-tight"
						style={{
							fontFamily: serifStack,
							fontWeight: 700,
							letterSpacing: "0.01em",
						}}
					>
						{t.hero.title}
						<br />
						{t.hero.titleLine2}
					</h1>
					<span className="soft-divider mt-6" aria-hidden="true" />
					<p className="mt-6 text-base sm:text-lg text-secondary leading-relaxed">
						{t.hero.intro}
					</p>
				</section>

				{/* 文章列表 */}
				<section id="posts" className="pb-20">
					<h2
						className="text-xs tracking-[0.2em] uppercase text-muted mb-8"
						style={{ fontFamily: serifStack }}
					>
						{t.articlesSection.heading}
					</h2>

					{posts.length === 0 ? (
						<p className="text-sm text-muted py-8">{t.postsEmpty}</p>
					) : (
						<div className="grid gap-5">
							{posts.map((post) => (
								<Link
									key={post.slug}
									to="/$locale/posts/$slug"
									params={{ locale, slug: post.slug }}
									className="card card-hover block"
								>
									<div className="flex items-center gap-3 mb-3 flex-wrap">
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
									<h3
										className="text-xl sm:text-2xl mb-2"
										style={{
											fontFamily: serifStack,
											fontWeight: 700,
											letterSpacing: "0.01em",
										}}
									>
										{post.title}
									</h3>
									<p className="text-sm sm:text-base text-secondary leading-relaxed mb-3">
										{post.excerpt}
									</p>
									<span className="text-xs text-accent">
										{t.posts.readMore}
									</span>
								</Link>
							))}
						</div>
					)}
				</section>
			</main>
		</div>
	);
}
