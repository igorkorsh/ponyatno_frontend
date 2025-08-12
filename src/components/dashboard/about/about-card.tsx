"use client"

import { SquarePen } from "lucide-react"
import { useState } from "react"
import { useProfile } from "@/hooks/useProfile"
import { Button } from "@/components/ui/Button"
import { Dialog, DialogTrigger } from "@/components/ui/Dialog"
import AboutForm from "./about-form"

export default function AboutCard() {
	const [isOpen, setIsOpen] = useState(false)

	const { data, isLoading } = useProfile()

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className='flex flex-col gap-3'>
			<h2 className='text-lg font-semibold text-neutral-900 md:text-xl'>
				О себе
			</h2>
			<div className='relative ms-2 flex flex-col gap-3 rounded-lg bg-neutral-100 p-4 transition-all lg:p-6'>
				<Dialog
					open={isOpen}
					onOpenChange={setIsOpen}
				>
					<DialogTrigger asChild>
						<Button
							tabIndex={0}
							variant='icon'
							className='absolute top-2 right-2 size-10 lg:top-4'
						>
							<SquarePen />
						</Button>
					</DialogTrigger>
					<AboutForm onClose={() => setIsOpen(false)} />
				</Dialog>
				<p className='pe-10 text-lg font-semibold text-neutral-900'>О себе</p>
				<p className='text-sm text-neutral-600'>
					{data.about ??
						"Расскажите о своих ценностях, индивидуальных особенностях и предпочтениях. Это поможет ученикам и родителям узнать вас получше. Не добавляйте сюда ссылки, контакты и цены на услуги."}
				</p>
			</div>
		</div>
	)
}
