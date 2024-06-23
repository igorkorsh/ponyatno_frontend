import { Metadata } from 'next'

import { Registration } from './Registration'

export const metadata: Metadata = {
	title: 'Регистрация в Понятно'
}

export default function RegistrationPage() {
	return <Registration />
}
