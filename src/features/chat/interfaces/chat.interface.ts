export type ChatStatus = "PENDING" | "ACCEPTED" | "REJECTED"

export interface IChatResponse {
	id: string
	status: ChatStatus
	lastMessage: {
		text: string
		createdAt: string
	}
	user: {
		firstName: string
		avatar: string
	}
}
