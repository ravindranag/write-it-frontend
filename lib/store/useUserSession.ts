import { create } from 'zustand'

export type CurrentUser = {
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
	currentUser?: CurrentUser | null
	setCurrentUser: (user: CurrentUser | null) => void
}

const useUserSession = create<UserSession>()((set) => ({
	accessToken: '',
	setAccessToken: (token) => set({
		accessToken: token
	}),
	currentUser: null,
	setCurrentUser: (user) => set({ currentUser: user })
}))

export default useUserSession