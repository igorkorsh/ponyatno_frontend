"use client"

import { useCallback, useState } from "react"
import { type Degree, IEducation } from "@/types/profile.types"
import { useEducation } from "@/hooks/useEducation"
import { CardWrapper } from "@/components/common/card-wrapper"
import { Item } from "@/components/common/item"
import { DEGREES } from "@/constants/education.constants"
import { EducationForm } from "./education-form"

export function EducationCard() {
	const [isOpen, setIsOpen] = useState(false)
	const [data, setData] = useState<IEducation | null>(null)
	const { data: educations, deleteItem } = useEducation()

	const handleOpenChange = useCallback((open: boolean) => {
		setIsOpen(open)
		if (!open) {
			setData(null)
		}
	}, [])

	const handleUpdate = useCallback(
		(id: string) => {
			const item: IEducation = educations?.find((education) => education.id === id)

			if (item) {
				setData(item)
				setIsOpen(true)
			}
		},
		[educations],
	)

	const handleClose = useCallback(() => {
		setData(null)
		setIsOpen(false)
	}, [])

	return (
		educations && (
			<CardWrapper
				title='Образование'
				dialog={
					<EducationForm
						data={data}
						onClose={handleClose}
					/>
				}
				open={isOpen}
				onOpenChange={handleOpenChange}
			>
				{educations.map(({ id, degree, institution, speciality, startDate, endDate }) => {
					const dateLabel = startDate ? `(${endDate ?? `${startDate}–по н.в.`})` : ""

					return (
						<Item
							key={id}
							id={id}
							title={`${DEGREES[degree as Degree]} ${dateLabel}`}
							description={`${institution}, ${speciality}`}
							onUpdate={() => handleUpdate(id)}
							onDelete={() => deleteItem(id)}
						/>
					)
				})}
			</CardWrapper>
		)
	)
}
