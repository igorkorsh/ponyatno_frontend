import { Socket, io } from "socket.io-client"
import { create } from "zustand"
import { IChatResponse, IMessageResponse } from "../interfaces/chat.interface"
import { authService } from "@/features/auth/services/auth.service"

type ChatState = {
	socket: Socket | null
	chats: IChatResponse[]
	messages: IMessageResponse[]
	isConnected: boolean
}

type ChatActions = {
	connect: () => void
	disconnect: () => void
	setChats: (chats: IChatResponse[]) => void
	setMessages: (messages: IMessageResponse[]) => void
}

export const useChatStore = create<ChatState & ChatActions>()((set, get) => ({
	socket: null,
	chats: [],
	messages: [],
	isConnected: false,

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

			if (reason === "io server disconnect") {
				await authService.refresh()
				get().connect()
			}
		})

		socketInstance.on("session:init", (chats: IChatResponse[]) => {
			set({ chats })
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

	setMessages: (messages: IMessageResponse[]) => {
		set({ messages })
	},
}))
