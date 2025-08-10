import { IProfile } from "@/types/profile.interfaces"
import { axiosWithAuth } from "@/api/interceptors"

export const profileService = {
	async me() {
		const response = await axiosWithAuth.get<Profile>("/profile/@me")

		return response.data
	},

	async update(data: Partial<Profile>) {
		const response = await axiosWithAuth.patch<Profile>("/profile/@me", data)

		return response.data
	},
}
