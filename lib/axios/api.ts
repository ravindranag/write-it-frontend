import axios, { AxiosInstance, AxiosProgressEvent } from "axios";

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

type UpdateAvatarData = {
	avatar: File
}

type GenerateOTPData = {
	email: string
}

type VerifyOTPData = {
	email: string
	otp: string
}

type UploadProgressCallback = (progressEvent: AxiosProgressEvent) => void

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
	},
	profile: {
		setAvatar: (data: UpdateAvatarData, trackUploadProgress: UploadProgressCallback) => APIInstance.post('/profile/avatar', data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress: trackUploadProgress
		})
	},
	otp: {
		generate: (data: GenerateOTPData) => APIInstance.post('/otp/generate', data),
		verify: (data: VerifyOTPData) => APIInstance.post('/otp/verify', data)
	}
}

export default APIMethods