import { axiosWithAuth } from "@api/interceptors"
import type { Subject, SubjectFormValues } from "../schemas/subject.schema"

class SubjectService {
	private BASE_URL = "subject"

	/**
	 * @description Получает предмет по ID
	 * @param id - ID предмета
	 * @returns Subject
	 */
	async findById(id: string) {
		const response = await axiosWithAuth.get<Subject>(`${this.BASE_URL}/${id}`)

		return response.data
	}

	/**
	 * @description Получает все предметы
	 * @returns Subject[]
	 */
	async findAll() {
		const response = await axiosWithAuth.get<Subject[]>(this.BASE_URL)

		return response.data
	}

	/**
	 * @description Создает предмет
	 * @param subject - SubjectFormValues
	 * @returns Subject
	 */
	async create(subject: SubjectFormValues) {
		await axiosWithAuth.post<Subject>(this.BASE_URL, subject)
	}

	/**
	 * @description Редактирует предмет
	 * @param id - ID предмета
	 * @param subject - SubjectFormValues
	 * @returns Subject
	 */
	async update(id: string, subject: SubjectFormValues) {
		await axiosWithAuth.patch<Subject>(`${this.BASE_URL}/${id}`, subject)
	}

	/**
	 * @description Удаляет предмет
	 * @param id - ID предмета
	 */
	async remove(id: string) {
		await axiosWithAuth.delete(`${this.BASE_URL}/${id}`)
	}
}

export const subjectService = new SubjectService()
