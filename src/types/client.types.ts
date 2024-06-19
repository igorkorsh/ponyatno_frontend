export enum EnumClientType {
	STUDENT = 'student',
	TEACHER = 'teacher',
	PARENT = 'parent'
}

export enum EnumClientGrade {
	YOUNG = 'pre-school',
	GRADE1 = '1',
	GRADE2 = '2',
	GRADE3 = '3',
	GRADE4 = '4',
	GRADE5 = '5',
	GRADE6 = '6',
	GRADE7 = '7',
	GRADE8 = '8',
	GRADE9 = '9',
	GRADE10 = '10',
	GRADE11 = '11',
	GRADUATED = 'graduated'
}

export enum EnumClientGender {
	MALE = 'M',
	FEMALE = 'F'
}

export enum EnumClientIfOnline {
	ONLINE = 'online',
	OFFLINE = 'offline',
	NO_MATTER = 'no_matter'
}

export enum EnumClientStatusEducation {
	BACHELOR = 'bachelor',
	MAGISTER = 'magister',
	SPECIALITY = 'speciality',
	ACADEMIC_DEGREE = 'academic_degree',
	STUDENT = 'student'
}

export enum EnumClientTimeRange {
	ACADEMIC_HOUR = '45m',
	ASTRONOMIC_HOUR = '60m'
}

export enum EnumClientPriceIfRange {
	DIGIT = 'digit',
	RANGE = 'range'
}

export interface ISubjectItem {
	id: string
	name: string
}

export interface IStudentProfile {
	username: string
	first_name: string
	last_name: string
	email: string
	user_type: EnumClientType
	age: string
	grade: EnumClientGrade
	gender: EnumClientGender
	city: string
	if_online: EnumClientIfOnline
	subject: ISubjectItem[]
	student_wish: string
}

export interface ITeacherProfile {
	username: string
	first_name: string
	last_name: string
	email: string
	user_type: EnumClientType
	age: string
	gender: EnumClientGender
	city: string
	if_online: EnumClientIfOnline
	subject: ISubjectItem[]
	status_education: EnumClientStatusEducation
	education_place: string
	experience_years: number
	experience_text: string
	about_me: string
	time_range: EnumClientTimeRange
	price_if_range: EnumClientPriceIfRange
	price_digit: number
	price_from: number
	price_to: number
}

export type TypeClientProfile = IStudentProfile & ITeacherProfile
