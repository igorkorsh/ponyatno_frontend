export interface IProfile {
	id: string
	role: "student" | "teacher"
	name: string
	firstName: string
	lastName: string
	birthDate: string | null
	gender: string | null
	about: string
	isVerified: boolean
}
