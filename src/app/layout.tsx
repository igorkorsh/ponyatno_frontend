import type { Metadata } from "next"
import { Golos_Text } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const golos = Golos_Text({
	subsets: ["cyrillic", "latin"],
	weight: ["400", "500", "600"],
	display: "swap",
})

export const metadata: Metadata = {
	title: "Понятно",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={golos.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
