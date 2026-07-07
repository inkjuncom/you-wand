/**
 * English translation dictionary
 */
const en = {
	brand: "YouWand",

	nav: {
		articles: "Articles",
		about: "About",
	},

	localeSwitcher: {
		label: "Language",
	},

	hero: {
		title: "Good tools,",
		titleLine2: "handed to you.",
		intro:
			"Notes on AI & productivity tools. Each wand here has been tested — I'm just passing them along.",
	},

	articlesSection: {
		heading: "Articles",
	},

	posts: {
		readMore: "Read →",
	},

	postsEmpty: "Articles are on the way — stay tuned.",

	footer: {
		copyright: "© {year} YouWand",
		tagline: "May you find a wand that feels right in your hand.",
	},

	metadata: {
		title: "YouWand",
		titleTemplate: "%s · YouWand",
		description:
			"Good tools, handed to you. Notes on AI & productivity tools.",
	},

	notFound: {
		title: "Nothing here",
		description: "You've wandered somewhere a wand can't reach.",
		back: "Back to home",
	},

	/** Post detail page specific copy */
	post: {
		noTranslation: "This article isn't available in other languages yet.",
		back: "Back to home",
	},
} as const;

export default en;
