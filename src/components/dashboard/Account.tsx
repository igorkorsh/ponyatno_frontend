import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"

export default function Account() {
	return (
		<div className='flex max-lg:flex-col p-4 lg:p-6 gap-4 items-center lg:gap-[46px]'>
			<Avatar>
				<AvatarImage />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<div>
				<div className='flex max-lg:flex-col gap-2 items-center lg:gap-4'>
					<p>First Name</p>
					<p>BirthDate</p>
				</div>
				<div className='flex gap-2'>
					<p>Rating</p>
					<p>Reviews</p>
				</div>
			</div>
		</div>
	)
}
