export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <div data-auth>{children}</div>
}
