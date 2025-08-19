import { axiosWithAuth } from "@/api/interceptors"

export const chatService = {
	async getInfo(id: string) {
		const response = await axiosWithAuth.get(`/chat/${id}`)
		return response.data
	},
}
