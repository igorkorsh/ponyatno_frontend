export const GRADES: Record<number, string> = {
	0: "Дошкольники",
	1: "1 класс",
	2: "2 класс",
	3: "3 класс",
	4: "4 класс",
	5: "5 класс",
	6: "6 класс",
	7: "7 класс",
	8: "8 класс",
	9: "9 класс",
	10: "10 класс",
	11: "11 класс",
}

export type Grade = keyof typeof GRADES
export const GRADE_ITEMS = Object.entries(GRADES).map(([key, value]) => ({
	value: +key as Grade,
	label: value,
}))
