import { EnumClientTimeRange } from '@/types/client.types'

export function getTimeRange(value: EnumClientTimeRange) {
	switch (value) {
		case EnumClientTimeRange.ACADEMIC_HOUR:
			return 'Академический час (45 минут)'
		case EnumClientTimeRange.ASTRONOMIC_HOUR:
			return 'Астрономический час (60 минут)'
	}
}
