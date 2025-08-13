export function calculateAge(birthDateStr?: string): string | null {
	if (!birthDateStr) return null

	const birthDate = new Date(birthDateStr)
	const today = new Date()

	let years = today.getFullYear() - birthDate.getFullYear()
	let months = today.getMonth() - birthDate.getMonth()
	const daysDiff = today.getDate() - birthDate.getDate()

	if (daysDiff < 0) months--
	if (months < 0) {
		years--
		months += 12
	}

	const yearPlural = new Intl.PluralRules("ru")
	const monthPlural = new Intl.PluralRules("ru")

	const yearTexts = {
		one: `${years} год`,
		few: `${years} года`,
		many: `${years} лет`,
		other: `${years} лет`,
	}

	const monthTexts = {
		one: `${months} месяц`,
		few: `${months} месяца`,
		many: `${months} месяцев`,
		other: `${months} месяцев`,
	}

	if (years < 1) {
		return monthTexts[monthPlural.select(months) as keyof typeof monthTexts]
	}

	if (years < 3) {
		return `${yearTexts[yearPlural.select(years) as keyof typeof yearTexts]} ${monthTexts[monthPlural.select(months) as keyof typeof monthTexts]}`
	}

	return yearTexts[yearPlural.select(years) as keyof typeof yearTexts]
}
