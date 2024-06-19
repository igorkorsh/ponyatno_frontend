import { EnumClientIfOnline } from '@/types/client.types'

export function getIfOnline(value: EnumClientIfOnline) {
	switch (value) {
		case EnumClientIfOnline.ONLINE:
			return 'Онлайн'
		case EnumClientIfOnline.OFFLINE:
			return 'Офлайн'
		default:
			return 'Не имеет значения'
	}
}
