import { create } from "zustand"

interface LoadingStore {
	loadingMessage: string | null,
	setLoadingMessage: (m: string | null) => void
}

const useLoadingStore = create<LoadingStore>((set) => ({
	loadingMessage: null,
	setLoadingMessage: (m) => set({ loadingMessage: m })
}))

export default useLoadingStore