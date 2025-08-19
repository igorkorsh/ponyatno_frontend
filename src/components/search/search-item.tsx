import Link from "next/link"
import { IProfile } from "@/types/profile.interface"
import { IsVerified } from "@/components/common/is-verified"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ISearchItemProps {
	data: IProfile
}

export function SearchItem({ data }: ISearchItemProps) {
	return (
		<Card className='border border-neutral-300'>
			<CardContent>
				<div className='flex items-center gap-2 lg:gap-4'>
					<Avatar>
						<AvatarImage />
						<AvatarFallback>{data.firstName.charAt(0).toUpperCase() || data.username.charAt(0).toUpperCase()}</AvatarFallback>
						{data.isVerified && <IsVerified className='size-6' />}
					</Avatar>
					<p className='text-base font-semibold text-neutral-900 lg:text-lg'>{data.firstName}</p>
				</div>
				{data.about && <p className='text-sm text-neutral-600'>{data.about}</p>}
			</CardContent>
			<CardFooter>
				<Button
					size='lg'
					className='max-lg:w-full'
				>
					Оставить заявку
				</Button>
				<Link
					href={`/teacher/${data.username}`}
					className='max-lg:w-full'
				>
					<Button
						variant='secondary'
						size='lg'
						className='w-full'
					>
						Подробнее
					</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
