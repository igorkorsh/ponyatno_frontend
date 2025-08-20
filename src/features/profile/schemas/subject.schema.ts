// import { z } from "zod"
// import { GOALS, SUBJECTS } from "../constants/subject.constants"

// export const SubjectSchema = z.object({
// 	name: z.enum(Object.keys(SUBJECTS) as Array<keyof typeof SUBJECTS>),
// 	isFixedPrice: z.boolean(),
// 	minPrice: z
// 		.int("Минимальная цена должна быть целым числом")
// 		.min(0, "Цена не может быть отрицательной")
// 		.max(20000, "Слишком большая цена"),
// 	maxPrice: z
// 		.int("Максимальная цена должна быть целым числом")
// 		.min(0, "Цена не может быть отрицательной")
// 		.max(20000, "Слишком большая цена"),
// 	goals: z.array(z.enum(Object.keys(GOALS) as Array<keyof typeof GOALS>)),
// 	disabilities: z.boolean(),
// 	isArchived: z.boolean(),
// })

// const SubjectSchemaWithId = SubjectSchema.extend({
// 	id: z.string(),
// })

// export type SubjectFormValues = z.infer<typeof SubjectSchema>
// export type Subject = z.infer<typeof SubjectSchemaWithId>
