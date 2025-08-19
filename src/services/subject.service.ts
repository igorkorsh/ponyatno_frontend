import { ISubject } from "@/types/dashboard.interface"
import { axiosWithAuth } from "@/api/interceptors"

export const subjectService = {
	async getById(id: string) {
		const response = await axiosWithAuth.get<ISubject>(`/subject/${id}`)

		return response.data
	},

	async getAll() {
		const response = await axiosWithAuth.get<ISubject[]>("/subject")

		return response.data
	},

	async create(subject: Partial<ISubject>) {
		await axiosWithAuth.post<ISubject>("/subject", subject)
	},

	async update(id: string, subject: Partial<ISubject>) {
		await axiosWithAuth.patch(`/subject/${id}`, subject)
	},

	async delete(id: string) {
		await axiosWithAuth.delete(`/subject/${id}`)
	},
}
