import { useQueryClient } from "@tanstack/react-query"
import { IAuthResponse, ILoginForm, IRegisterForm } from "@/types/auth.interface"
import { authService } from "@/services/auth.service"

export const useAuth = () => {
	const queryClient = useQueryClient()

	const login = async (data: ILoginForm): Promise<IAuthResponse> => {
		return await authService.login(data)
	}

	const register = async (data: IRegisterForm): Promise<IAuthResponse> => {
		return await authService.register(data)
	}

	queryClient.clear()

	return { login, register }
}
