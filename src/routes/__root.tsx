import {
	HeadContent,
	Scripts,
	createRootRoute,
	useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { I18nProvider } from "#/i18n/I18nProvider";
import { getDict } from "#/i18n/dict";
import { locales, defaultLocale, type Locale } from "#/i18n/settings";
import Footer from "#/components/Footer";
import Header from "#/components/Header";

import appCss from "#/styles.css?url";
import "lxgw-wenkai-webfont/style.css";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
		],
		links: [
			{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
			{ rel: "stylesheet", href: appCss },
		],
	}),
	shellComponent: RootDocument,
	errorComponent: RootError,
});

function RootError({ error }: { error: Error }) {
	return (
		<html lang="zh">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>芋泥魔杖 · YouWand</title>
			</head>
			<body className="antialiased" style={{ background: "#f4f2f5", color: "#1f1b2e", fontFamily: "system-ui, sans-serif" }}>
				<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
					<div style={{ textAlign: "center", maxWidth: "400px" }}>
						<h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>哎呀，出了点问题</h1>
						<p style={{ color: "#5c5572", marginBottom: "1.5rem" }}>
							{error?.message || "发生了意外错误，请刷新页面重试。"}
						</p>
						<a href="/" style={{ color: "#6b5b95" }}>返回首页</a>
					</div>
				</div>
			</body>
		</html>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	// 从 URL 中提取 locale，用于 I18nProvider 和 <html lang>
	const location = useLocation();
	const pathLocale = location.pathname.split("/")[1];
	const locale: Locale = locales.includes(pathLocale as Locale)
		? (pathLocale as Locale)
		: defaultLocale;
	const dict = getDict(locale);

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="antialiased">
				<I18nProvider locale={locale} dict={dict}>
					<Header />
					{children}
					<Footer />
				</I18nProvider>
				<TanStackDevtools
					config={{ position: "bottom-right" }}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
