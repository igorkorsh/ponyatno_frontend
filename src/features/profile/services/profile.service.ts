import { axiosWithAuth } from "@api/interceptors"
import type { AboutFormValues } from "../schemas/about.schema"
import type { AccountFormValues } from "../schemas/account.schema"

class ProfileService {
	private BASE_URL = "profile"

	/**
	 * @description Получает профиль текущего пользователя
	 * @returns CurrentProfile
	 */
	async getCurrentProfile() {
		const response = await axiosWithAuth.get(`${this.BASE_URL}/@me`)

		return response.data
	}

	/**
	 * @description Обновляет профиль текущего пользователя
	 * @param data - Данные для обновления
	 */
	async updateProfile(data: AccountFormValues | AboutFormValues) {
		await axiosWithAuth.patch(`${this.BASE_URL}/@me`, data)
	}
}

export const profileService = new ProfileService()
