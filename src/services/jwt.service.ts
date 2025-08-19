import Cookies from "js-cookie"

export const jwtService = {
	getAccessToken() {
		const accessToken = Cookies.get("accessToken")
		return accessToken || null
	},

	getRefreshToken() {
		const refreshToken = Cookies.get("refreshToken")
		return refreshToken || null
	},

	setAccessToken(token: string) {
		Cookies.set("accessToken", token)
	},

	setRefreshToken(token: string) {
		Cookies.set("refreshToken", token, {
			sameSite: "lax",
			secure: false,
			expires: 7,
		})
	},

	removeTokens() {
		Cookies.remove("accessToken")
		Cookies.remove("refreshToken")
	},
}
