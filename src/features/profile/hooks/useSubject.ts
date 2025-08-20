// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import type { SubjectFormValues } from "../schemas/subject.schema"
// import { subjectService } from "../services/subject.service"

// const QUERY_KEY = ["subject"]

// export const useSubject = () => {
// 	const queryClient = useQueryClient()

// 	const { data, isLoading } = useQuery({
// 		queryKey: QUERY_KEY,
// 		queryFn: () => subjectService.findAll(),
// 		staleTime: 5 * 60 * 1000,
// 	})

// 	const invalidate = () =>
// 		queryClient.invalidateQueries({ queryKey: QUERY_KEY })

// 	const createMutation = useMutation({
// 		mutationFn: (subject: SubjectFormValues) => subjectService.create(subject),
// 		onSuccess: invalidate,
// 	})

// 	const updateMutation = useMutation({
// 		mutationFn: ({ id, subject }: { id: string; subject: SubjectFormValues }) =>
// 			subjectService.update(id, subject),
// 		onSuccess: invalidate,
// 	})

// 	const deleteMutation = useMutation({
// 		mutationFn: (id: string) => subjectService.remove(id),
// 		onSuccess: invalidate,
// 	})

// 	return {
// 		data,
// 		isLoading,
// 		createItem: createMutation.mutate,
// 		updateItem: updateMutation.mutate,
// 		deleteItem: deleteMutation.mutate,
// 	}
// }
