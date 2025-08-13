import { useQuery } from "@tanstack/react-query"
import { IProfile } from "@/types/profile.types"
import { profileService } from "@/services/profile.service"

export const useProfile = (username: string) => {
	const { data, isLoading } = useQuery<IProfile>({
		queryKey: ["profile", username],
		queryFn: () => profileService.getProfile(username),
		staleTime: 5 * 60 * 1000,
		retry: false,
		enabled: !!username,
	})

	return { data, isLoading }
}
