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
	postSettingSOpen: boolean
	togglePostSettings: () => void
	postSettings: PostSettings
	setPostSettings: (ps: PostSettings) => void
}

interface PostSettings {
	title: string
	description: string
	slug: string
}

const useEditorStore = create<EditorStore>((set, get) => ({
	readOnly: false,
	toggleReadOnly: async () => {
		if(!get().data?.blocks) return 
		get().editor?.readOnly.toggle()
		set({ readOnly: !get().readOnly })
	},
	data: undefined,
	setData: d => set({ data: d }),
	editor: undefined,
	setEditor: (e) => set({ editor: e }),
	postSettingSOpen: false,
	togglePostSettings: () => set({ postSettingSOpen: !get().postSettingSOpen }),
	postSettings: {
		title: '',
		slug: '',
		description: ''
	},
	setPostSettings: (ps) => set({ postSettings: ps })
}))

export default useEditorStore