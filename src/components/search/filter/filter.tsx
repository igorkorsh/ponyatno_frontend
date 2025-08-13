"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SUBJECTS } from "@/constants/subject.constants"
import { type FilterFormValues, FilterSchema } from "./filter.schema"

export function SearchFilter() {
	const { push } = useRouter()
	const searchParams = useSearchParams()

	const form = useForm({
		resolver: zodResolver(FilterSchema),
		defaultValues: {
			subject: searchParams.get("subject") || "",
		},
	})

	const onSubmit = (data: FilterFormValues) => {
		const params = new URLSearchParams(searchParams.toString())

		data.subject ? params.set("subject", data.subject) : params.delete("subject")

		push(`/search?${params.toString()}`, { scroll: false })
	}

	return (
		<Card className='border border-neutral-300'>
			<Form {...form}>
				<CardHeader>
					<CardTitle>Фильтры</CardTitle>
				</CardHeader>
				<CardContent>
					<form onChange={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name='subject'
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>Предмет</FormLabel>
									<Select
										value={value}
										onValueChange={onChange}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{Object.entries(SUBJECTS).map(([value, label]) => (
												<SelectItem
													key={value}
													value={value}
												>
													{label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='subject'
							render={({ field: { onChange, value } }) => (
								<FormItem>
									<FormLabel>
										Предмет
										<span className='text-danger'>*</span>
									</FormLabel>
								</FormItem>
							)}
						/>
					</form>
				</CardContent>
			</Form>
		</Card>
	)
}
