"use client"

import { AboutCard } from "@/features/profile/components/about-card"
import { AccountCard } from "@/features/profile/components/account-card"

export default function TeacherPage() {
	return (
		<div className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
			<AccountCard />
			<AboutCard />
		</div>
	)
}
