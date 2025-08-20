"use client"

import { ChatList } from "@/features/chat/components/chat-list"

export default function ChatListPage() {
	return (
		<div className='grid h-svh grid-cols-[24rem_1fr] gap-4 p-4 lg:gap-6 lg:p-6'>
			<ChatList />
		</div>
	)
}
