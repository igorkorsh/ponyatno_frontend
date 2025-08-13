export interface IProfile {
	username: string
	firstName: string
	birthDate?: string
	gender: "MALE" | "FEMALE" | null
	avatar?: string
}

export interface ITeacher extends IProfile {
	lastName?: string
	about: string
	isActive: boolean
	isVerified: boolean
}

export interface IStudent extends IProfile {}
