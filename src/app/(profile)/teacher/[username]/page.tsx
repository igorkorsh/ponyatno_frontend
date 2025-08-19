"use client"

import { useParams } from "next/navigation"
import { AboutCard } from "@/components/profile/about-card"
import { AccountCard } from "@/components/profile/account-card"
import { EducationCard } from "@/components/profile/education-card"
import { SubjectCard } from "@/components/profile/subject-card"
import { AccountNameContext } from "@/context/useAccountName"

export default function TeacherPage() {
	const params = useParams()
	const { username } = params as { username: string }

	return (
		<AccountNameContext.Provider value={{ username }}>
			<div className='flex flex-col gap-4'>
				<AccountCard />
				<AboutCard />
				<EducationCard />
				<SubjectCard />
			</div>
		</AccountNameContext.Provider>
	)
}
