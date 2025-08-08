import { IProfile } from "@/types/profile.interfaces"
import { axiosWithAuth } from "@/api/interceptors"

export const profileService = {
	async me() {
		const response = await axiosWithAuth.get<IProfile>("/profile/@me")

		return response.data
	},
}
