'use client'

import { Col, Container, Row } from 'react-bootstrap'

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
		<Container>
			<h1>Профиль пользователя</h1>
			<Row>
				<Col>
					<AccountDetails details={data} />
				</Col>
				<Col>
					<AboutDetails details={data} />
				</Col>
			</Row>
			<Row>
				<Col>
					{data.user_type === 'teacher' && <PriceDetails details={data} />}
				</Col>
				<Col>
					<ConditionDetails details={data} />
				</Col>
			</Row>
			<Row>
				<Col>
					{data.user_type === 'teacher' && <EducationDetails details={data} />}
				</Col>
				<Col>
					<SubjectDetails details={data} />
				</Col>
			</Row>
		</Container>
	)
}
