import axios, { type CreateAxiosDefaults } from "axios"
import { authService } from "@/services/auth.service"
import { jwtService } from "@/services/jwt.service"

const options: CreateAxiosDefaults = {
	baseURL: "http://localhost:3000",
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
}

const axiosInstance = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use((config) => {
	const accessToken = jwtService.getAccessToken()

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
				jwtService.removeTokens()
				console.error(error)
			}
		}

		throw error
	},
)

export { axiosInstance, axiosWithAuth }
