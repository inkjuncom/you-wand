import { createFileRoute, Link } from "@tanstack/react-router";
import type { Locale } from "#/i18n/settings";
import { getDict } from "#/i18n/dict";
import { serifStack } from "#/lib/fonts";

export const Route = createFileRoute("/$locale/$")({
	component: NotFoundPage,
	head: () => ({
		meta: [{ title: "404 · YouWand" }],
	}),
});

function NotFoundPage() {
	const { locale } = Route.useParams();
	const t = getDict(locale as Locale);

	return (
		<div className="min-h-screen flex items-center justify-center px-6">
			<div className="text-center max-w-md">
				<h1
					className="text-3xl sm:text-4xl mb-4"
					style={{ fontFamily: serifStack, fontWeight: 700 }}
				>
					{t.notFound.title}
				</h1>
				<p className="text-secondary mb-8">{t.notFound.description}</p>
				<Link
					to="/$locale/"
					params={{ locale }}
					className="link-underline text-sm"
				>
					{t.notFound.back}
				</Link>
			</div>
		</div>
	);
}
