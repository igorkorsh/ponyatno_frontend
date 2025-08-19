import { useQuery } from "@tanstack/react-query"
import { IProfile } from "@/types/profile.interface"
import { profileService } from "@/services/profile.service"

export const useDashboard = () => {
	const { data, isLoading } = useQuery<IProfile>({
		queryKey: ["dashboard"],
		queryFn: () => profileService.getMyProfile(),
		staleTime: 5 * 60 * 1000,
	})

	return { data, isLoading }
}
