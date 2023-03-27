import { OutputData } from "@editorjs/editorjs";
import axios, { AxiosInstance, AxiosProgressEvent } from "axios";
import { config } from "process";

type LoginSignUpData = {
	email: String,
	password: String
}

type CreateUserData = {
	email: string
	password: string
	profile: {
		username: string
		name: string
		bio?: string
		avatar?: string
		twitter_username: string
	}
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

type CreateBlogData = {
	title: string
	slug: string
	description?: string
	data: OutputData
}

type UploadProgressCallback = (progressEvent: AxiosProgressEvent) => void

const APIInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL
})
const AuthorizedAPIInstance: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL
})

AuthorizedAPIInstance.interceptors.request.use((config) => {
	config.headers.Authorization = localStorage.getItem('accessToken')
	return config
})

const APIMethods = {
	auth: {
		login: (data: LoginSignUpData) => APIInstance.post('/user/login', data),
		signUp: (data: CreateUserData) => APIInstance.post('/user/signup', data),
		verify: () => AuthorizedAPIInstance.get('/user')
	},
	profile: {
		setAvatar: (data: UpdateAvatarData, trackUploadProgress: UploadProgressCallback) => AuthorizedAPIInstance.post('/profile/avatar', data, {
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			onUploadProgress: trackUploadProgress
		})
	},
	otp: {
		generate: (data: GenerateOTPData) => APIInstance.post('user/otp/generate', data),
		verify: (data: VerifyOTPData) => APIInstance.post('user/otp/verify', data)
	},
	blog: {
		checkSlugAvailability: (slug: string) => AuthorizedAPIInstance.get(`blog/slug/${slug}`),
		create: (data: CreateBlogData) => AuthorizedAPIInstance.post('blog/', data),
		getBySlug: (slug: string) => APIInstance.get(`/blog/${slug}`)
	}
}

export default APIMethods