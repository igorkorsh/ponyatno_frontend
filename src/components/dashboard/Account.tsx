import { DialogClose } from "@radix-ui/react-dialog"
import { BadgeCheck, SquarePen } from "lucide-react"
import { useRef } from "react"
import { useProfile } from "@/hooks/useProfile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
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
import { Skeleton } from "@/components/ui/Skeleton"
import { AccountForm } from "./AccountForm"

export default function Account() {
	const { data, isLoading } = useProfile()

	const submitButtonRef = useRef<HTMLButtonElement>(null)

	return isLoading ? (
		<div className='flex items-center gap-4 rounded-xl bg-neutral-100 p-4 max-lg:flex-col lg:gap-[46px] lg:p-6'>
			<Skeleton className='size-[122px] rounded-full' />
			<div className='flex items-center gap-2 max-lg:flex-col lg:gap-4'>
				<Skeleton className='h-[46px] w-[280px]' />
			</div>
		</div>
	) : (
		<div className='relative flex items-center gap-4 rounded-xl bg-neutral-100 p-4 max-lg:flex-col lg:gap-[46px] lg:p-6'>
			<Avatar size='lg'>
				<AvatarImage />
				<AvatarFallback size='lg'>{data?.firstName[0]}</AvatarFallback>
				{data?.isVerified && (
					<BadgeCheck className='fill-brand-600 absolute -end-1 -bottom-1 z-1 size-10 text-neutral-100' />
				)}
			</Avatar>
			<div className='flex flex-col gap-4'>
				<div className='flex items-center gap-2 max-lg:flex-col lg:gap-4'>
					<p className='text-2xl font-semibold text-neutral-900'>
						{data?.firstName}
					</p>
					<p className='mb-[6px] self-end text-base text-neutral-900'>
						BirthDate
					</p>
				</div>
				<div className='flex gap-2'>
					<p>Rating</p>
					<p>Reviews</p>
				</div>
			</div>
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
						<DialogTitle>Личные данные</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<AccountForm ref={submitButtonRef} />
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
	)
}
