import type { Goal } from "@/shared/constants/goal.constants"
import type { Subject } from "@/shared/constants/subject.constants"

export enum RequestStatus {
	DRAFT = "DRAFT",
	ARCHIVED = "ARCHIVED",
	ACCEPTED = "ACCEPTED",
	REJECTED = "REJECTED",
}

export enum RequestType {
	PRIVATE = "PRIVATE",
	PUBLIC = "PUBLIC",
}

export interface IRequest {
	id: string
	subject: Subject
	grade: number
	goals: Goal[]
	type: RequestType
	comment: string
	status: RequestStatus
}
