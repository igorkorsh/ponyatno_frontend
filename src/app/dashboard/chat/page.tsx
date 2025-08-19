"use client"

import { useEffect, useRef, useState } from "react"
import { type Socket, io } from "socket.io-client"
import { chatService } from "@/services/chat.service"

export default function ChatsPage() {
	const ref = useRef<Socket | null>(null)
	const [rooms, setRooms] = useState<any[]>([])

	useEffect(() => {
		ref.current = io("http://localhost:3000", {
			reconnection: true,
			reconnectionAttempts: 3,
			transports: ["websocket"],
			withCredentials: true,
		})

		ref.current.on("connect", () => {
			console.log("Connected to server", ref.current?.id)
		})

		ref.current.on("connect_error", (error) => {
			console.log("Connection error:", error)
		})

		ref.current.on("disconnect", () => {
			console.log("Disconnected from server")
		})

		ref.current.on("message", (message) => {
			console.log("Message from server", message)
		})

		ref.current.on("rooms", (rooms) => {
			setRooms(rooms)
		})

		return () => {
			ref.current?.disconnect()
		}
	}, [])

	const sendMessage = () => {
		ref.current?.emit("message", "Hello from client")
	}

	const getInfo = async (id: string) => {
		const response = await chatService.getInfo(id)
		console.log(response)
	}

	return (
		<div>
			{rooms.map((room) => (
				<div
					key={room.id}
					onClick={() => getInfo(room.id)}
				>
					{room.id}
				</div>
			))}
		</div>
	)
}
