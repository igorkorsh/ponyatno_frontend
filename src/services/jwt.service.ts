import Cookies from "js-cookie"

export const jwtService = {
	getAccessToken() {
		const accessToken = localStorage.getItem("accessToken")
		return accessToken || null
	},

	getRefreshToken() {
		const refreshToken = Cookies.get("refreshToken")
		return refreshToken || null
	},

	setAccessToken(token: string) {
		localStorage.setItem("accessToken", token)
	},

	setRefreshToken(token: string) {
		Cookies.set("refreshToken", token, {
			sameSite: "lax",
			secure: false,
			expires: 7,
		})
	},

	removeTokens() {
		localStorage.removeItem("accessToken")
		Cookies.remove("refreshToken")
	},
}
