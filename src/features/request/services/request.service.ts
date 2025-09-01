import { axiosWithAuth } from "@/shared/api/interceptors"
import { IRequest } from "../interfaces/request.interface"
import type { CreateRequestFormValues } from "../schemas/request.schema"
import type { UpdateRequestFormValues } from "../schemas/update.schema"

class RequestService {
	protected readonly BASE_URL = "request"

	async findById(requestId: string) {
		const response = await axiosWithAuth.get<IRequest>(
			`${this.BASE_URL}/${requestId}`,
		)

		return response.data
	}

	async findAll() {
		const response = await axiosWithAuth.get<IRequest[]>(this.BASE_URL)

		return response.data
	}

	async create(data: CreateRequestFormValues) {
		const response = await axiosWithAuth.post<IRequest>(this.BASE_URL, data)

		return response.data
	}

	async update(requestId: string, data: Partial<UpdateRequestFormValues>) {
		return await axiosWithAuth.patch<IRequest>(
			`${this.BASE_URL}/${requestId}`,
			data,
		)
	}

	async delete(requestId: string) {
		return await axiosWithAuth.delete(`${this.BASE_URL}/${requestId}`)
	}
}

export const requestService = new RequestService()
