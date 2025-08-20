import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@ui/card"
import { RegisterForm } from "@/features/auth/forms/register-form"

export default function RegisterPage() {
	return (
		<Card className='shadow-base w-full max-w-[440px] border-none'>
			<CardHeader>
				<CardTitle>Регистрация в «Понятно»</CardTitle>
			</CardHeader>
			<CardContent>
				<RegisterForm />
			</CardContent>
			<CardFooter>
				<p className='mt-4 text-base lg:mt-6'>
					Уже есть аккаунт?{" "}
					<Link
						href='/login'
						className='text-brand-600 hover:text-brand-700 font-medium underline-offset-4 transition-colors hover:underline'
					>
						Войти
					</Link>
				</p>
			</CardFooter>
		</Card>
	)
}
