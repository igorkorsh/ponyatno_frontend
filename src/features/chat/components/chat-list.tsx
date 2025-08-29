import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { useChatStore } from "../store/chat.store"
import { ChatItem } from "./chat-item"

export function ChatList() {
	const { chats } = useChatStore()

	return (
		<Card className='!p-0'>
			<CardHeader className='p-4'>
				<CardTitle>Сообщения</CardTitle>
			</CardHeader>
			<CardContent className='grid h-full grid-rows-[auto_1fr] gap-4'>
				<div className='px-4'>
					<Input placeholder='Поиск' />
				</div>
				<ScrollArea className='overflow-y-auto'>
					{chats.length > 0 &&
						chats.map((chat) => (
							<ChatItem
								key={chat.id}
								{...chat}
							/>
						))}
				</ScrollArea>
			</CardContent>
		</Card>
	)
}
