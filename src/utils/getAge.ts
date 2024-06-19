import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)
dayjs.locale('ru')

export function getAge(dateStr: string) {
	return dayjs(dateStr).add(1, 'y').fromNow(true)
}
