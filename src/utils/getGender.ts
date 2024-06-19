import { EnumClientGender } from '@/types/client.types'

export function getGender(value: EnumClientGender) {
	switch (value) {
		case EnumClientGender.MALE:
			return 'Мужской'
		case EnumClientGender.FEMALE:
			return 'Женский'
	}
}
