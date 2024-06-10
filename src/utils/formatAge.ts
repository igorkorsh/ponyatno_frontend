import moment from 'moment'

export function formatYears(years: number) {
	const reminder = years % 10
	return `${years} ${reminder === 1 ? 'год' : reminder >= 2 && reminder <= 4 ? 'года' : 'лет'}`
}

function formatMonths(months: number) {
	const reminder = months % 10
	return `${months} ${reminder === 1 ? 'месяц' : reminder >= 2 && reminder <= 4 ? 'месяца' : 'месяцев'}`
}

export function formatAge(dateStr: string) {
	const birthDate = moment(dateStr, 'YYYY-MM-DD')
	const years = moment().diff(birthDate, 'years')
	const months = moment().diff(birthDate, 'months')

	if (years < 7) {
		return `${formatYears(years)} и ${formatMonths(months - years * 12)}`
	} else {
		return formatYears(years)
	}
}
