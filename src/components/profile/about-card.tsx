import { IProfileCard } from "@/types/profile.types"
import { useProfile } from "@/hooks/useProfile"

export function AboutCard({ username }: IProfileCard) {
	const { data } = useProfile(username)

	if (!data) return

	return (
		data.about && (
			<div className='flex flex-col gap-3'>
				{/* <h2 className='text-lg font-semibold text-neutral-900 lg:text-xl'>
					О себе
				</h2> */}
				<div className='relative flex flex-col gap-3 rounded-lg bg-neutral-100 p-4 transition-all lg:p-6'>
					<p className='pe-10 text-lg font-semibold text-neutral-900'>О себе</p>
					<p className='text-sm text-neutral-600'>{data.about}</p>
				</div>
			</div>
		)
	)
}
