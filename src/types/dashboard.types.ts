import { DEGREES } from "@/constants/education.constants"
import { GOALS, SUBJECTS } from "@/constants/subject.constants"

export interface IEducation {
	id: string
	degree: keyof typeof DEGREES
	institution: string
	speciality: string
	startDate: number | null
	endDate: number | null
}

export interface IExperience {
	id: string
	years: number
	description: string
}

export interface ISubject {
	id: string
	name: keyof typeof SUBJECTS
	goals: (keyof typeof GOALS)[]
	disabilities: boolean
}

export interface IFormProps {
	onClose: () => void
}

export interface IItemProps {
	onUpdate: (id: string) => void
	onDelete: (id: string) => void
}
