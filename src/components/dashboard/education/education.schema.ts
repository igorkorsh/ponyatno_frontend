import { z } from "zod"
import { DEGREES } from "@/constants/education.constants"

export const EducationSchema = z.object({
	degree: z.enum(Object.keys(DEGREES), {
		message: "Обязательное поле",
	}),
	institution: z.string().min(1, "Укажите название учебного заведения"),
	speciality: z.string().min(1, "Укажите специальность"),
	startDate: z.number().nullable(),
	endDate: z.number().nullable(),
})

export type EducationFormValues = z.infer<typeof EducationSchema>
