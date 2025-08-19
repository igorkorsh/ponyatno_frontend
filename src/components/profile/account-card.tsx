import { useProfile } from "@/hooks/useProfile"
import { IsVerified } from "@/components/common/is-verified"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { calculateAge } from "@/utils/age"
import { useAccountName } from "@/context/useAccountName"

export function AccountCard() {
	const { username } = useAccountName()
	const { data, isLoading } = useProfile(username)

	if (!data) return null

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<div className='flex flex-col gap-3'>
			<h2 className='text-lg font-semibold text-neutral-900 lg:text-xl'>Личные данные</h2>
			<div className='flex items-center gap-4 rounded-lg bg-neutral-100 p-4 transition-all max-lg:flex-col lg:gap-[46px] lg:p-6'>
				<Avatar size='lg'>
					<AvatarImage src={data.avatar} />
					<AvatarFallback size='lg'>{data.firstName.charAt(0).toUpperCase() || data.username.charAt(0).toUpperCase()}</AvatarFallback>
					{data.isVerified && <IsVerified />}
				</Avatar>
				<div className='flex flex-col gap-4'>
					<div className='flex items-center gap-2 max-lg:flex-col lg:gap-4'>
						<p className='text-center text-xl font-semibold text-neutral-900 lg:text-2xl'>{data.firstName || data.username}</p>
						<p className='text-base text-neutral-900 lg:mb-[6px] lg:self-end'>{calculateAge(data.birthDate)}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
