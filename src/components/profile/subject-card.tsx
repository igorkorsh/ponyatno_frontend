"use client"

import { Accessibility } from "lucide-react"
import { type Goal, IProfileCard } from "@/types/profile.types"
import { useProfile } from "@/hooks/useProfile"
import { CardWrapper } from "@/components/common/card-wrapper"
import { Item } from "@/components/common/item"
import { Badge } from "@/components/ui/badge"
import { GOALS, SUBJECTS } from "@/constants/subject.constants"
import { formatCurrency } from "@/utils/format-currency"
import { formatGrades } from "@/utils/format-grades"

export function SubjectCard({ username }: IProfileCard) {
	const { data } = useProfile(username)
	const subjects = data?.subjects

	return (
		subjects && (
			<CardWrapper title='Предметы'>
				{subjects.map(({ id, name, grades, minPrice, maxPrice, goals, disabilities }, idx) => {
					const price = minPrice === maxPrice ? formatCurrency(maxPrice) : `${formatCurrency(minPrice)} – ${formatCurrency(maxPrice)}`

					return (
						<Item
							key={idx}
							id={id}
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
