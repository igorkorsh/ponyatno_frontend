import { IExperience } from "@/types/dashboard.interface"
import { axiosWithAuth } from "@/api/interceptors"

export const experienceService = {
	async getById(id: string) {
		const response = await axiosWithAuth.get<IExperience>(`/experience/${id}`)

		return response.data
	},

	async getAll() {
		const response = await axiosWithAuth.get<IExperience[]>("/experience")

		return response.data
	},

	async create(experience: Partial<IExperience>) {
		await axiosWithAuth.post<IExperience>("/experience", experience)
	},

	async update(id: string, experience: Partial<IExperience>) {
		await axiosWithAuth.patch(`/experience/${id}`, experience)
	},

	async delete(id: string) {
		await axiosWithAuth.delete(`/experience/${id}`)
	},
}
