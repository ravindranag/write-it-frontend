import { create } from "zustand";

interface SignupStore {
	activeStep: number
	setActiveStep: (by: number) => void
	steps: Step[]
	user: User | undefined
	profile: Profile
	setUser: (u: User) => void
	setProfile: (p: Profile) => void
}

interface User {
	email: string
	password: string
}

interface Profile {
	name: string
	username: string
	bio?: string
	twitter_username: string
}

interface Step {
	label: string
	isCompleted: boolean
}

const steps: Step[] = [
	{
		label: 'Create account',
		isCompleted: false
	},
	{
		label: 'Complete your profile',
		isCompleted: false
	},
	{
		label: 'Next steps',
		isCompleted: false
	},
	
]

const useSignUpStore = create<SignupStore>()((set, get) => ({
	activeStep: 0,
	setActiveStep: (by) => {
		if(get().activeStep === 0 && by === -1) return
		if(get().activeStep === steps.length - 1 && by === 1) return
		set((state) => ({ activeStep: state.activeStep + by }))
	},
	steps: steps,
	user: {
		email: '',
		password: ''
	},
	profile: {
		name: '',
		twitter_username: '',
		username: '',
		bio: ''
	},
	setUser: (u) => set({ user: u }),
	setProfile: (p) => set({ profile: p })
}))

export default useSignUpStore