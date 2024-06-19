import { useQuery } from '@tanstack/react-query'

import { clientService } from '@/services/client.service'

export function useProfile() {
	const { data, isPending } = useQuery({
		queryKey: ['profile'],
		queryFn: () => clientService.getProfile()
	})

	return { data, isPending }
}
