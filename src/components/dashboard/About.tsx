import { DialogClose } from "@radix-ui/react-dialog"
import { SquarePen } from "lucide-react"
import { useRef } from "react"
import { useProfile } from "@/hooks/useProfile"
import { Button } from "@/components/ui/Button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/Dialog"
import { AboutForm } from "./AboutForm"

export default function Account() {
	const { data, isLoading } = useProfile()
	const submitButtonRef = useRef<HTMLButtonElement>(null)

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className='grid gap-3'>
			<h2 className='text-lg font-semibold text-neutral-900 md:text-xl'>
				О себе
			</h2>
			<div className='relative flex flex-col gap-3 rounded-xl bg-neutral-100 p-4 lg:p-6'>
				<h3 className='text-lg font-semibold text-neutral-900'>О себе</h3>
				<p className='text-sm text-neutral-600'>
					{data?.about ||
						"Расскажите о своих ценностях, индивидуальных особенностях и предпочтениях. Это поможет ученикам и родителям узнать вас получше. Не добавляйте сюда ссылки, контакты и цены на услуги."}
				</p>
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant='icon'
							size='icon'
							className='absolute top-2 right-2 size-11'
						>
							<SquarePen />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>О себе</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<AboutForm ref={submitButtonRef} />
						<DialogFooter>
							<DialogClose asChild>
								<Button
									className='w-full'
									onClick={() => submitButtonRef.current?.click()}
								>
									Сохранить изменения
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}
