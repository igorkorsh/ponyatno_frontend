import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"
import type { RequestFormValues } from "../schemas/request.schema"
import { requestService } from "../services/request.service"

export const useRequest = () => {
	const QUERY_KEY = ["request"]
	const queryClient = useQueryClient()

	const { data, isLoading } = useQuery({
		queryKey: QUERY_KEY,
		queryFn: () => requestService.findAll(),
		staleTime: 1000 * 60 * 5,
	})

	const invalidate = () => {
		queryClient.invalidateQueries({ queryKey: QUERY_KEY })
	}

	const createMutation = useMutation({
		mutationFn: async (data: RequestFormValues) => {
			await requestService.create(data)
		},
		onSuccess: () => invalidate(),
		onError: (error: AxiosError) => {
			toast.warning((error.response?.data as AxiosError).message)
		},
	})

	const updateMutation = useMutation({
		mutationFn: async ({
			id,
			data,
		}: {
			id: string
			data: RequestFormValues
		}) => {
			await requestService.update(id, data)
		},
		onSuccess: () => invalidate(),
		onError: () => {
			toast.error("Не удалось обновить заявку")
		},
	})

	const deleteMutation = useMutation({
		mutationFn: async (requestId: string) => {
			await requestService.delete(requestId)
		},
		onSuccess: () => invalidate(),
		onError: () => {
			toast.error("Не удалось удалить заявку")
		},
	})

	return {
		data,
		isLoading,
		createItem: createMutation.mutate,
		updateItem: updateMutation.mutate,
		deleteItem: deleteMutation.mutate,
		isPending:
			createMutation.isPending ||
			updateMutation.isPending ||
			deleteMutation.isPending,
	}
}
