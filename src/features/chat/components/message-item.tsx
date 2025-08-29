import { cn } from "@/shared/utils/cn"
import { IMessage } from "../interfaces/message.interface"
import { RequestItem } from "./request-item"
import { useCurrentProfile } from "@/features/profile/hooks/useCurrentProfile"

export function MessageItem({ text, createdAt, user, type }: IMessage) {
	const { data } = useCurrentProfile()

	const isSender = data?.username === user.name

	if (type === "REQUEST") {
		return <RequestItem />
	}

	return (
		<div className={cn("flex items-end", isSender && "justify-end pr-4")}>
			<div
				className={cn(
					"flex w-fit max-w-[60%] flex-col items-end gap-1 rounded-md p-2 px-3",
					isSender
						? "bg-brand-600 self-end rounded-br-none text-neutral-100"
						: "self-start rounded-bl-none bg-neutral-100 text-neutral-800",
				)}
			>
				<p className='text-sm'>{text}</p>
				<p className='text-xs opacity-70'>
					{new Date(createdAt).toLocaleTimeString("ru-RU", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
			</div>
		</div>
	)
}
