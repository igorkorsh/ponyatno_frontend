import { TypeClientProfile } from '@/types/client.types'

import { axiosWithAuth } from '@/api/instance'

class ClientService {
	private BASE_URL = '/profile'

	async getProfile() {
		const response = await axiosWithAuth.get<TypeClientProfile>(this.BASE_URL)
		return response.data
	}

	// async update(data: any) {
	// 	const response = await axiosWithAuth.put(`${this.BASE_URL}/${username}`, data)
	// 	return response.data
	// }
}

export const clientService = new ClientService()
