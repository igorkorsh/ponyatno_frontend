"use client"

import { SquarePen } from "lucide-react"
import { useState } from "react"
import { useDashboard } from "@/hooks/useDashboard"
import { IsVerified } from "@/components/common/is-verified"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { calculateAge } from "@/utils/age"
import { AccountForm } from "./account-form"

export function AccountCard() {
	const [isOpen, setIsOpen] = useState(false)
	const { data } = useDashboard()

	if (!data) return null

	return (
		<div className='flex flex-col gap-3'>
			<h2 className='text-lg font-semibold text-neutral-900 lg:text-xl'>Личные данные</h2>
			<div className='relative flex items-center gap-4 rounded-lg bg-neutral-100 p-4 transition-all max-lg:flex-col lg:gap-[46px] lg:p-6'>
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
					<AccountForm
						data={data}
						onClose={() => setIsOpen(false)}
					/>
				</Dialog>
				<Avatar size='lg'>
					<AvatarImage src={data.avatar} />
					<AvatarFallback size='lg'>{data.firstName.charAt(0).toUpperCase() || data.username.charAt(0).toUpperCase()}</AvatarFallback>
					{data.isVerified && <IsVerified />}
				</Avatar>
				<div className='flex flex-col gap-4'>
					<div className='flex items-center gap-2 max-lg:flex-col lg:gap-4'>
						<p className='text-center text-xl font-semibold text-neutral-900 lg:text-2xl'>{data.firstName || data.username}</p>
						<p className='text-base text-neutral-900 lg:mb-[6px] lg:self-end'>{calculateAge(data.birthDate)}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
