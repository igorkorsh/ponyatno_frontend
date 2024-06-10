export enum EnumUserType {
	student = 'student',
	teacher = 'teacher',
	parent = 'parent'
}

export enum EnumGender {
	female = 'F',
	male = 'M'
}

export enum EnumOnline {
	online = 'online',
	offline = 'offline',
	no_matter = 'no_matter'
}

export enum EnumOffline {
	at_mine = 'at_mine',
	at_yours = 'at_yours',
	no_matter = 'no_matter'
}

export enum EnumStatusEducation {
	bachelor = 'bachelor',
	magister = 'magister',
	speciality = 'speciality',
	academic_degree = 'academic_degree',
	student = 'student'
}

export enum EnumGrade {
	pre_school = 'young',
	graduated = 'graduated'
}

export enum EnumTimeRange {
	academic_hour = '45m',
	astronomic_hour = '60m'
}

export enum EnumPriceRange {
	digit = 'digit',
	range = 'range'
}

export interface IProfileBase {
	username: string
	first_name: string
	email: string
	user_type: EnumUserType
	age: string
	gender: EnumGender
	city: string
	if_online: EnumOnline
	where_offline?: EnumOffline
	subject: []
	about_me: string
}

export interface ITeacherProfile {
	last_name: string
	status_education: EnumStatusEducation
	education_place: string
	experience_years: number
	experience_text: string
	time_range: EnumTimeRange
	price_if_range: EnumPriceRange
	price_digit: number
	price_from: number
	price_to: number
}

export interface IStudentProfile {
	grade: EnumGrade
	student_wish: string
}

export type TypeUserProfile = IProfileBase &
	Partial<ITeacherProfile & IStudentProfile>
