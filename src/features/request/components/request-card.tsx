import { Archive, ArchiveRestore, SquarePen, Trash } from "lucide-react"
import { useState } from "react"
import { Card } from "@/shared/components/card"
import { GOALS } from "@/shared/constants/goal.constants"
import { GRADES } from "@/shared/constants/grade.constants"
import { SUBJECTS } from "@/shared/constants/subject.constants"
import { Badge } from "@/shared/ui/badge"
import { cn } from "@/shared/utils/cn"
import { RequestForm } from "../forms/request-form"
import { useRequest } from "../hooks/useRequest"
import { IRequest } from "../interfaces/request.interface"
import { RequestItem } from "./request-item"

export const RequestCard = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [data, setData] = useState<IRequest | null>(null)
	const { data: requests, updateItem, deleteItem } = useRequest()

	if (!requests) return null

	const handleUpdate = (id: string) => {
		const request = requests.find((r) => r.id === id)
		if (request) {
			setData(request)
			setIsOpen(true)
		}
	}

	const handleArchive = (id: string) => {
		const request = requests.find((r) => r.id === id)
		if (request) {
			updateItem({
				id,
				data: {
					...request,
					status: request.status === "ARCHIVED" ? "ACTIVE" : "ARCHIVED",
				},
			})
		}
	}

	return (
		<Card
			title='Мои заявки'
			dialog={{
				title: data ? "Редактировать заявку" : "Создать заявку",
				element: <RequestForm data={data} />,
				isOpen,
				setIsOpen: (isOpen: boolean) => {
					if (!isOpen) setData(null)
					setIsOpen(isOpen)
				},
			}}
		>
			{requests.map((request) => {
				const { id, subject, grade, goals, comment, status } = request
				const isArchived = status === "ARCHIVED"

				return (
					<RequestItem
						key={id}
						actions={[
							{
								icon: <SquarePen />,
								label: "Редактировать",
								callback: () => handleUpdate(id),
							},
							{
								icon: isArchived ? <ArchiveRestore /> : <Archive />,
								label: isArchived ? "Восстановить" : "Архивировать",
								callback: () => handleArchive(id),
							},
							{
								icon: <Trash />,
								label: "Удалить",
								callback: () => deleteItem(id),
							},
						]}
						className={cn(isArchived && "opacity-50")}
					>
						<p className='text-base font-bold'>
							{SUBJECTS[subject]} ({GRADES[grade]})
						</p>
						{goals && (
							<div className='flex flex-wrap gap-2'>
								{goals.map((goal) => (
									<Badge key={goal}>{GOALS[goal]}</Badge>
								))}
							</div>
						)}
						{comment && <p className='text-sm text-neutral-600'>{comment}</p>}
					</RequestItem>
				)
			})}
		</Card>
	)
}
