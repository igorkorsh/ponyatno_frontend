"use client"

import { useParams } from "next/navigation"
import { ChatList } from "@/features/chat/components/chat-list"
import { MessageInput } from "@/features/chat/components/message-input"
import { MessageList } from "@/features/chat/components/message-list"
import { useSocket } from "@/features/chat/providers/socket.provider"

export default function ChatPage() {
	const { id } = useParams()
	const { socket, isConnected } = useSocket()

	return (
		<div className='grid h-svh grid-cols-[24rem_1fr] gap-4 p-4 lg:gap-6 lg:p-6'>
			<ChatList />
			<div>
				<p>
					ChatPage: {id} {socket?.id} {isConnected}
				</p>
				<MessageList />
				<MessageInput />
			</div>
		</div>
	)
}
