import { useProfile } from "@/hooks/useProfile"
import { CardWrapper } from "@/components/common/card-wrapper"
import { Item } from "@/components/common/item"
import { DEGREES } from "@/constants/education.constants"
import { useAccountName } from "@/context/useAccountName"

export function EducationCard() {
	const { username } = useAccountName()
	const { data } = useProfile(username)
	const educations = data?.education

	return (
		educations &&
		educations.length > 0 && (
			<CardWrapper title='Образование'>
				{educations.map(({ id, degree, institution, speciality, startDate, endDate }, idx) => {
					const dateLabel = startDate ? `(${endDate ?? `${startDate}–по н.в.`})` : ""

					return (
						<Item
							key={idx}
							id={id}
							title={`${DEGREES[degree]} ${dateLabel}`}
							description={`${institution}, ${speciality}`}
						/>
					)
				})}
			</CardWrapper>
		)
	)
}
