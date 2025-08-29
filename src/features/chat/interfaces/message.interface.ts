export interface IMessageResponse {
	messages: IMessage[]
	nextCursor: string
	hasMore: boolean
}

export interface IMessage {
	id: string
	user: {
		name: string
		avatar: string
	}
	text: string
	type: "TEXT" | "REQUEST"
	isRead: boolean
	isUpdated: boolean
	createdAt: string
	updatedAt: string
}
