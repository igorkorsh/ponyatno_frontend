"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { SocketProvider } from "@/features/chat/providers/socket.provider"

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
			<SocketProvider>{children}</SocketProvider>
		</QueryClientProvider>
	)
}
