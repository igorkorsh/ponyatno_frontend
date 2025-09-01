"use client"

import { AboutCard } from "@/features/profile/components/about-card"
import { AccountCard } from "@/features/profile/components/account-card"
import { useCurrentProfile } from "@/features/profile/hooks/useCurrentProfile"
import { RequestCard } from "@/features/request/components/request-card"

export default function TeacherPage() {
	const { data } = useCurrentProfile()

	if (!data) return null

	return (
		<div className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
			<AccountCard />

			{data.role === "TEACHER" && <AboutCard />}
			{data.role === "STUDENT" && <RequestCard />}
		</div>
	)
}
