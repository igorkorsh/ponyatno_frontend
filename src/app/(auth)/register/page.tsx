import Link from "next/link"
import RegisterForm from "@/components/auth/register/register-form"

export default function RegisterPage() {
	return (
		<div className='flex flex-col gap-6'>
			<h1 className='text-xl font-semibold text-neutral-900'>
				Регистрация в «Понятно»
			</h1>
			<RegisterForm />
			<p className='text-center text-base text-neutral-800'>
				Уже есть аккаунт?{" "}
				<Link
					href='/login'
					className='text-brand-600 hover:text-brand-700 focus-visible:text-brand-700 font-medium transition-colors outline-none focus-visible:underline focus-visible:underline-offset-4'
				>
					Войти
				</Link>
			</p>
		</div>
	)
}
