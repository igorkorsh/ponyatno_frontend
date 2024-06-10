'use client'

import { useProfile } from '@/hooks/useProfile'

import { formatAge, formatYears } from '@/utils/formatAge'

export function Profile() {
	const { data, isLoading } = useProfile()

	return (
		<div>
			{isLoading ? (
				<div>Идет загрузка...</div>
			) : data ? (
				<>
					<h1>
						{data.first_name} {data.last_name}
					</h1>
					<p>
						{data.user_type === 'teacher'
							? `Преподаватель ${data.subject}`
							: 'Ученик'}
					</p>
					<h2>Возраст</h2>
					<p>{formatAge(data.age)}</p>
					<h2>Пол</h2>
					<p>{data.gender}</p>
					<h2>Город</h2>
					<p>{data.city}</p>
					<h2>Онлайн</h2>
					<p>{data.if_online}</p>
					{data.where_offline && <p>{data.where_offline}</p>}
					<h2>Образование</h2>
					<p>{data.status_education}</p>
					<h2>Где преподаю</h2>
					<p>{data.education_place}</p>
					{data.experience_years && (
						<>
							<h2>Стаж преподавания</h2>
							<p>{formatYears(data.experience_years)}</p>
						</>
					)}
					<h2>Опыт</h2>
					<p>{data.experience_text}</p>
					<h2>Обо мне</h2>
					<p>{data.about_me}</p>
					<>
						<h2>Стоимость одного занятия</h2>
						<p>
							{data.price_if_range === 'digit'
								? `${data.price_digit} рублей`
								: `${data.price_from} – ${data.price_to} рублей`}
						</p>
					</>
				</>
			) : (
				<div>Пользователь не найден</div>
			)}
		</div>
	)
}
