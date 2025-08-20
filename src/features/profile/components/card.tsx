import { Plus } from "lucide-react"
import { type PropsWithChildren, useState } from "react"
import { Button } from "@ui/button"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@ui/card"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/dialog"

export interface IProfileCardProps {
	title: string
	form?: React.ReactNode
}

export function ProfileCard({
	children,
	title,
	form,
}: PropsWithChildren<IProfileCardProps>) {
	const [isOpen, setOpen] = useState(false)

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardAction>
					<Dialog
						open={isOpen}
						onOpenChange={setOpen}
					>
						<DialogTrigger asChild>
							<Button>
								<Plus />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>{title}</DialogTitle>
							</DialogHeader>
							{isOpen && form}
						</DialogContent>
					</Dialog>
				</CardAction>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	)
}
