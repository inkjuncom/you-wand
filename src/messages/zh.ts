/**
 * 中文翻译字典
 * 全站通过 getDict("zh") 获取，享受完整类型推导和自动补全。
 *
 * post 命名空间不再重复 brand/nav/footer —— 文章页直接使用根级 key。
 */
const zh = {
	brand: "芋泥魔杖",

	nav: {
		articles: "文章",
		about: "关于",
	},

	localeSwitcher: {
		label: "语言",
	},

	hero: {
		title: "好用的工具，",
		titleLine2: "递到你手里。",
		intro: "记录 AI 与效率工具的实践心得。我把打磨过的魔杖，一根根递给你。",
	},

	articlesSection: {
		heading: "文章",
	},

	posts: {
		readMore: "阅读 →",
	},

	postsEmpty: "文章正在路上，敬请期待。",

	footer: {
		copyright: "© {year} 芋泥魔杖 · YouWand",
		tagline: "愿你拥有一支称手的魔杖。",
	},

	metadata: {
		title: "芋泥魔杖 · YouWand",
		titleTemplate: "%s · 芋泥魔杖",
		description: "好用的工具，递到你手里。记录 AI 与效率工具的实践心得。",
	},

	notFound: {
		title: "这里什么也没有",
		description: "你走到了魔杖够不到的角落。",
		back: "回到首页",
	},

	/** 文章详情页独有文案 */
	post: {
		noTranslation: "本文暂无其他语言版本。",
		back: "返回首页",
	},
} as const;

export default zh;
