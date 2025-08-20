import axios, { type CreateAxiosDefaults } from "axios"
import { authService } from "../../features/auth/services/auth.service"

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
}

const axiosInstance = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use((config) => {
	const accessToken = authService.getAccessToken()

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosWithAuth.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				await authService.refresh()
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				authService.removeTokens()
				console.error(error)
			}
		}

		throw error
	},
)

export { axiosInstance, axiosWithAuth }
