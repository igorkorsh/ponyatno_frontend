import { useQuery } from "@tanstack/react-query"
import { IStudent, ITeacher } from "@/types/profile.types"
import { profileService } from "@/services/profile.service"

export const useProfile = () => {
	const { data, isLoading } = useQuery<ITeacher | IStudent>({
		queryKey: ["profile"],
		queryFn: async () => await profileService.getMyProfile(),
		// staleTime: 5 * 60 * 1000,
	})

	return { data, isLoading }
}
