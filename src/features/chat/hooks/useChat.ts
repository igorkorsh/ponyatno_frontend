"use client"

import { useEffect, useState } from "react"
import { IChat } from "../interfaces/chat.interface"
import { useSocket } from "../providers/socket.provider"

export const useChat = (): { chats: IChat[] } => {
	const { socket } = useSocket()
	const [chats, setChats] = useState<IChat[]>([])

	useEffect(() => {
		if (!socket) return

		socket.on("session:init", (chats: IChat[]) => {
			setChats(chats)
		})

		return () => {
			socket.off("session:init")
		}
	}, [socket])

	return { chats }
}
