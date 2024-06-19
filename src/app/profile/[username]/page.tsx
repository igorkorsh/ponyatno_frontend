import type { Metadata } from 'next'

import { Profile } from '../Profile'

export const metadata: Metadata = {
	title: 'Профиль пользователя'
}

export default function ProfilePage() {
	return <Profile />
}
