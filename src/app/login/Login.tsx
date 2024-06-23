'use client'

import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ILoginForm } from '@/types/login.types'

export function Login() {
	const {
		register,
		handleSubmit,
		formState: { isValid },
		watch,
		reset
	} = useForm<ILoginForm>({
		mode: 'onChange'
	})

	const { push } = useRouter()

	const password = watch('password')
	const [showPassword, setShowPassword] = useState(false)

	const onSubmit: SubmitHandler<ILoginForm> = (data) => {
		console.log(data)
	}

	return (
		<div className='min-h-screen flex items-center justify-center w-full bg-gray-100'>
			<div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
				<div className='flex justify-center mb-4'>
					<img
						src='/logo.svg'
						width={64}
						height={64}
						alt='Понятно'
					/>
				</div>
				<h1 className='text-2xl font-bold text-center mb-4'>
					Войдите в свой аккаунт
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='mb-5'
				>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-700 mb-2'
						>
							Адрес электронной почты
						</label>
						<input
							type='email'
							{...register('email', { required: true })}
							id='email'
							className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none'
							placeholder='name@domain.com'
						/>
					</div>
					<div className='mb-4'>
						<div className='flex items-end justify-between mb-2'>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700'
							>
								Пароль
							</label>
							<Link
								href='/forgot-password'
								className='text-xs text-gray-600 hover:text-indigo-500 focus:outline-none'
							>
								Забыли пароль?
							</Link>
						</div>
						<div className='relative'>
							<input
								type={showPassword ? 'text' : 'password'}
								{...register('password', { required: true })}
								id='password'
								className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none mb-1'
								placeholder='Введите пароль'
								required
							/>
							{password && password.length > 0 && (
								<button
									type='button'
									onClick={() => setShowPassword(!showPassword)}
									className='absolute right-2 top-2 text-indigo-300'
								>
									{showPassword ? <Eye /> : <EyeOff />}
								</button>
							)}
						</div>
					</div>
					<button
						type='submit'
						disabled={!isValid}
						className='w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:shadow-none disabled:bg-gray-300 focus:outline-none'
					>
						Войти
					</button>
				</form>
				<div>
					<h2 className='text-sm text-center mb-2'>Нет аккаунта?</h2>
					<Link
						href='/registration'
						className='w-full flex justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-indigo-400 bg-indigo-50 hover:bg-indigo-100 focus:outline-none'
					>
						Зарегистрироваться
					</Link>
				</div>
			</div>
		</div>
	)
}
