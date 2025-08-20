import { GENDER, USER_ROLE } from "../constants/account.constants"

export interface IProfile {
	id: string
	role: keyof typeof USER_ROLE
	firstName: string
	lastName?: string
	gender: keyof typeof GENDER | null
	birthDate: Date | null
	avatar: string
	about?: string
	rating?: number
}
