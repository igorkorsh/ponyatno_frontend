"use client"

import {
	CreditCard,
	LogOut,
	MessageCircle,
	Star,
	UserRound,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth.service"
import { useProfile } from "@/hooks/useProfile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import MenuItem from "./MenuItem"

export default function Sidebar() {
	const { data, isLoading } = useProfile()
	const { push } = useRouter()

	const handleLogout = async () => {
		await authService.logout()
		push("/login")
	}

	const menuItems = [
		{ icon: <UserRound />, label: "Профиль", href: "/" },
		{ icon: <MessageCircle />, label: "Cообщения", href: "/" },
		{ icon: <Star />, label: "Отзывы", href: "/" },
		{ icon: <CreditCard />, label: "Подписки", href: "/" },
	]

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className='bg-brand-600 flex flex-col justify-between p-6 text-neutral-100'>
			<div className='-mx-2 flex flex-col gap-2'>
				{menuItems.map(({ icon, label, href }) => (
					<MenuItem
						key={label}
						icon={icon}
						label={label}
						href={href}
					/>
				))}
			</div>
			<div className='flex justify-between gap-2'>
				<div className='flex items-center gap-2'>
					<Avatar size='sm'>
						<AvatarImage />
						<AvatarFallback size='sm'>{data.firstName[0]}</AvatarFallback>
					</Avatar>
					<div className='flex flex-col gap-1'>
						<p className='text-base font-semibold text-neutral-100'>
							{data.firstName.split(" ")[0]}
						</p>
						<p className='text-xs text-neutral-100'>{data.username}</p>
					</div>
				</div>
				<Button
					variant='icon'
					className='size-10 !text-neutral-100 focus-visible:bg-neutral-100/20'
					onClick={handleLogout}
				>
					<LogOut />
				</Button>
			</div>
		</div>
	)
}
