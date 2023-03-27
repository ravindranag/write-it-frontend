import { create } from "zustand";
import EditorJS, { OutputData } from '@editorjs/editorjs'

interface ReaderStore {
	editor: EditorJS | undefined,
	setEditor: (e: EditorJS) => void
	data: OutputData | undefined
	setData: (d: OutputData) => void
}

const useReaderStore = create<ReaderStore>((set, get) => ({
	editor: undefined,
	setEditor: (e) => set({ editor: e }),
	data: undefined,
	setData: d => {
		get().editor?.render(d)
		set({ data: d })
	}
}))

export default useReaderStore