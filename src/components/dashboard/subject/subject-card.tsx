"use client"

import { Accessibility } from "lucide-react"
import { useCallback, useState } from "react"
import { Goal, ISubject } from "@/types/profile.types"
import { useSubject } from "@/hooks/useSubject"
import { CardWrapper } from "@/components/common/card-wrapper"
import { Item } from "@/components/common/item"
import { Badge } from "@/components/ui/badge"
import { GOALS, GRADES, SUBJECTS } from "@/constants/subject.constants"
import { cn } from "@/utils/cn"
import { formatCurrency } from "@/utils/format-currency"
import { formatGrades } from "@/utils/format-grades"
import { SubjectForm } from "./subject-form"

export function SubjectCard() {
	const [isOpen, setIsOpen] = useState(false)
	const [data, setData] = useState<ISubject | null>(null)
	const { data: subjects, updateItem, deleteItem } = useSubject()

	const handleOpenChange = useCallback((open: boolean) => {
		setIsOpen(open)
		if (!open) {
			setData(null)
		}
	}, [])

	const handleUpdate = useCallback(
		(id: string) => {
			const item: ISubject = subjects?.find((subject) => subject.id === id)

			if (item) {
				setData(item)
				setIsOpen(true)
			}
		},
		[subjects],
	)

	const handleClose = useCallback(() => {
		setData(null)
		setIsOpen(false)
	}, [])

	return (
		subjects && (
			<CardWrapper
				title='Предметы'
				dialog={
					<SubjectForm
						data={data}
						onClose={handleClose}
					/>
				}
				open={isOpen}
				onOpenChange={handleOpenChange}
			>
				{subjects.map(({ id, name, grades, minPrice, maxPrice, goals, disabilities, isArchived }, idx) => {
					const price = minPrice === maxPrice ? formatCurrency(maxPrice) : `${formatCurrency(minPrice)} – ${formatCurrency(maxPrice)}`

					return (
						<Item
							key={idx}
							id={id}
							isArchived={isArchived}
							onUpdate={() => handleUpdate(id)}
							onArchive={() => updateItem({ id, data: { isArchived: !isArchived } })}
							onDelete={() => deleteItem(id)}
							className={cn(isArchived && "opacity-50")}
						>
							<div className='flex items-center gap-2'>
								<p className='text-base font-semibold text-neutral-900'>{SUBJECTS[name]}</p>
								{disabilities && <Accessibility className='size-5' />}
							</div>
							<p className='text-sm text-neutral-600'>Стоимость: {price}</p>
							{grades.length > 0 && (
								<div className='flex items-center gap-1'>
									{formatGrades(grades)
										.split(", ")
										.map((range, idx) => (
											<Badge key={idx}>{range}</Badge>
										))}
								</div>
							)}
							{goals.length > 0 && (
								<div className='flex items-center gap-1'>
									{goals.map((goal: Goal) => (
										<Badge key={goal}>{GOALS[goal]}</Badge>
									))}
								</div>
							)}
						</Item>
					)
				})}
			</CardWrapper>
		)
	)
}
