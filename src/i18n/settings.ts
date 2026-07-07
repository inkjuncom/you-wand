/**
 * 国际化配置常量
 * 芋泥魔杖支持中文（默认）与英文两种语言。
 *
 * 这是全站 i18n 的单一真相源 —— 不依赖任何第三方库，
 * 所有 locale 类型、列表、默认值统一从此文件导出。
 */
export const locales = ["zh", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "zh";
