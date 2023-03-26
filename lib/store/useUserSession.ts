import { create } from 'zustand'

export type CurrentUser = {
	email: string
	profile: {
		name: string
		username: string
		bio?: string
		avatar?: string,
		twitter_username: string
	}
}

type UserSession = {
	fetchingUser: boolean
	setFetchingUser: (f: boolean) => void
	currentUser?: CurrentUser | null
	setCurrentUser: (user: CurrentUser | null) => void
}

const useUserSession = create<UserSession>()((set) => ({
	currentUser: null,
	setCurrentUser: (user) => set({ currentUser: user }),
	fetchingUser: false,
	setFetchingUser: (f) => set({ fetchingUser: f })
}))

export default useUserSession