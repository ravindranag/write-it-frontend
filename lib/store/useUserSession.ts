import { create } from 'zustand'

type CurrentUser = {
	email: string
	profile: {
		name: string
		username: string
		bio?: string
		avatar?: string
	}
}

type UserSession = {
	accessToken: string
	setAccessToken: (token: string) => void
	currentUser?: CurrentUser
	setCurrentUser: (user: CurrentUser) => void
}

const useUserSession = create<UserSession>()((set) => ({
	accessToken: '',
	setAccessToken: (token) => set({
		accessToken: token
	}),
	currentUser: undefined,
	setCurrentUser: (user) => set({ currentUser: user })
}))

export default useUserSession