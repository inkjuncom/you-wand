import { createContext, useContext } from "react";
import type { Locale } from "./settings";
import type { Dict } from "./dict";

/**
 * 国际化上下文。
 * 极其轻量 —— 仅存 locale 字符串 + 字典对象的引用，无任何运行时开销。
 */
interface I18nContextValue {
	locale: Locale;
	t: Dict;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
	locale,
	dict,
	children,
}: {
	locale: Locale;
	dict: Dict;
	children: React.ReactNode;
}) {
	return (
		<I18nContext.Provider value={{ locale, t: dict }}>
			{children}
		</I18nContext.Provider>
	);
}

/**
 * hook：获取当前 locale 和类型安全的翻译字典。
 * 必须在 I18nProvider 内使用，否则抛出明确错误。
 */
export function useI18n(): I18nContextValue {
	const ctx = useContext(I18nContext);
	if (!ctx) {
		throw new Error(
			"useI18n must be used within an <I18nProvider>. " +
				"Make sure __root.tsx wraps children with <I18nProvider>.",
		);
	}
	return ctx;
}
