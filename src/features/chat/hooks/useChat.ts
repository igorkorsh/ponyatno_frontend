"use client"

import { useCallback, useEffect, useState } from "react"
import {
	IChat,
	IChatRequest,
	UseChatReturn,
} from "../interfaces/chat.interface"
import { useSocket } from "../providers/socket.provider"

export const useChat = (): UseChatReturn => {
	const { socket } = useSocket()
	const [chats, setChats] = useState<IChat[]>([])

	const createChat = useCallback(
		async (data: IChatRequest) => {
			socket?.emit("create:room", data)
		},
		[socket],
	)

	useEffect(() => {
		if (!socket) return

		const handleSessionInit = (chats: IChat[]) => {
			setChats(chats)
		}

		const handleRoomCreated = ({ chat }: { chat: IChat }) => {
			setChats((prev) => [...prev, chat])
		}

		socket.on("session:init", handleSessionInit)
		socket.on("room:created", handleRoomCreated)

		return () => {
			socket.off("session:init", handleSessionInit)
			socket.off("room:created", handleRoomCreated)
		}
	}, [socket])

	return {
		chats,
		createChat,
	}
}
