export interface ILoginForm {
	email: string
	password: string
}

export interface IAuthResponse {
	accessToken: string
	user: {
		id: string
		role: "STUDENT" | "TEACHER"
	}
}
