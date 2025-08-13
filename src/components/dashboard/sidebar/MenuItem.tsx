import Link from "next/link"

interface MenuItemProps {
	icon: React.ReactNode
	label: string
	href: string
}

export default function MenuItem({ icon, label, href }: MenuItemProps) {
	return (
		<Link
			href={href}
			className='focus-visible:bg-brand-400 hover:bg-brand-400 flex items-center gap-3 rounded-md bg-transparent px-3 py-2.5 transition-colors outline-none'
		>
			{icon}
			<p className='text-base font-medium text-neutral-100'>{label}</p>
		</Link>
	)
}
