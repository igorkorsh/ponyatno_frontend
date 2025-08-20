import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { AboutFormValues } from "../schemas/about.schema"
import type { AccountFormValues } from "../schemas/account.schema"
import { profileService } from "../services/profile.service"

const QUERY_KEY = ["me"]

export const useCurrentProfile = () => {
	const queryClient = useQueryClient()

	const { data } = useQuery({
		queryKey: QUERY_KEY,
		queryFn: () => profileService.getCurrentProfile(),
		staleTime: 1000 * 60 * 5,
	})

	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: QUERY_KEY })
	}

	const updateMutation = useMutation({
		mutationFn: async (data: AccountFormValues | AboutFormValues) => {
			await profileService.updateProfile(data)
		},
		onSuccess: () => invalidate(),
	})

	return {
		data,
		update: updateMutation.mutate,
		isPending: updateMutation.isPending,
	}
}
