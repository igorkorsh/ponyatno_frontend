export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex h-dvh w-dvw items-center justify-center bg-neutral-200'>
			<div className='md:shadow-base w-full bg-neutral-100 p-6 md:max-w-[440px] md:rounded-xl'>
				{children}
			</div>
		</div>
	)
}
