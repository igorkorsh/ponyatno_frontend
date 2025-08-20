import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Понятно",
}

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='flex h-dvh w-dvw items-center justify-center bg-neutral-200'>
			{children}
		</div>
	)
}
