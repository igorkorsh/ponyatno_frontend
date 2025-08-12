import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { subjectService } from "@/services/subject.service"

export const useSubject = () => {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		queryKey: ["subject"],
		queryFn: () => subjectService.getAll(),
		staleTime: 5 * 60 * 1000,
	})

	const { mutate: deleteItem } = useMutation({
		mutationFn: async (id: string) => await subjectService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["subject"] })
		},
	})

	return {
		data,
		isLoading,
		deleteItem,
	}
}
