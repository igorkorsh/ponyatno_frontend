import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { educationService } from "@/services/education.service"

export const useEducation = () => {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		queryKey: ["education"],
		queryFn: () => educationService.getAll(),
		staleTime: 5 * 60 * 1000,
	})

	const { mutate: deleteItem } = useMutation({
		mutationFn: async (id: string) => await educationService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["education"] })
		},
	})

	return {
		data,
		isLoading,
		deleteItem,
	}
}
