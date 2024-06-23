import { Metadata } from 'next'

import { Login } from './Login'

export const metadata: Metadata = {
	title: 'Войдите в свой аккаунт'
}

export default function LoginPage() {
	return <Login />
}
