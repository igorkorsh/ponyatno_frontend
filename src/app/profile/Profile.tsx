'use client'

import { AboutDetails } from '@/components/profile/AboutDetails'
import { AccountDetails } from '@/components/profile/AccountDetails'
import { ConditionDetails } from '@/components/profile/ConditionDetails'
import { EducationDetails } from '@/components/profile/EducationDetails'
import { PriceDetails } from '@/components/profile/PriceDetails'
import { SubjectDetails } from '@/components/profile/SubjectDetails'

import { useProfile } from '@/hooks/useProfile'

export function Profile() {
	const { data, isPending } = useProfile()

	if (isPending) return <div>Идет загрузка...</div>

	if (!data) return <div>Пользователь не найден</div>

	return (
		<div>
			<AccountDetails details={data} />
			<AboutDetails details={data} />
			{data.user_type === 'teacher' && <PriceDetails details={data} />}
			<ConditionDetails details={data} />
			{data.user_type === 'teacher' && <EducationDetails details={data} />}
			<SubjectDetails details={data} />
		</div>
	)
}
