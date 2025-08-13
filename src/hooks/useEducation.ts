import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { educationService } from "@/services/education.service"
import { EducationFormValues } from "@/components/dashboard/education/education.schema"

const EDUCATION_QUERY_KEY = ["education"]

export const useEducation = () => {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		queryKey: EDUCATION_QUERY_KEY,
		queryFn: educationService.getAll,
		staleTime: 5 * 60 * 1000,
	})

	const invalidate = () =>
		queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEY })

	const createMutation = useMutation({
		mutationFn: (data: Partial<EducationFormValues>) =>
			educationService.create(data),
		onSuccess: invalidate,
	})

	const updateMutation = useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string
			data: Partial<EducationFormValues>
		}) => educationService.update(id, data),
		onSuccess: invalidate,
	})

	const deleteMutation = useMutation({
		mutationFn: (id: string) => educationService.delete(id),
		onSuccess: invalidate,
	})

	return {
		data,
		isLoading,
		createItem: createMutation.mutate,
		updateItem: updateMutation.mutate,
		deleteItem: deleteMutation.mutate,
		isCreating: createMutation.isPending,
		isUpdating: updateMutation.isPending,
	}
}
