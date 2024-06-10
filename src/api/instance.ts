import axios, { type CreateAxiosDefaults } from 'axios'
import MockAdapter from 'axios-mock-adapter'

const options: CreateAxiosDefaults = {
	// baseURL: 'http://localhost:3000/api',
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosInstance = axios.create(options)

const axiosWithAuth = axios.create(options)

// Добавляет Access Token в заголовки всех запросов
axiosWithAuth.interceptors.request.use((config) => {
	const accessToken = ''

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

// Имитируем запрос
const mock = new MockAdapter(axiosWithAuth)

mock.onGet('/profile').reply(200, {
	username: 'Polly',
	first_name: 'Polina',
	last_name: 'Litinskaia',
	email: 'zmariboru@gmail.com',
	user_type: 'teacher',
	age: '1999-10-13',
	gender: 'F',
	city: 'Tbilisi',
	if_online: 'no_matter',
	subject: [1],
	status_education: 'bachelor',
	education_place: '...',
	experience_years: 7,
	experience_text:
		'Нервная дрожь его перешла в какую-то лихорадочную; он чувствовал даже озноб; на такой жаре ему становилось холодно. Как бы с усилием начал он, почти бессознательно, по какой-то внутренней необходимости, всматриваться во все встречавшиеся предметы, как будто ища усиленно развлечения, но это плохо удавалось ему, и он поминутно впадал в задумчивость. Когда же опять, вздрагивая, поднимал голову и оглядывался кругом, то тотчас же забывал, о чем сейчас думал и даже где проходил. Таким образом прошел о',
	about_me:
		'Нервная дрожь его перешла в какую-то лихорадочную; он чувствовал даже озноб; на такой жаре ему становилось холодно. Как бы с усилием начал он, почти бессознательно, по какой-то внутренней необходимости, всматриваться во все встречавшиеся предметы, как будто ища усиленно развлечения, но это плохо удавалось ему, и он поминутно впадал в задумчивость. Когда же опять, вздрагивая, поднимал голову и оглядывался кругом, то тотчас же забывал, о чем сейчас думал и даже где проходил. Таким образом прошел о',
	time_range: '60m',
	price_if_range: 'digit',
	price_digit: 2000,
	price_from: 1000,
	price_to: 3000
})

export { axiosInstance, axiosWithAuth }
