'use client'

import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IRegisterForm } from '@/types/registration.types'

export function Registration() {
	const {
		register,
		handleSubmit,
		formState: { isValid },
		watch,
		reset
	} = useForm<IRegisterForm>({
		mode: 'onChange'
	})

	const { push } = useRouter()

	const password = watch('password')
	const [showPassword, setShowPassword] = useState(false)

	const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
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
					Создать аккаунт в Понятно
				</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='mb-5'
				>
					<div className='mb-4'>
						<p className='text-sm font-medium text-gray-700 mb-2'>
							Тип аккаунта
						</p>
						<div className='flex flex-row justify-start gap-3'>
							<div className='flex items-center gap-2'>
								<input
									type='radio'
									{...register('type', { required: true })}
									name='type'
									id='teacher'
									value='teacher'
									className='before:content-[""] relative h-4 w-4 cursor-pointer appearance-none rounded-full border border-indigo-500 before:absolute before:top-2/4 before:left-2/4 before:block before:h-2 before:w-2 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-indigo-500 before:transition-opacity before:opacity-0 checked:before:opacity-100 checked:before:bg-indigo-500'
								/>
								<label
									htmlFor='teacher'
									className='block text-sm font-medium text-gray-700 cursor-pointer'
								>
									Учитель
								</label>
							</div>
							<div className='flex items-center gap-2'>
								<input
									type='radio'
									{...register('type', { required: true })}
									name='type'
									id='student'
									value='student'
									className='before:content-[""] relative h-4 w-4 cursor-pointer appearance-none rounded-full border border-indigo-500 before:absolute before:top-2/4 before:left-2/4 before:block before:h-2 before:w-2 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-indigo-500 before:transition-opacity before:opacity-0 checked:before:opacity-100 checked:before:bg-indigo-500'
								/>
								<label
									htmlFor='student'
									className='block text-sm font-medium text-gray-700 cursor-pointer'
								>
									Ученик
								</label>
							</div>
						</div>
					</div>
					<div className='mb-4'>
						<label
							htmlFor='name'
							className='block text-sm font-medium text-gray-700 mb-2'
						>
							Имя пользователя
						</label>
						<input
							type='text'
							{...register('name', { required: true })}
							id='name'
							className='shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none'
							placeholder='Имя пользователя'
						/>
					</div>
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
					<div className='flex flex-row gap-2 items-center mb-2'>
						<input
							type='checkbox'
							{...register('privacy', { required: true })}
							id='privacy'
							className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none cursor-pointer'
							required
						/>
						<label htmlFor='privacy'>
							Я принимаю{' '}
							<Link
								href='/privacy'
								className='underline text-gray-600 hover:text-indigo-500 focus:outline-none'
							>
								условия пользования
							</Link>
						</label>
					</div>
					<button
						type='submit'
						disabled={!isValid}
						className='w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-md text-sm text-white font-medium bg-indigo-600 hover:bg-indigo-700 disabled:shadow-none disabled:bg-gray-300 focus:outline-none'
					>
						Создать новый аккаунт
					</button>
				</form>
				<div>
					<h2 className='text-sm text-center mb-2'>
						Уже есть аккаунт в Понятно?
					</h2>
					<Link
						href='/login'
						className='w-full flex justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-indigo-400 bg-indigo-50 hover:bg-indigo-100 focus:outline-none'
					>
						Войти
					</Link>
				</div>
			</div>
		</div>
	)
}
