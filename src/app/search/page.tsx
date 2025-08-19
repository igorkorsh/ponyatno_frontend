"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { IProfile } from "@/types/profile.interface"
import { profileService } from "@/services/profile.service"
import { SearchItem } from "@/components/search/search-item"

export default function SearchPage() {
	const searchParams = useSearchParams()
	const [teachers, setTeachers] = useState<IProfile[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const subject = searchParams.get("subject")

	useEffect(() => {
		const fetchTeachers = async () => {
			if (!subject) {
				setTeachers([])
				return
			}

			setLoading(true)
			setError(null)

			try {
				const data = await profileService.search(subject)
				setTeachers(data)
			} catch (err) {
				setError("Ошибка при загрузке результатов поиска")
				console.error("Search error:", err)
			} finally {
				setLoading(false)
			}
		}

		fetchTeachers()
	}, [subject])

	return (
		<div className='mx-auto max-w-[1200px] space-y-6 p-4'>
			<div className='space-y-4'>
				{loading && (
					<div className='py-8 text-center'>
						<div className='border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2'></div>
						<p className='text-muted-foreground mt-2'>Загрузка результатов...</p>
					</div>
				)}

				{error && (
					<div className='py-8 text-center'>
						<p className='text-destructive'>{error}</p>
					</div>
				)}

				{!loading && !error && !subject && (
					<div className='py-8 text-center'>
						<p className='text-muted-foreground'>Выберите предмет для поиска преподавателей</p>
					</div>
				)}

				{!loading && !error && subject && teachers.length === 0 && (
					<div className='py-8 text-center'>
						<p className='text-muted-foreground'>По вашему запросу ничего не найдено</p>
					</div>
				)}

				{!loading && !error && teachers.length > 0 && (
					<div className='space-y-4'>
						<p className='text-muted-foreground text-sm'>Найдено преподавателей: {teachers.length}</p>
						{teachers.map((teacher, idx) => (
							<SearchItem
								key={idx}
								data={teacher}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
