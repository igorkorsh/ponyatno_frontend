export function formatGrades(grades: number[]) {
	if (!grades.length) return ""

	const ranges: string[] = []
	const excludeZero = grades.filter((grade) => grade > 0)

	if (grades.includes(0)) {
		ranges.push("Дошкольники")
	}

	if (excludeZero.length === 0) return ranges.join(", ")

	let start = excludeZero[0]

	for (let i = 1; i <= excludeZero.length; i++) {
		const curr = excludeZero[i]
		const prev = excludeZero[i - 1]

		if (curr !== prev! + 1) {
			ranges.push(start === prev ? `${start} класс` : `${start}-${prev} классы`)
			start = curr!
		}
	}

	return ranges.join(", ")
}
