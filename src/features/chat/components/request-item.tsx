"use client"

import { useParams } from "next/navigation"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { chatService } from "../services/chat.service"
import { useChatStore } from "../store/chat.store"

export function RequestItem() {
	const { id: roomId } = useParams() as { id: string }
	const { messages, getStatus } = useChatStore()

	const handleStatus = async (status: "ACCEPTED" | "REJECTED") => {
		await chatService.updateStatus({
			roomId,
			status,
		})
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Новая заявка</CardTitle>
			</CardHeader>
			<CardContent>
				<div>{JSON.stringify(messages[0])}</div>

				{getStatus(roomId) === "PENDING" && (
					<>
						<Button
							size='lg'
							onClick={() => handleStatus("ACCEPTED")}
						>
							Принять
						</Button>
						<Button
							variant='outline'
							size='lg'
							onClick={() => handleStatus("REJECTED")}
						>
							Отклонить
						</Button>
					</>
				)}
			</CardContent>
		</Card>
	)
}
