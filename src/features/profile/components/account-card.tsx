import dayjs from "dayjs"
import { SquarePen } from "lucide-react"
import { useMemo, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar"
import { Button } from "@ui/button"
import { Card, CardAction, CardContent, CardHeader } from "@ui/card"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/dialog"
import { AccountForm } from "../forms/account-form"
import { useCurrentProfile } from "../hooks/useCurrentProfile"

const AGE_PLURAL_RULES = new Map([
	["one", "год"],
	["few", "года"],
	["many", "лет"],
	["other", "лет"],
])

const calculateAge = (birthDate: Date | null) => {
	if (!birthDate) return ""
	const date = dayjs(birthDate)
	const years = dayjs().diff(date, "year")
	const plural = new Intl.PluralRules("ru-RU", { type: "cardinal" })
	const rule = plural.select(years)

	return `${years} ${AGE_PLURAL_RULES.get(rule)}`
}

export function AccountCard() {
	const [isOpen, setIsOpen] = useState(false)
	const { data } = useCurrentProfile()

	const age = useMemo(() => {
		return calculateAge(data?.birthDate)
	}, [data])

	if (!data) return null

	return (
		<Card>
			<CardContent>
				<CardHeader>
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
									<DialogTitle>Личные данные</DialogTitle>
								</DialogHeader>
								<AccountForm onClose={() => setIsOpen(false)} />
							</DialogContent>
						</Dialog>
					</CardAction>
				</CardHeader>
				<div className='flex items-center gap-4 max-lg:flex-col lg:gap-[46px]'>
					<Avatar size='lg'>
						<AvatarImage src={data.avatar} />
						<AvatarFallback>{data.firstName.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className='flex items-center gap-2 max-lg:flex-col lg:gap-4'>
						<p className='text-center text-xl font-semibold lg:text-2xl'>
							{data.firstName}
						</p>
						{data.birthDate && (
							<p className='text-base lg:mb-1.5 lg:self-end'>{age}</p>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
