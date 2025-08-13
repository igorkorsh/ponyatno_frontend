"use client"

import { CreditCard, LogOut, MessageCircle, Star, UserRound } from "lucide-react"
import { useRouter } from "next/navigation"
import { authService } from "@/services/auth.service"
import { useDashboard } from "@/hooks/useDashboard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import MenuItem from "./MenuItem"

export default function Sidebar() {
	const { data } = useDashboard()
	const { push } = useRouter()

	const handleLogout = async () => {
		await authService.logout()
		push("/login")
	}

	const menuItems = [
		{ icon: <UserRound />, label: "Профиль", href: "/dashboard" },
		{ icon: <MessageCircle />, label: "Cообщения", href: "/dashboard/chats" },
		{ icon: <Star />, label: "Отзывы", href: "/dashboard/reviews" },
		{ icon: <CreditCard />, label: "Подписки", href: "/dashboard/payment" },
	]

	return (
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
						<AvatarFallback size='sm'>{data?.firstName.charAt(0).toUpperCase() || data?.username.charAt(0).toUpperCase()}</AvatarFallback>
					</Avatar>
					<div className='flex flex-col gap-1'>
						{data?.firstName && <p className='text-base font-semibold text-neutral-100'>{data.firstName.split(" ")[0]}</p>}
						<p className='text-xs text-neutral-100'>{data?.username}</p>
					</div>
				</div>
				<Button
					className='size-10 !text-neutral-100 focus-visible:bg-neutral-100/20'
					onClick={handleLogout}
				>
					<LogOut />
				</Button>
			</div>
		</div>
	)
}
