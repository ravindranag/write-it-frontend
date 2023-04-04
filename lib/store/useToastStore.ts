import { create } from "zustand"

interface ToastStore {
	message: string
	setMessage: (m: string) => void
	closeToast: () => void
}

const useToastStore = create<ToastStore>((set) => ({
	message: '',
	setMessage: (m) => set({ message: m }),
	closeToast: () => set({ message: '' })
}))

export default useToastStore