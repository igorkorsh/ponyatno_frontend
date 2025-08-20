"use client"

import { useEffect, useRef, useState } from "react"
import { Socket, io } from "socket.io-client"
import { UseSocketReturn } from "../interfaces/chat.interface"
import { authService } from "@/features/auth/services/auth.service"

export const useSocketConnection = (): UseSocketReturn => {
	const socketRef = useRef<Socket | null>(null)
	const [isConnected, setIsConnected] = useState(false)

	const connect = () => {
		if (socketRef.current?.connected) return

		const accessToken = authService.getAccessToken()

		const socket = io("http://localhost:3000", {
			transports: ["websocket"],
			withCredentials: true,
			auth: {
				token: accessToken,
			},
			reconnection: true,
			reconnectionAttempts: 5,
			reconnectionDelay: 500,
			reconnectionDelayMax: 5000,
		})

		socketRef.current = socket

		socket.on("connect", () => {
			setIsConnected(true)
		})

		socket.on("disconnect", async (reason) => {
			if (reason === "io server disconnect") {
				await authService.refresh()
				connect()
			}

			setIsConnected(false)
		})
	}

	const disconnect = () => {
		socketRef.current?.disconnect()
		socketRef.current = null
		setIsConnected(false)
	}

	useEffect(() => {
		connect()

		return () => {
			disconnect()
		}
	}, [])

	return {
		socket: socketRef.current,
		isConnected,
	}
}
