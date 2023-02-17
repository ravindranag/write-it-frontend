import axios, { AxiosInstance } from "axios";

type LoginSignUpData = {
	email: String,
	password: String
}

type CreateProfileData = {
	username: string
	name: string
	bio: string
	avatar?: string
}

const APIInstance: AxiosInstance = axios.create({
	baseURL: 'https://write-it.onrender.com'
})

APIInstance.interceptors.request.use(function (config) {
	config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`

	return config
})

const APIMethods = {
	auth: {
		login: (data: LoginSignUpData) => APIInstance.post('/user/login', data),
		signUp: (data: LoginSignUpData) => APIInstance.post('/user/signup', data),
		createProfile: (data: CreateProfileData) => APIInstance.post('/profile', data),
		verify: () => APIInstance.get('/user/verify')
	}
}

export default APIMethods