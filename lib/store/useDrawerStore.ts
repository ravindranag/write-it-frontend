import { create } from "zustand"

interface DrawerStore {
	headerHeight: number | undefined
	setHeaderHeight: (h: number | undefined) => void
}

const useDrawerStore = create<DrawerStore>((set) => ({
	headerHeight: undefined,
	setHeaderHeight: (h) => set({ headerHeight: h })
}))

export default useDrawerStore