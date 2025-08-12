import z from "zod"
import { GOALS, SUBJECTS } from "@/constants/subject.constants"

export const SubjectSchema = z.object({
	name: z.enum(Object.keys(SUBJECTS), {
		message: "Укажите предмет",
	}),
	goals: z.array(z.enum(Object.keys(GOALS)), {
		message: "Укажите цель",
	}),
	disabilities: z.boolean({
		message: "Укажите, работаете ли вы с учениками с ОВЗ",
	}),
})

export type Subject = z.infer<typeof SubjectSchema>
