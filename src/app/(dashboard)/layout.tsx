export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='grid h-full grid-cols-[245px_1fr]'>
			<div className='bg-brand-600 text-neutral-100'>Sidebar</div>
			<div className='bg-neutral-200 p-4 lg:p-6'>{children}</div>
		</div>
	)
}
