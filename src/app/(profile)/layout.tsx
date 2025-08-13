export default function ProfileLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='h-full bg-neutral-200 p-4 transition-all lg:p-6'>
			<div className='mx-auto max-w-[1200px]'>{children}</div>
		</div>
	)
}
