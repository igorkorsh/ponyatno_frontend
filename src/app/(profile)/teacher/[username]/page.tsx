"use client"

import { useParams } from "next/navigation"
import { AboutCard } from "@/components/profile/about-card"
import { AccountCard } from "@/components/profile/account-card"
import { EducationCard } from "@/components/profile/education-card"
import { SubjectCard } from "@/components/profile/subject-card"

export default function TeacherPage() {
	const { username } = useParams() as { username: string }

	return (
		<div className='flex flex-col gap-6'>
			<AccountCard username={username} />
			<AboutCard username={username} />
			<EducationCard username={username} />
			<SubjectCard username={username} />
		</div>
	)
}
