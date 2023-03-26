import { create } from "zustand"
import EditorJS, { OutputData } from '@editorjs/editorjs'
import { MutableRefObject, useRef } from "react"

interface EditorStore {
	readOnly: boolean
	toggleReadOnly: () => void
	data: OutputData | undefined
	setData: (d: OutputData) => void
	editor: EditorJS | undefined
	setEditor: (e: EditorJS) => void
}

const useEditorStore = create<EditorStore>((set, get) => ({
	readOnly: false,
	toggleReadOnly: () => {
		get().editor?.readOnly.toggle()
		set({ readOnly: !get().readOnly })
	},
	data: undefined,
	setData: d => set({ data: d }),
	editor: undefined,
	setEditor: (e) => set({ editor: e })
}))

export default useEditorStore