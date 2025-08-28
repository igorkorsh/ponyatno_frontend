import { Socket } from "socket.io-client"

export interface UseSocketReturn {
	socket: Socket | null
	isConnected: boolean
}

export interface UseChatReturn {
	chats: IChat[]
	createChat: (data: IChatRequest) => void
}

export interface IChat {
	id: string
	status: "PENDING" | "APPROVED" | "REJECTED"
	messages: {
		text: string
		isRead: boolean
		createdAt: string
	}[]
}

export interface IChatRequest {
	userId: string
	requestId: string
}
