import { useI18n } from "#/i18n/I18nProvider";
import { serifStack } from "#/lib/fonts";

export default function Footer() {
	const { t } = useI18n();
	const year = new Date().getFullYear();

	return (
		<footer className="mx-auto w-full max-w-3xl px-6 py-10">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted">
				<p>{t.footer.copyright.replace("{year}", String(year))}</p>
				<p style={{ fontFamily: serifStack }}>{t.footer.tagline}</p>
			</div>
		</footer>
	);
}
