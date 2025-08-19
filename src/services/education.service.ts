import { IEducation } from "@/types/dashboard.interface"
import { axiosWithAuth } from "@/api/interceptors"

export const educationService = {
	async getById(id: string) {
		const response = await axiosWithAuth.get<IEducation>(`/education/${id}`)

		return response.data
	},

	async getAll() {
		const response = await axiosWithAuth.get<IEducation[]>("/education")

		return response.data
	},

	async create(education: Partial<IEducation>) {
		await axiosWithAuth.post<IEducation>("/education", education)
	},

	async update(id: string, education: Partial<IEducation>) {
		await axiosWithAuth.patch(`/education/${id}`, education)
	},

	async delete(id: string) {
		await axiosWithAuth.delete(`/education/${id}`)
	},
}
