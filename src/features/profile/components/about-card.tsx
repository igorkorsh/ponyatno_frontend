import { SquarePen } from "lucide-react"
import { useState } from "react"
import { Button } from "@ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@ui/card"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/dialog"
import { AboutForm } from "../forms/about-form"
import { useCurrentProfile } from "../hooks/useCurrentProfile"

export function AboutCard() {
	const [isOpen, setIsOpen] = useState(false)
	const { data } = useCurrentProfile()

	if (!data) return null

	return (
		<Card>
			<CardContent>
				<CardHeader>
					<CardTitle>О себе</CardTitle>
					<CardAction>
						<Dialog
							open={isOpen}
							onOpenChange={setIsOpen}
						>
							<DialogTrigger asChild>
								<Button
									variant='ghost'
									size='icon'
									className='text-brand-600 hover:text-brand-700 translate-x-2 -translate-y-2'
								>
									<SquarePen className='size-6' />
								</Button>
							</DialogTrigger>
							<DialogContent aria-describedby=''>
								<DialogHeader>
									<DialogTitle>О себе</DialogTitle>
								</DialogHeader>
								<AboutForm onClose={() => setIsOpen(false)} />
							</DialogContent>
						</Dialog>
					</CardAction>
				</CardHeader>
				<p className='text-sm text-neutral-600'>
					{data.about ||
						"Расскажите о своих ценностях, индивидуальных особенностях и предпочтениях. Это поможет ученикам и родителям узнать вас получше. Не добавляйте сюда ссылки, контакты и цены на услуги."}
				</p>
			</CardContent>
		</Card>
	)
}
