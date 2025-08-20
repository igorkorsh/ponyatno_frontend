import { Ellipsis } from "lucide-react"
import type { PropsWithChildren } from "react"
import { Button } from "@ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@ui/dropdown-menu"

export interface IAction {
	icon: React.ReactNode
	label: string
	fn: () => void
}

interface ICardItemProps {
	actions: IAction[]
}

export function CardItem({
	children,
	actions,
}: PropsWithChildren<ICardItemProps>) {
	return (
		<div className='group flex justify-between gap-4 rounded-xs p-2 pe-0 transition-colors outline-none hover:bg-neutral-200'>
			<div className='-translate-x-2 transition-transform group-hover:translate-x-0'>
				{children}
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button>
						<Ellipsis />
						<span className='sr-only'>Открыть меню</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					{actions.map(({ icon, label, fn }, idx) => (
						<DropdownMenuItem
							key={idx}
							className='flex justify-between gap-4'
							onClick={fn}
						>
							<span>{label}</span>
							{icon}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
