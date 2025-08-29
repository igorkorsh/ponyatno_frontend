"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { ChatProvider } from "@/features/chat/providers/chat.provider"

export function Providers({ children }: { children: React.ReactNode }) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
				},
			},
		}),
	)

	return (
		<QueryClientProvider client={client}>
			<ChatProvider>{children}</ChatProvider>
		</QueryClientProvider>
	)
}
