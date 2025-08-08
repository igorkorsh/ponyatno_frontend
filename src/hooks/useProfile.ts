import { useQuery } from "@tanstack/react-query"
import { profileService } from "@/services/profile.service"

export const useProfile = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			return await profileService.me()
		},
	})

	return { data, isLoading }
}
