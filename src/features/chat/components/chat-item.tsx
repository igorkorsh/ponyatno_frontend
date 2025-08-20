import { CheckCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar"
import { IChat } from "../interfaces/chat.interface"

export function ChatItem({ id, status, messages }: IChat) {
	const { push } = useRouter()

	const handleClick = () => {
		push(`/dashboard/chat/${id}`)
	}

	return (
		<div
			className='flex items-center gap-2 border-b px-4 py-2.5 hover:bg-neutral-200'
			onClick={handleClick}
		>
			<Avatar>
				<AvatarImage src='https://github.com/shadcn.png' />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div className='grid w-full gap-2'>
				<div className='grid grid-cols-[1fr_auto] gap-2'>
					<p className='text-base font-semibold'>first_name</p>
					<p className='self-end text-sm text-neutral-600'>
						{new Date(messages[0]?.createdAt).toLocaleTimeString("ru-RU", {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</p>
				</div>
				<div className='relative flex gap-1'>
					<CheckCheck className='size-4 shrink-0 self-end' />
					<p className='line-clamp-1 pe-8 text-sm text-neutral-700'>
						{messages[0]?.text}
					</p>
					<div className='bg-brand-600 absolute end-0 -top-[3px] flex size-6 items-center justify-center rounded-full text-sm font-medium text-neutral-100'>
						0
					</div>
				</div>
			</div>
		</div>
	)
}
