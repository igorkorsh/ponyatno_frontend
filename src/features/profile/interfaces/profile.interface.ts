import { GENDER, USER_ROLE } from "../constants/account.constants"

export interface IProfile {
	username: string
	role: keyof typeof USER_ROLE
	firstName: string
	lastName?: string
	gender: keyof typeof GENDER | null
	birthDate: Date | null
	about?: string
	rating?: number
}
