import { DEGREES } from "@/constants/education.constants"
import { GOALS, SUBJECTS } from "@/constants/subject.constants"

export type Degree = keyof typeof DEGREES
export type Subject = keyof typeof SUBJECTS
export type Goal = keyof typeof GOALS

export interface IProfile {
	username: string
	firstName: string
	birthDate?: string
	gender: "MALE" | "FEMALE" | null
	role: "TEACHER" | "STUDENT"
	avatar?: string
	lastName?: string
	about?: string
	isActive?: boolean
	isVerified?: boolean
	education?: IEducation[]
	subjects?: ISubject[]
}

export interface IEducation {
	id: string
	degree: Degree
	institution: string
	speciality: string
	startDate: number | null
	endDate: number | null
}

export interface ISubject {
	id: string
	name: Subject
	grades: number[]
	isFixedPrice: boolean
	minPrice: number
	maxPrice: number
	goals: Goal[]
	disabilities: boolean
	isArchived: boolean
}
