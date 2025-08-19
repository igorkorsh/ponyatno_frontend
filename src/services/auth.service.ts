import { IAuthResponse, ILoginForm, IRegisterForm } from "@/types/auth.interface"
import { axiosInstance } from "@/api/interceptors"
import { jwtService } from "./jwt.service"

export const authService = {
	async login(data: ILoginForm): Promise<IAuthResponse> {
		const response = await axiosInstance.post<IAuthResponse>("/auth/login", data)

		if (response.data.accessToken) {
			jwtService.setAccessToken(response.data.accessToken)
		}

		return response.data
	},

	async register(data: IRegisterForm): Promise<IAuthResponse> {
		const response = await axiosInstance.post<IAuthResponse>("/auth/register", data)

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
