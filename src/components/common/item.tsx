import { Archive, ArchiveRestore, Ellipsis, Pencil, Trash } from "lucide-react"
import { type PropsWithChildren } from "react"
import { cn } from "@/utils/cn"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"

interface IItemProps {
	id: string
	isArchived?: boolean
	className?: string
	onUpdate?: (id: string) => void
	onArchive?: (id: string) => void
	onDelete?: (id: string) => void
}

export function Item({ children, id, isArchived, className, onUpdate, onArchive, onDelete }: PropsWithChildren<IItemProps>) {
	const hasActions = onUpdate || onArchive || onDelete

	return (
		<div
			className={cn(
				"group relative flex flex-col justify-between overflow-hidden rounded-xs bg-neutral-100 p-2 transition-colors outline-none hover:bg-neutral-200 focus-visible:bg-neutral-200",
				className,
			)}
			tabIndex={0}
		>
			<div className='flex max-w-[calc(100%-24px)] -translate-x-2 flex-col gap-1 transition-transform group-hover:translate-x-0 group-focus-visible:translate-x-0'>
				{children}
			</div>
			{hasActions && (
				<DropdownMenu modal={false}>
					<DropdownMenuTrigger asChild>
						<Ellipsis className='absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100' />
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{onUpdate && (
							<DropdownMenuItem onClick={() => onUpdate(id)}>
								<Pencil />
								Изменить
							</DropdownMenuItem>
						)}
						{onArchive && (
							<DropdownMenuItem onClick={() => onArchive(id)}>
								{isArchived ? <ArchiveRestore /> : <Archive />}
								{isArchived ? "Восстановить" : "Архивировать"}
							</DropdownMenuItem>
						)}
						{onDelete && (
							<DropdownMenuItem onClick={() => onDelete(id)}>
								<Trash />
								Удалить
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</div>
	)
}
