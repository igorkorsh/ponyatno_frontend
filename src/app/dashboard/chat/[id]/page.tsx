"use client"

import { useParams } from "next/navigation"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { ChatList } from "@/features/chat/components/chat-list"
import { MessageInput } from "@/features/chat/components/message-input"
import { MessageList } from "@/features/chat/components/message-list"
import { useChatStore } from "@/features/chat/store/chat.store"

export default function ChatPage() {
	const { id } = useParams()
	const { socket } = useChatStore()

	return (
		<div className='grid h-svh grid-cols-[24rem_1fr] gap-4 p-4 lg:gap-6 lg:p-6'>
			<ChatList />
			<div className='grid grid-rows-[1fr_auto]'>
				<ScrollArea>
					<MessageList />
				</ScrollArea>
				<MessageInput />
			</div>
		</div>
	)
}
