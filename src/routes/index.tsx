import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * 根路径 `/` —— 语言协商重定向。
 *
 * 服务端：检测 cookie 或 Accept-Language 头，302 重定向到最佳语言版本。
 * 客户端（fallback）：默认重定向到 /zh/。
 * Cookie 由 LocaleSwitcher 在客户端写入。
 */
export const Route = createFileRoute("/")({
	loader: ({ request }) => {
		// 服务端：从 request 中协商语言
		if (request) {
			const url = new URL(request.url);

			// 1. Cookie（用户上次手动选择的语言）
			const cookieHeader = request.headers.get("cookie") || "";
			const localeCookie = cookieHeader
				.split(";")
				.map((c) => c.trim())
				.find((c) => c.startsWith("LOCALE="))
				?.split("=")[1];
			if (localeCookie && ["zh", "en"].includes(localeCookie)) {
				throw redirect({
					to: `/${localeCookie}${url.pathname}`,
					search: url.search,
				});
			}

			// 2. Accept-Language（浏览器偏好）
			const al = request.headers.get("accept-language") || "";
			if (al.includes("zh")) {
				throw redirect({ to: `/zh${url.pathname}`, search: url.search });
			}
			if (al.includes("en")) {
				throw redirect({ to: `/en${url.pathname}`, search: url.search });
			}
		}

		// 3. 默认中文（服务端 fallback / 客户端）
		throw redirect({ to: "/zh" });
	},
});
