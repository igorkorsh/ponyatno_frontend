import { TypeUserProfile } from '@/types/user.types'

import { axiosWithAuth } from '@/api/instance'

class UserService {
	private BASE_URL = '/profile'

	async getProfile() {
		const response = await axiosWithAuth.get<TypeUserProfile>(this.BASE_URL)
		return response.data
	}

	// async update(data: any) {
	// 	const response = await axiosWithAuth.put(`${this.BASE_URL}/${username}`, data)
	// 	return response.data
	// }
}

export const userService = new UserService()
