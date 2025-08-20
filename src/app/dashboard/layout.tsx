import { Sidebar } from "@/features/profile/components/sidebar"

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='grid min-h-svh grid-cols-[16rem_1fr] bg-neutral-200'>
			<Sidebar />
			<main>{children}</main>
		</div>
	)
}
