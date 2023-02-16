import { create } from "zustand";

interface SignupStore {
	activeStep: number
	setActiveStep: (by: number) => void
	steps: Step[]
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
}))

export default useSignUpStore