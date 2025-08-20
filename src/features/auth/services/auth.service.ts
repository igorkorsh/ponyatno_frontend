import { axiosInstance } from "@api/interceptors"
import Cookies from "js-cookie"
import { parseJwtLifetime } from "@/shared/utils/parse-jwt-lifetime"
import { IAuthResponse } from "../interfaces/auth.interface"
import type { LoginFormValues } from "../schemas/login.schema"
import type { RegisterFormValues } from "../schemas/register.schema"

class AuthService {
	private BASE_URL = "/auth"

	/**
	 * @description Авторизует пользователя
	 * @param data - Данные для авторизации
	 * @returns IAuthResponse
	 */
	async login(data: LoginFormValues) {
		const response = await axiosInstance.post<IAuthResponse>(
			`${this.BASE_URL}/login`,
			data,
		)

		if (response.data) {
			this.setAccessToken(response.data.accessToken)
		}

		return response.data
	}

	/**
	 * @description Регистрирует нового пользователя
	 * @param data - Данные для регистрации
	 * @returns IAuthResponse
	 */
	async register(data: RegisterFormValues) {
		const response = await axiosInstance.post<IAuthResponse>(
			`${this.BASE_URL}/create`,
			data,
		)

		if (response.data) {
			this.setAccessToken(response.data.accessToken)
		}

		return response.data
	}

	/**
	 * @description Обновляет токен доступа
	 * @returns IAuthResponse
	 */
	async refresh() {
		const response = await axiosInstance.post<IAuthResponse>(
			`${this.BASE_URL}/refresh`,
		)

		if (response.data) {
			this.setAccessToken(response.data.accessToken)
		}

		return response.data
	}

	/**
	 * @description Выходит из системы
	 * @returns boolean
	 */
	async logout() {
		const response = await axiosInstance.post<boolean>(
			`${this.BASE_URL}/logout`,
		)

		this.removeTokens()

		return response.data
	}

	/**
	 * @description Получает токен доступа
	 * @returns string | null
	 */
	getAccessToken(): string | null {
		return Cookies.get("accessToken") || null
	}

	/**
	 * @description Записывает токен доступа в cookies
	 * @param token - Токен доступа
	 */
	setAccessToken(token: string) {
		Cookies.set("accessToken", token, {
			expires: parseJwtLifetime("15m"),
		})
	}

	/**
	 * @description Удаляет токены из cookies
	 */
	removeTokens() {
		Cookies.remove("accessToken")
		Cookies.remove("refreshToken")
	}
}

export const authService = new AuthService()
