export function getYears(delta: number): number[] {
	const endYear = new Date().getFullYear() + delta
	return Array.from({ length: endYear - 1924 }, (_, i) => endYear - i)
}
