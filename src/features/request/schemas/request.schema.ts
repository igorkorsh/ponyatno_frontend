import { z } from "zod"
import { GOALS } from "@/shared/constants/goal.constants"
import { SUBJECTS } from "@/shared/constants/subject.constants"
import { RequestStatus } from "../interfaces/request.interface"

export const requestSchema = z.object({
	subject: z.enum(Object.keys(SUBJECTS), { message: "Обязательное поле" }),
	grade: z.number({ message: "Обязательное поле" }).min(0).max(11),
	goals: z.array(z.enum(Object.keys(GOALS))),
	comment: z.optional(z.string().trim().max(2048)),
	status: z.optional(z.enum(Object.keys(RequestStatus))),
})

export type RequestFormValues = z.infer<typeof requestSchema>
