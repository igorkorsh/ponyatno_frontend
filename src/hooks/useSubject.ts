import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { type AxiosError } from "axios"
import { toast } from "sonner"
import { subjectService } from "@/services/subject.service"
import { SubjectFormValues } from "@/components/dashboard/subject/subject.schema"

const SUBJECT_QUERY_KEY = ["subject"]

export const useSubject = () => {
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		queryKey: SUBJECT_QUERY_KEY,
		queryFn: subjectService.getAll,
		staleTime: 5 * 60 * 1000,
	})

	const invalidate = () => queryClient.invalidateQueries({ queryKey: SUBJECT_QUERY_KEY })

	const handleError = (error: AxiosError<{ message: string }>) => {
		toast.error(error.response?.data?.message || "Произошла неизвестная ошибка")
	}

	const createMutation = useMutation({
		mutationFn: (data: Partial<SubjectFormValues>) => subjectService.create(data),
		onSuccess: invalidate,
		onError: handleError,
	})

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<SubjectFormValues> }) => subjectService.update(id, data),
		onSuccess: invalidate,
		onError: handleError,
	})

	const deleteMutation = useMutation({
		mutationFn: (id: string) => subjectService.delete(id),
		onSuccess: invalidate,
		onError: handleError,
	})

	return {
		data,
		isLoading,
		createItem: createMutation.mutate,
		updateItem: updateMutation.mutate,
		deleteItem: deleteMutation.mutate,
	}
}
