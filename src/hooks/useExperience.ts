import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { experienceService } from "@/services/experience.service"

export const useExperience = () => {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		queryKey: ["experience"],
		queryFn: () => experienceService.getAll(),
		staleTime: 5 * 60 * 1000,
	})

	const { mutate: deleteItem } = useMutation({
		mutationFn: async (id: string) => await experienceService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["experience"] })
		},
	})

	return {
		data,
		isLoading,
		deleteItem,
	}
}
