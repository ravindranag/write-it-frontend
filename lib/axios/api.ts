import axios, { AxiosInstance } from "axios";

type LoginData = {
	email: String,
	password: String
}

const APIInstance: AxiosInstance = axios.create({
	baseURL: 'https://write-it.onrender.com'
})

const APIMethods = {
	auth: {
		login: (data: LoginData) => APIInstance.post('/user/login', data)
	}
}

export default APIMethods