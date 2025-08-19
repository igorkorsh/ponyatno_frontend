export interface IChat {}

export interface IMessage {}

export interface IChatRequest {
	senderId: string
	receiverId: string
	message: string
}

export interface IMessageRequest {
	chatId: string
	senderId: string
	message: string
}
