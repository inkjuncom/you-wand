import { useNavigate } from "@tanstack/react-router";
import { useI18n } from "#/i18n/I18nProvider";
import { locales, type Locale } from "#/i18n/settings";

/**
 * 胶囊分段语言切换器
 *
 * 在暮山紫主题下，选中项紫色高亮、未选中项安静灰色，
 * 切换时带平滑过渡动画，像一个实体开关。
 */
export function LocaleSwitcher() {
	const { locale, t } = useI18n();
	const navigate = useNavigate();

	const labels: Record<Locale, string> = {
		zh: "中",
		en: "EN",
	};

	function switchTo(next: Locale) {
		if (next === locale) return;

		// 写入 cookie：下次访问 / 时服务端重定向到该语言
		document.cookie = `LOCALE=${next}; path=/; max-age=31536000; SameSite=Lax`;

		// 替换当前路径中的 locale 段：/zh/posts/foo → /en/posts/foo
		const currentPath = window.location.pathname;
		const newPath = `/${next}${currentPath.slice(3)}`;
		navigate({ to: newPath });
	}

	return (
		<div
			className="relative flex items-center rounded-full bg-accent-soft/60 p-0.5"
			aria-label={t.localeSwitcher.label}
			role="group"
		>
			{/* 滑动背景指示器：仅在两个按钮之间切换位置 */}
			<div
				className="absolute top-0.5 h-[calc(100%-4px)] rounded-full bg-accent shadow-sm transition-all duration-300 ease-out"
				style={{
					width: "calc(50% - 2px)",
					left: locale === "zh" ? "2px" : "calc(50% + 0px)",
				}}
			/>

			{locales.map((l) => {
				const active = l === locale;
				return (
					<button
						key={l}
						type="button"
						onClick={() => switchTo(l)}
						aria-pressed={active}
						className={`relative z-10 rounded-full px-3 py-1 text-xs font-medium transition-colors duration-300 ${
							active
								? "text-white"
								: "text-muted hover:text-foreground"
						}`}
					>
						{labels[l]}
					</button>
				);
			})}
		</div>
	);
}
