import { CreditCard, MessageCircle, Star, UserRound } from "lucide-react"
import { MenuItem } from "./menu-item"

export function Sidebar() {
	const menuItems = [
		{ icon: <UserRound />, label: "Профиль", href: "/dashboard" },
		{ icon: <MessageCircle />, label: "Cообщения", href: "/dashboard/chat" },
		{ icon: <Star />, label: "Отзывы", href: "/dashboard/reviews" },
		{ icon: <CreditCard />, label: "Подписки", href: "/dashboard/payment" },
	]

	return (
		<aside
			data-slot='sidebar'
			className='bg-brand-600 flex flex-col justify-between p-6 text-neutral-100'
		>
			<div className='-mx-2 flex flex-col gap-2'>
				{menuItems.map((item, idx) => (
					<MenuItem
						key={idx}
						{...item}
					/>
				))}
			</div>
		</aside>
	)
}
