"use client"

import { createContext, useContext } from "react"
import { useSocketConnection } from "../hooks/useSocketConnection"
import { UseSocketReturn } from "../interfaces/chat.interface"

const SocketContext = createContext<UseSocketReturn | null>(null)

export function useSocket(): UseSocketReturn {
	const context = useContext(SocketContext)

	if (!context) {
		throw new Error("useSocketContext must be used within a SocketProvider")
	}

	return context
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
	const { socket, isConnected } = useSocketConnection()

	return (
		<SocketContext.Provider value={{ socket, isConnected }}>
			{children}
		</SocketContext.Provider>
	)
}
