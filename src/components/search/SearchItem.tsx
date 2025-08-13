import Link from "next/link"
import { ITeacherProfile } from "@/types/profile.types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

interface SearchItemProps {
	teacher: ITeacherProfile
}

export default function SearchItem({ teacher }: SearchItemProps) {
	return (
		<div className='rounded-lg border border-neutral-300 bg-white p-4 transition-all lg:p-6'>
			<div className='flex items-start justify-between'>
				<div className='flex items-center gap-3'>
					<Avatar>
						<AvatarImage />
						<AvatarFallback>{teacher.firstName.charAt(0)}</AvatarFallback>
					</Avatar>
					<div>
						<h3 className='font-semibold'>
							{teacher.firstName} {teacher.lastName}
						</h3>
						<div className='mt-1 flex items-center gap-2'>
							{teacher.isVerified && (
								<Badge
									variant='secondary'
									className='text-xs'
								>
									✓ Проверен
								</Badge>
							)}
							<span className='text-muted-foreground text-sm'>
								@{teacher.username}
							</span>
						</div>
					</div>
				</div>
				<Link href={`/teacher/${teacher.username}`}>
					<Button variant='outline'>Профиль</Button>
				</Link>
			</div>
			{teacher.about && (
				<div className='mt-4 border-t border-neutral-200 pt-4'>
					<p className='text-muted-foreground line-clamp-2 text-sm'>
						{teacher.about}
					</p>
				</div>
			)}
		</div>
	)
}
