// import { useQuery } from "@tanstack/react-query"
// import { useParams } from "next/navigation"
// import { profileService } from "../services/profile.service"

// export const useProfile = () => {
// 	const { username } = useParams() as { username: string }

// 	const { data, isLoading } = useQuery({
// 		queryKey: ["profile", username],
// 		queryFn: () => profileService.getProfile(username),
// 		staleTime: 1000 * 60 * 5,
// 		enabled: !!username,
// 	})

// 	return { data, isLoading }
// }
