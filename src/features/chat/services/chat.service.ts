import { axiosWithAuth } from "@api/interceptors"
import { IMessageResponse } from "../interfaces/message.interface"

class ChatService {
	private BASE_URL = "/chat"

	/**
	 * @description Получает сообщения в чате
	 * @param roomId - Уникальный идентификатор чата
	 * @param cursor - Дата последнего сообщения
	 * @returns IMessageResponse[]
	 */
	async getMessages({ roomId, cursor }: { roomId: string; cursor?: string }) {
		const response = await axiosWithAuth.get<IMessageResponse>(
			`${this.BASE_URL}/${roomId}/messages`,
			{
				params: {
					cursor: cursor ?? undefined,
				},
			},
		)

		return response.data
	}

	/**
	 * @description Обновляет статус чата
	 * @param roomId - Уникальный идентификатор чата
	 * @param status - Статус чата
	 */
	async updateStatus({
		roomId,
		status,
	}: {
		roomId: string
		status: "ACCEPTED" | "REJECTED"
	}) {
		await axiosWithAuth.patch(`${this.BASE_URL}/${roomId}/status`, { status })
	}
}

export const chatService = new ChatService()
