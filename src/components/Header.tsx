import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "#/i18n/I18nProvider";
import { serifStack } from "#/lib/fonts";
import ThemeToggle from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";

export default function Header() {
	const { locale, t } = useI18n();
	const [menuOpen, setMenuOpen] = useState(false);

	const navLinks = (
		<>
			<Link
				to="/$locale/"
				params={{ locale }}
				className="link-underline text-sm"
				activeProps={{ className: "link-underline text-accent text-sm" }}
				onClick={() => setMenuOpen(false)}
			>
				{t.nav.articles}
			</Link>
			<Link
				to="/$locale/about"
				params={{ locale }}
				className="link-underline text-sm"
				onClick={() => setMenuOpen(false)}
			>
				{t.nav.about}
			</Link>
		</>
	);

	return (
		<header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
			<div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
				{/* 品牌 */}
				<Link
					to="/$locale/"
					params={{ locale }}
					className="text-lg tracking-wide text-foreground no-underline shrink-0"
					style={{ fontFamily: serifStack, fontWeight: 700 }}
				>
					{t.brand}
				</Link>

				{/* 桌面端导航 */}
				<nav className="hidden sm:flex items-center gap-5 text-secondary">
					{navLinks}
					<LocaleSwitcher />
					<ThemeToggle />
				</nav>

				{/* 移动端：语言切换 + 主题 + 汉堡菜单 */}
				<div className="flex items-center gap-2 sm:hidden">
					<LocaleSwitcher />
					<ThemeToggle />
					<button
						type="button"
						onClick={() => setMenuOpen(!menuOpen)}
						aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
						className="relative z-20 flex h-8 w-8 items-center justify-center rounded-full text-muted hover:text-foreground transition-colors"
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							aria-hidden="true"
							className="transition-transform duration-300"
							style={{
								transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)",
							}}
						>
							{menuOpen ? (
								<path
									d="M4 4L14 14M14 4L4 14"
									stroke="currentColor"
									strokeWidth="1.8"
									strokeLinecap="round"
								/>
							) : (
								<>
									<path
										d="M3 5H15"
										stroke="currentColor"
										strokeWidth="1.8"
										strokeLinecap="round"
									/>
									<path
										d="M3 9H15"
										stroke="currentColor"
										strokeWidth="1.8"
										strokeLinecap="round"
									/>
									<path
										d="M3 13H15"
										stroke="currentColor"
										strokeWidth="1.8"
										strokeLinecap="round"
									/>
								</>
							)}
						</svg>
					</button>
				</div>
			</div>

			{/* 移动端下拉菜单 */}
			<div
				className={`overflow-hidden transition-all duration-300 ease-out sm:hidden ${
					menuOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<nav className="flex flex-col gap-4 px-6 pb-5 pt-1 text-secondary border-t border-border/50">
					{navLinks}
				</nav>
			</div>
		</header>
	);
}
