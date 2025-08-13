import { IStudent, ITeacher } from "@/types/profile.types"
import { axiosInstance, axiosWithAuth } from "@/api/interceptors"

export const profileService = {
	async getMyProfile() {
		const response = await axiosWithAuth.get<ITeacher | IStudent>(
			"/profile/@me",
		)
		return response.data
	},

	async updateMyProfile(data: Partial<ITeacher | IStudent>) {
		await axiosWithAuth.patch("/profile/@me", data)
	},

	async getProfile(username: string) {
		const response = await axiosInstance.get<ITeacher | IStudent>(
			`/profile/${username}`,
		)
		return response.data
	},

	async search(subject: string) {
		const response = await axiosInstance.get("/teachers", {
			params: {
				subject,
			},
		})
		return response.data
	},
}
