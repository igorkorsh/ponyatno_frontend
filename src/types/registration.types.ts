import { EnumClientType } from './client.types'

export interface IRegisterForm {
	type: EnumClientType
	name: string
	email: string
	password: string
	privacy: boolean
}
