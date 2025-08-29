"use client"

import { useEffect } from "react"
import { useChatStore } from "../store/chat.store"
import { authService } from "@/features/auth/services/auth.service"

export function ChatProvider({ children }: { children: React.ReactNode }) {
	const { connect, disconnect, isConnected } = useChatStore()

	useEffect(() => {
		const accessToken = authService.getAccessToken()

		if (accessToken && !isConnected) {
			connect()
		}

		return () => {
			disconnect()
		}
	}, [])

	return <>{children}</>
}
