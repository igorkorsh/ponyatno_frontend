import { useQueryClient } from "@tanstack/react-query"
import type { LoginFormValues } from "../schemas/login.schema"
import type { RegisterFormValues } from "../schemas/register.schema"
import { authService } from "../services/auth.service"

export const useAuth = () => {
	const queryClient = useQueryClient()

	const login = async (data: LoginFormValues) => {
		return await authService.login(data)
	}

	const register = async (data: RegisterFormValues) => {
		return await authService.register(data)
	}

	const logout = async () => {
		return await authService.logout()
	}

	queryClient.clear()

	return { login, register, logout }
}
