import { IProfile } from "@/types/profile.interface"
import { axiosInstance, axiosWithAuth } from "@/api/interceptors"

export const profileService = {
	async getMyProfile() {
		const response = await axiosWithAuth.get<IProfile>("/profile/@me")
		return response.data
	},

	async updateMyProfile(data: Partial<IProfile>) {
		await axiosWithAuth.patch("/profile/@me", data)
	},

	async getProfile(username: string) {
		const response = await axiosInstance.get<IProfile>(`/profile/${username}`)
		return response.data
	},

	async search(subject: string) {
		const response = await axiosInstance.get("/search", {
			params: { subject },
		})
		return response.data
	},
}
