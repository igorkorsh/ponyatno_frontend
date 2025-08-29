// export interface IChatRequest {
// 	userId: string
// 	requestId: string
// }

export interface IChatResponse {
	id: string
	status: "PENDING" | "APPROVED" | "REJECTED"
	lastMessage: {
		text: string
		createdAt: string
	}
	user: {
		firstName: string
		avatar: string
	}
}

export interface IMessageResponse {
	id: string
	text: string
	type: "TEXT" | "REQUEST"
	isRead: boolean
	isUpdated: boolean
	createdAt: string
	updatedAt: string
}
