"use client"

import { SquarePen } from "lucide-react"
import { useState } from "react"
import { useDashboard } from "@/hooks/useDashboard"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { AboutForm } from "./about-form"

export function AboutCard() {
	const [isOpen, setIsOpen] = useState(false)
	const { data } = useDashboard()

	if (!data) return null

	return (
		<div className='flex flex-col gap-3'>
			{/* <h2 className='text-lg font-semibold text-neutral-900 lg:text-xl'>
				О себе
			</h2> */}
			<div className='relative flex flex-col gap-3 rounded-lg bg-neutral-100 p-4 transition-all lg:p-6'>
				<Dialog
					open={isOpen}
					onOpenChange={setIsOpen}
				>
					<DialogTrigger asChild>
						<Button
							tabIndex={0}
							variant='ghost'
							size='icon'
							className='focus-visible:bg-brand-100 absolute top-2 right-2 size-10 cursor-pointer rounded-full lg:top-4 lg:right-4'
						>
							<SquarePen className='text-brand-600 hover:text-brand-700 size-6' />
						</Button>
					</DialogTrigger>
					<AboutForm
						data={data}
						onClose={() => setIsOpen(false)}
					/>
				</Dialog>
				<p className='pe-10 text-lg font-semibold text-neutral-900'>О себе</p>
				<p className='text-sm text-neutral-600'>
					{data.about ||
						"Расскажите о своих ценностях, индивидуальных особенностях и предпочтениях. Это поможет ученикам и родителям узнать вас получше. Не добавляйте сюда ссылки, контакты и цены на услуги."}
				</p>
			</div>
		</div>
	)
}
