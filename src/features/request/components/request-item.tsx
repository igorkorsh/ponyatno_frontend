import { Ellipsis } from "lucide-react"
import type { PropsWithChildren } from "react"
import type { ItemProps } from "@/shared/types/ui.types"
import { Button } from "@/shared/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { cn } from "@/shared/utils/cn"

export function RequestItem({
	children,
	actions,
	className,
}: PropsWithChildren<ItemProps>) {
	return (
		<div
			className={cn(
				"group flex justify-between gap-4 rounded-xs p-2 pe-0 transition-colors outline-none hover:bg-neutral-200",
				className,
			)}
		>
			<div className='flex -translate-x-2 flex-col gap-2 transition-transform group-hover:translate-x-0'>
				{children}
			</div>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						size='icon'
						className='-translate-y-2.5'
					>
						<Ellipsis />
						<span className='sr-only'>Открыть меню</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					{actions.map(({ icon, label, callback }, index) => (
						<DropdownMenuItem
							key={index}
							className='flex justify-between gap-4'
							onClick={callback}
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
