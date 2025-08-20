import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card"
import { LoginForm } from "@/features/auth/forms/login-form"

export default function LoginPage() {
	return (
		<Card className='shadow-base w-full max-w-[440px] border-none'>
			<CardHeader>
				<CardTitle>Войти в «Понятно»</CardTitle>
			</CardHeader>
			<CardContent>
				<LoginForm />
			</CardContent>
			<CardFooter>
				<p className='mt-4 text-base lg:mt-6'>
					Нет аккаунта?{" "}
					<Link
						href='/register'
						className='text-brand-600 hover:text-brand-700 font-medium underline-offset-4 transition-colors hover:underline'
					>
						Зарегистрироваться
					</Link>
				</p>
			</CardFooter>
		</Card>
	)
}
