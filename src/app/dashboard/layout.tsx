import Sidebar from "@/components/dashboard/sidebar/Sidebar"
import { ScrollArea } from "@/components/ui/ScrollArea"

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='grid h-full grid-cols-[245px_1fr]'>
			<Sidebar />
			<div className='overflow-hidden bg-neutral-200 p-4 pe-3 lg:p-6'>
				<ScrollArea className='h-full pe-5'>{children}</ScrollArea>
			</div>
		</div>
	)
}
