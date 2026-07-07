import zh from "#/messages/zh";
import en from "#/messages/en";
import type { Locale } from "./settings";

/**
 * 类型安全的字典访问器
 * 用法：const t = getDict("zh"); → t.hero.title（完全类型推导 + 自动补全）
 */
const dicts = { zh, en } as const;

export type Dict = (typeof dicts)[Locale];

export function getDict(locale: Locale): Dict {
	return dicts[locale];
}
