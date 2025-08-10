export interface IProfile {
	name: string
	firstName: string
	lastName?: string
	birthDate: Date | undefined
	gender?: Gender
	about: string
	isVerified: boolean
}

export type Gender = "MALE" | "FEMALE"
