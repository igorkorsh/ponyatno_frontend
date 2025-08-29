import { Socket, io } from "socket.io-client"
import { create } from "zustand"
import { type ChatStatus, IChatResponse } from "../interfaces/chat.interface"
import { IMessage } from "../interfaces/message.interface"
import { chatService } from "../services/chat.service"
import { authService } from "@/features/auth/services/auth.service"

type ChatState = {
	socket: Socket | null
	chats: IChatResponse[]
	messages: IMessage[]
	isConnected: boolean
	hasMore: boolean
	nextCursor: string | null
}

type ChatActions = {
	connect: () => void
	disconnect: () => void
	setChats: (chats: IChatResponse[]) => void
	getStatus: (roomId: string) => ChatStatus
	loadMessages: (roomId: string, cursor?: string) => Promise<void>
	loadMoreMessages: (roomId: string) => Promise<void>
	sendMessage: (roomId: string, text: string) => void
	setMessages: (messages: IMessage[]) => void
}

export const useChatStore = create<ChatState & ChatActions>()((set, get) => ({
	socket: null,
	chats: [],
	messages: [],
	isConnected: false,
	hasMore: false,
	nextCursor: null,

	connect: () => {
		const { socket } = get()

		if (socket?.connected) return

		const accessToken = authService.getAccessToken()

		const socketInstance = io("http://localhost:3000", {
			transports: ["websocket"],
			withCredentials: true,
			reconnection: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 500,
			reconnectionDelayMax: 5000,
			auth: {
				token: accessToken,
			},
		})

		set({ socket: socketInstance })

		socketInstance.on("connect", () => {
			set({ isConnected: true })
		})

		socketInstance.on("disconnect", async (reason) => {
			set({ isConnected: false })

			// if (reason === "io server disconnect") {
			// 	await authService.refresh()
			// 	get().connect()
			// }
		})

		socketInstance.on("session:init", (chats: IChatResponse[]) => {
			set({ chats })
		})

		socketInstance.on("room:created", (chat: IChatResponse) => {
			const { chats } = get()

			set({
				chats: [...chats, chat],
			})
		})

		socketInstance.on("message:created", (message: IMessage) => {
			const { messages } = get()

			set({
				messages: [...messages, message],
			})
		})
	},

	disconnect: () => {
		const { socket } = get()
		socket?.disconnect()
		set({ socket: null, isConnected: false })
	},

	setChats: (chats: IChatResponse[]) => {
		set({ chats })
	},

	getStatus: (roomId: string) => {
		const { chats } = get()
		const currentChat = chats.find((chat) => chat.id === roomId)
		return currentChat?.status ?? "PENDING"
	},

	loadMessages: async (roomId: string, cursor?: string) => {
		const { messages, hasMore, nextCursor } = await chatService.getMessages({
			roomId,
			cursor,
		})

		if (cursor) {
			const { messages: currentMessages } = get()
			const currentIds = new Set(currentMessages.map((m) => m.id))
			const newMessages = messages.filter((m) => !currentIds.has(m.id))
			set({
				messages: [...newMessages, ...currentMessages],
				hasMore,
				nextCursor,
			})
		} else {
			set({
				messages,
				hasMore,
				nextCursor,
			})
		}
	},

	loadMoreMessages: async (roomId: string) => {
		const { nextCursor, hasMore } = get()

		if (nextCursor && hasMore) {
			await get().loadMessages(roomId, nextCursor)
		}
	},

	sendMessage: (roomId: string, text: string) => {
		const { socket } = get()
		socket?.emit("message:create", { roomId, text })
	},

	setMessages: (newMessages: IMessage[]) => {
		const { messages } = get()
		set({
			messages: [...messages, ...newMessages],
		})
	},
}))
