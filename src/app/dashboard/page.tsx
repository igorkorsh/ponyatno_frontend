"use client"

import { EducationCard } from "@/components/dashboard/[rewrite]education/education-card"
import { AboutCard } from "@/components/dashboard/about/about-card"
import { AccountCard } from "@/components/dashboard/account/account-card"
import { SubjectCard } from "@/components/dashboard/subject/subject-card"

export default function TeacherPage() {
	return (
		<div className='flex flex-col gap-4 lg:gap-6'>
			<AccountCard />
			<AboutCard />
			<EducationCard />
			<SubjectCard />
		</div>
	)
}
