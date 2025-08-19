export interface IExperience {
	id: string
	years: number
	description: string
}

export interface IFormProps {
	onClose: () => void
}

export interface IItemProps {
	onUpdate: (id: string) => void
	onDelete: (id: string) => void
}
