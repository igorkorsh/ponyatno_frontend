export interface IEducation {
	id: string
	degree: string
	institution: string
	speciality: string
	startDate: number | null
	endDate: number | null
}

export interface IFormProps {
	onClose: () => void
}

export interface IItemProps {
	onUpdate: (id: string) => void
	onDelete: (id: string) => void
}
