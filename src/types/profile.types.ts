export interface IProfile {
	username: string
	firstName: string
	birthDate?: Date
	gender?: Gender
	isVerified: boolean
}

export interface ITeacherProfile extends IProfile {
	lastName?: string
	about?: string
}

export interface IStudentProfile extends IProfile {}

export enum Gender {
	MALE,
	FEMALE,
}
