export const GOALS = {
	PFR: "Повышение успеваемости",
	VPR: "Подготовка к ВПР",
	OGE: "Подготовка к ОГЭ",
	EGE: "Подготовка к ЕГЭ",
	OLY: "Подготовка к олимпиаде",
} as const

export type Goal = keyof typeof GOALS
export const GOAL_ITEMS = Object.entries(GOALS).map(([key, value]) => ({
	value: key,
	label: value,
}))
