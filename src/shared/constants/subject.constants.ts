export const SUBJECTS = {
	MATH: "Математика",
	ALGEBRA: "Алгебра",
	GEOMETRY: "Геометрия",
	STATISTICS: "Теория вероятности и статистика",
	COMPUTER_SCIENCE: "Информатика",
	PRIRODOVEDENIE: "Природоведение",
	OKRUZH_MIR: "Окружающий мир",
	BIOLOGY: "Биология",
	PHYSICS: "Физика",
	CHEMISTRY: "Химия",
	OBZR: "Основы безопасности и защиты Родины",
	NATURAL_SCIENCE: "Естествознание",
	ECOLOGY: "Экология",
	ASTRONOMY: "Астрономия",
} as const

export const SUBJECT_LIMITS: Record<Subject, number[]> = {
	MATH: [1, 2, 3, 4, 5, 6],
	ALGEBRA: [7, 8, 9, 10, 11],
	GEOMETRY: [7, 8, 9, 10, 11],
	STATISTICS: [7, 8, 9, 10, 11],
	COMPUTER_SCIENCE: [5, 6, 7, 8, 9, 10, 11],
	PRIRODOVEDENIE: [5, 6],
	OKRUZH_MIR: [1, 2, 3, 4],
	BIOLOGY: [5, 6, 7, 8, 9, 10, 11],
	PHYSICS: [5, 6, 7, 8, 9, 10, 11],
	CHEMISTRY: [5, 6, 7, 8, 9, 10, 11],
	OBZR: [5, 6, 7, 8, 9, 10, 11],
	NATURAL_SCIENCE: [5, 6, 7, 8, 9, 10, 11],
	ECOLOGY: [5, 6, 7, 8, 9, 10, 11],
	ASTRONOMY: [10, 11],
}

export type Subject = keyof typeof SUBJECTS
export const SUBJECT_ITEMS = Object.entries(SUBJECTS).map(([key, value]) => ({
	value: key,
	label: value,
}))
