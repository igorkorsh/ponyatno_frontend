import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@ui/form"
import { Textarea } from "@ui/textarea"
import { useCurrentProfile } from "../hooks/useCurrentProfile"
import { type AboutFormValues, aboutSchema } from "../schemas/about.schema"

export function AboutForm({ onClose }: { onClose: () => void }) {
	const { data, update, isPending } = useCurrentProfile()

	if (!data || data.role !== "TEACHER") return null

	const form = useForm<AboutFormValues>({
		resolver: zodResolver(aboutSchema),
		values: {
			about: data.about,
		},
	})

	const onSubmit = (data: AboutFormValues) => {
		update(data)
		onClose?.()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-4 lg:gap-6'
			>
				<FormField
					control={form.control}
					name='about'
					render={({ field }) => (
						<FormItem>
							<FormDescription>
								Расскажите о своих ценностях, индивидуальных особенностях и
								предпочтениях. Это поможет ученикам и родителям узнать вас
								получше. Не добавляйте сюда ссылки, контакты и цены на услуги.
							</FormDescription>
							<FormControl>
								<Textarea {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					size='lg'
					type='submit'
					disabled={isPending}
				>
					Сохранить изменения
				</Button>
			</form>
		</Form>
	)
}
