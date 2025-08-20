import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { useChat } from "../hooks/useChat"
import { ChatItem } from "./chat-item"

export function ChatList() {
	const { chats } = useChat()

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
					{chats.map((chat) => (
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
