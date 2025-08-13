import { z } from "zod"
import { GOALS, GRADES, SUBJECTS } from "@/constants/subject.constants"

export const SubjectSchema = z
	.object({
		name: z.enum(Object.keys(SUBJECTS)),
		grades: z.array(z.enum(Object.keys(GRADES))),
		isFixedPrice: z.boolean(),
		minPrice: z.number().int().min(0).max(20000),
		maxPrice: z.number().int().min(0).max(20000),
		goals: z.array(z.enum(Object.keys(GOALS))),
		disabilities: z.boolean(),
		isArchived: z.boolean(),
	})
	.refine(({ isFixedPrice, minPrice, maxPrice }) => (isFixedPrice ? minPrice === maxPrice : minPrice <= maxPrice), {
		message: "Минимальная цена не может быть больше максимальной",
		path: ["minPrice", "maxPrice"],
	})

export type SubjectFormValues = z.infer<typeof SubjectSchema>
