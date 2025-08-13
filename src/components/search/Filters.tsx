"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import z from "zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/Form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/Select"
import { SUBJECTS } from "@/constants/subject.constants"

export default function Filters() {
	const { push } = useRouter()
	const searchParams = useSearchParams()

	const form = useForm({
		resolver: zodResolver(
			z.object({
				subject: z.string(),
			}),
		),
		defaultValues: {
			subject: searchParams.get("subject") || "",
		},
	})

	// Синхронизация с URL при изменении формы
	const onSubmit = (data: { subject: string }) => {
		const params = new URLSearchParams(searchParams.toString())

		if (data.subject) {
			params.set("subject", data.subject)
		} else {
			params.delete("subject")
		}

		push(`/search?${params.toString()}`)
	}

	useEffect(() => {
		const subjectFromUrl = searchParams.get("subject")
		if (subjectFromUrl !== form.getValues("subject")) {
			form.setValue("subject", subjectFromUrl || "")
		}
	}, [searchParams, form])

	return (
		<div className='rounded-lg bg-neutral-100 p-4 transition-all lg:p-6'>
			<Form {...form}>
				<form onChange={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='subject'
						render={({ field: { value, onChange } }) => (
							<FormItem>
								<FormLabel>
									Предмет<span className='text-danger'>*</span>
								</FormLabel>
								<Select
									value={value}
									onValueChange={onChange}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Выберите предмет' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{Object.entries(SUBJECTS).map(([value, label]) => (
											<SelectItem
												key={value}
												value={value.toUpperCase()}
											>
												{label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	)
}
