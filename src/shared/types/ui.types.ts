export type FormProps = {
	onClose?: () => void
}

export type Action = {
	icon: React.ReactNode
	label: string
	callback?: () => void
}

export type ItemProps = {
	actions: Action[]
	className?: string
}
