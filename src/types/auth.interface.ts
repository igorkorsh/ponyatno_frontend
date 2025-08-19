export interface ILoginForm {
	email: string
	password: string
}

export interface IRegisterForm {
	role: "TEACHER" | "STUDENT"
	username: string
	email: string
	password: string
}

export interface IAuthResponse {
	accessToken: string
}
