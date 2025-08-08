import { IAuthResponse, ILoginForm } from "@/types/auth.interfaces"
import { axiosInstance } from "@/api/interceptors"
import { jwtService } from "./jwt.service"

export const authService = {
	async login(data: ILoginForm) {
		const response = await axiosInstance.post<IAuthResponse>(
			"/auth/login",
			data,
		)

		if (response.data.accessToken) {
			jwtService.setAccessToken(response.data.accessToken)
		}

		return response.data
	},

	async refresh() {
		const response = await axiosInstance.post<IAuthResponse>("/auth/refresh")

		if (response.data.accessToken) {
			jwtService.setAccessToken(response.data.accessToken)
		}

		return response.data
	},

	async logout() {
		const response = await axiosInstance.post<boolean>("/auth/logout")

		if (response.data) {
			jwtService.removeTokens()
		}

		return response.data
	},
}
