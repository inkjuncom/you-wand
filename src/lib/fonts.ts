/**
 * 全站字体栈常量
 * ------------------------------------------------------------------
 * 全站统一使用霞鹜文楷（手写楷体），营造日常手写温度。
 * 在 __root.tsx 通过 npm 包 lxgw-wenkai-webfont 加载。
 *
 * 这里集中定义，供各路由共享，避免在多个文件里重复维护同一份字符串。
 */

/**
 * 标题/正文统一字体栈：霞鹜文楷优先，回退到系统中文字体。
 */
const stack =
	"'LXGW WenKai', 'LXGW WenKai Screen', 'Songti SC', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif";

/** 标题用（全站统一文楷） */
export const serifStack = stack;

/** 正文用（全站统一文楷） */
export const wenkaiStack = stack;
