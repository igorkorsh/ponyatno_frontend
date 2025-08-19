import { z } from "zod"
import { SUBJECTS } from "@/constants/subject.constants"

export const FilterSchema = z.object({
	subject: z.enum(Object.keys(SUBJECTS)),
})

export type FilterFormValues = z.infer<typeof FilterSchema>
